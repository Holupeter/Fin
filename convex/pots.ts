import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addPot = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    targetAmount: v.number(),
    currentAmount: v.number(),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("pots", args);
  },
});