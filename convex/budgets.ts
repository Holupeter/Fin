import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addBudget = mutation({
  args: {
    userId: v.string(),
    category: v.string(),
    budgetAmount: v.number(),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("budgets", args);
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