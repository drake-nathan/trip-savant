import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const BudgetSchema = z.object({
  daily: z.number().nonnegative(),
  preTrip: z.number().nonnegative(),
  spent: z.number().nonnegative(),
  total: z.number().nonnegative(),
});

export const budgetRouter = createTRPCRouter({
  getByTripId: publicProcedure
    .input(z.object({ tripId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.budget.findUnique({
        include: {
          expenses: {
            orderBy: { createdAt: "desc" },
          },
        },
        where: { tripId: input.tripId },
      });
    }),

  refresh: publicProcedure
    .input(z.object({ tripId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Get all expenses for the trip's budget
      const budget = await ctx.db.budget.findUnique({
        include: {
          expenses: true,
        },
        where: { tripId: input.tripId },
      });

      if (!budget) {
        throw new Error("Budget not found");
      }

      // Calculate total spent from expenses
      const spent = budget.expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0,
      );

      // Update the budget with the new spent amount
      return ctx.db.budget.update({
        data: {
          spent,
        },
        where: { id: budget.id },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        data: BudgetSchema,
        tripId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.budget.update({
        data: {
          daily: input.data.daily,
          preTrip: input.data.preTrip,
          spent: input.data.spent,
          total: input.data.total,
        },
        where: { tripId: input.tripId },
      });
    }),
});
