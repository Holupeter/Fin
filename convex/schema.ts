import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  transactions: defineTable({
    userId: v.string(),
    amount: v.number(),
    category: v.string(),
    type: v.string(),
    description: v.string(),
    date: v.string(),
  }),

  budgets: defineTable({
    userId: v.string(),
    category: v.string(),
    budgetAmount: v.number(),
  }),

  pots: defineTable({
    userId: v.string(),
    name: v.string(),
    targetAmount: v.number(),
    currentAmount: v.number(),
  }),

  recurringBills: defineTable({
    userId: v.string(),
    name: v.string(),
    amount: v.number(),
    dueDate: v.string(),
    status: v.string(),
  }),
});