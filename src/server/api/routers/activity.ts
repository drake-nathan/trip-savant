import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const ActivitySchema = z.object({
  budget: z.number().nonnegative("Budget must be a positive number"),
  dailyPlanId: z.string(),
  description: z.string().optional().nullable(),
  id: z.string().optional(),
  time: z.string().optional().nullable(),
  title: z.string().min(1, "Title is required"),
});

export const activityRouter = createTRPCRouter({
  create: publicProcedure
    .input(ActivitySchema)
    .mutation(async ({ ctx, input }) => {
      // Create the activity
      const activity = await ctx.db.activity.create({
        data: {
          budget: input.budget,
          dailyPlanId: input.dailyPlanId,
          description: input.description,
          time: input.time,
          title: input.title,
        },
      });

      // Get the daily plan
      const dailyPlan = await ctx.db.dailyPlan.findUnique({
        include: { trip: { include: { budget: true } } },
        where: { id: input.dailyPlanId },
      });

      // Update budget calculations if needed
      if (dailyPlan?.trip.budget) {
        // We could update the budget here if needed
        // For now, we'll just return the created activity
      }

      return activity;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.activity.delete({
        where: { id: input.id },
      });
    }),

  getByDailyPlanId: publicProcedure
    .input(z.object({ dailyPlanId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.activity.findMany({
        orderBy: { time: "asc" },
        where: { dailyPlanId: input.dailyPlanId },
      });
    }),

  reorder: publicProcedure
    .input(
      z.object({
        orderedIds: z.array(z.string()),
      }),
    )
    .mutation(({ input }) => {
      // This is a simple placeholder for reordering functionality
      // In a real implementation, you might store an order field
      // or use a more sophisticated approach

      return {
        message: "Activities reordered",
        orderedIds: input.orderedIds,
        success: true,
      };
    }),

  update: publicProcedure
    .input(
      z.object({
        data: ActivitySchema.omit({ dailyPlanId: true }),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.activity.update({
        data: {
          budget: input.data.budget,
          description: input.data.description ?? undefined,
          time: input.data.time ?? undefined,
          title: input.data.title,
        },
        where: { id: input.id },
      });
    }),
});
