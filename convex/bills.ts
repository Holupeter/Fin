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
    return await ctx.db.insert("recurringBills", args);
  },
});