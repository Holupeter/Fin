import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addPot = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    targetAmount: v.number(),
    currentAmount: v.number(),
    theme: v.string(),
  },

  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("pots", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updatePot = mutation({
  args: {
    id: v.id("pots"),
    name: v.string(),
    targetAmount: v.number(),
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

export const deletePot = mutation({
  args: { id: v.id("pots") },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getPots = query({
  args: { userId: v.string() },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("pots")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});

export const addMoneyToPot = mutation({
  args: {
    id: v.id("pots"),
    amount: v.number(),
  },

  handler: async (ctx, args) => {
    const pot = await ctx.db.get(args.id);

    if (!pot) throw new Error("Pot not found");

    await ctx.db.patch(args.id, {
      currentAmount: pot.currentAmount + args.amount,
      updatedAt: Date.now(),
    });
  },
});

export const withdrawMoneyFromPot = mutation({
  args: {
    id: v.id("pots"),
    amount: v.number(),
  },

  handler: async (ctx, args) => {
    const pot = await ctx.db.get(args.id);

    if (!pot) throw new Error("Pot not found");

    await ctx.db.patch(args.id, {
      currentAmount: pot.currentAmount - args.amount,
      updatedAt: Date.now(),
    });
  },
});