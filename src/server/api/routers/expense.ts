import { z } from "zod";

import type { ExpenseType } from "@/generated/client";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const ExpenseTypeSchema = z.enum(["Daily", "PreTrip"]);

const ExpenseSchema = z.object({
  amount: z.number().nonnegative("Amount must be a positive number"),
  budgetId: z.string(),
  description: z.string().min(1, "Description is required"),
  expenseType: ExpenseTypeSchema,
  id: z.string().optional(),
});

export const expenseRouter = createTRPCRouter({
  create: publicProcedure
    .input(ExpenseSchema)
    .mutation(async ({ ctx, input }) => {
      // Create the expense
      const expense = await ctx.db.expense.create({
        data: {
          amount: input.amount,
          budgetId: input.budgetId,
          description: input.description,
          expenseType: input.expenseType as ExpenseType,
        },
      });

      // Update the budget's spent amount
      const budget = await ctx.db.budget.findUnique({
        include: { expenses: true },
        where: { id: input.budgetId },
      });

      if (budget) {
        // Calculate the new total spent amount
        const spent = budget.expenses.reduce(
          (total, exp) => total + Number(exp.amount),
          0,
        );

        // Update the budget
        await ctx.db.budget.update({
          data: { spent },
          where: { id: input.budgetId },
        });
      }

      return expense;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // First get the expense to get the budget ID
      const existingExpense = await ctx.db.expense.findUnique({
        where: { id: input.id },
      });

      if (!existingExpense) {
        throw new Error("Expense not found");
      }

      // Delete the expense
      const expense = await ctx.db.expense.delete({
        where: { id: input.id },
      });

      // Update the budget's spent amount
      const budget = await ctx.db.budget.findUnique({
        include: { expenses: true },
        where: { id: existingExpense.budgetId },
      });

      if (budget) {
        // Calculate the new total spent amount
        const spent = budget.expenses.reduce(
          (total, exp) => total + Number(exp.amount),
          0,
        );

        // Update the budget
        await ctx.db.budget.update({
          data: { spent },
          where: { id: existingExpense.budgetId },
        });
      }

      return expense;
    }),

  getByBudgetId: publicProcedure
    .input(z.object({ budgetId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.expense.findMany({
        orderBy: { createdAt: "desc" },
        where: { budgetId: input.budgetId },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        data: ExpenseSchema.omit({ budgetId: true }),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // First get the expense to get the budget ID
      const existingExpense = await ctx.db.expense.findUnique({
        where: { id: input.id },
      });

      if (!existingExpense) {
        throw new Error("Expense not found");
      }

      // Update the expense
      const expense = await ctx.db.expense.update({
        data: {
          amount: input.data.amount,
          description: input.data.description,
          expenseType: input.data.expenseType as ExpenseType,
        },
        where: { id: input.id },
      });

      // Update the budget's spent amount
      const budget = await ctx.db.budget.findUnique({
        include: { expenses: true },
        where: { id: existingExpense.budgetId },
      });

      if (budget) {
        // Calculate the new total spent amount
        const spent = budget.expenses.reduce(
          (total, exp) => total + Number(exp.amount),
          0,
        );

        // Update the budget
        await ctx.db.budget.update({
          data: { spent },
          where: { id: existingExpense.budgetId },
        });
      }

      return expense;
    }),
});
