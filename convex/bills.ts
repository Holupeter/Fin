import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addBill = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    amount: v.number(),
    dueDate: v.string(),
    status: v.string(),
  },

  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("recurringBills", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateBill = mutation({
  args: {
    id: v.id("recurringBills"),
    name: v.string(),
    amount: v.number(),
    dueDate: v.string(),
    status: v.string(),
  },

  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    await ctx.db.patch(id, updates);
  },
});

export const deleteBill = mutation({
  args: { id: v.id("recurringBills") },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getBills = query({
  args: { userId: v.string() },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("recurringBills")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});