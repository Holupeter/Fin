import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

//allows the app to create a new transaction in the database

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
    const transaction = await ctx.db.insert("transactions", {
      ...args,
      createdAt: Date.now(),
    });
    return transaction;
  },
});

export const getTransactions = query({
  args: {
    userId: v.string(),
    search: v.optional(v.string()),
    category: v.optional(v.string()),
    sort: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    let transactions = await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    if (args.category && args.category !== "All Transactions") {
      transactions = transactions.filter(t => t.category === args.category);
    }

    if (args.search) {
      const searchLower = args.search.toLowerCase();
      transactions = transactions.filter(t => 
        t.description.toLowerCase().includes(searchLower)
      );
    }

    switch (args.sort) {
      case "Oldest":
        transactions.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "A to Z":
        transactions.sort((a, b) => a.description.localeCompare(b.description));
        break;
      case "Z to A":
        transactions.sort((a, b) => b.description.localeCompare(a.description));
        break;
      case "Highest":
        transactions.sort((a, b) => b.amount - a.amount);
        break;
      case "Lowest":
        transactions.sort((a, b) => a.amount - b.amount);
        break;
      case "Latest":
      default:
        transactions.sort((a, b) => b.createdAt - a.createdAt);
        break;
    }

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