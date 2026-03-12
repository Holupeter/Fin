import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

//allow the app to create a new transaction in the database

export const addTransaction = mutation({
  args: {
    userId: v.string(),
    amount: v.number(),
    category: v.string(),
    type: v.string(),
    description: v.string(),
    date: v.string(),
  },

  handler: async (ctx, args) => {
    const transaction = await ctx.db.insert("transactions", args);
    return transaction;
  },
});

export const getTransactions = query({
  args: {
    userId: v.string(),
  },

  handler: async (ctx, args) => {
    const transactions = await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    return transactions;
  },
});

export const deleteTransaction = mutation({
  args: {
    id: v.id("transactions"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateTransaction = mutation({
  args: {
    id: v.id("transactions"),
    amount: v.number(),
    category: v.string(),
    type: v.string(),
    description: v.string(),
    date: v.string(),
  },

  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    await ctx.db.patch(id, updates);
  },
});