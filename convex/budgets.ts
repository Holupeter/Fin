import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addBudget = mutation({
  args: {
    userId: v.string(),
    category: v.string(),
    budgetAmount: v.number(),
    theme: v.string(),
  },

  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("budgets", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateBudget = mutation({
  args: {
    id: v.id("budgets"),
    category: v.string(),
    budgetAmount: v.number(),
    theme: v.string(),
  },

  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteBudget = mutation({
  args: { id: v.id("budgets") },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getBudgets = query({
  args: { userId: v.string() },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("budgets")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});