import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const DailyPlanSchema = z.object({
  date: z.date().optional().nullable(),
  dayNumber: z.number().int().positive().optional().nullable(),
  id: z.string().optional(),
  tripId: z.string(),
});

export const dailyPlanRouter = createTRPCRouter({
  create: publicProcedure
    .input(DailyPlanSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.dailyPlan.create({
        data: {
          date: input.date ?? undefined,
          dayNumber: input.dayNumber ?? undefined,
          tripId: input.tripId,
        },
        include: {
          activities: true,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.dailyPlan.delete({
        where: { id: input.id },
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.dailyPlan.findUnique({
        include: {
          activities: {
            orderBy: { time: "asc" },
          },
        },
        where: { id: input.id },
      });
    }),

  getByTripId: publicProcedure
    .input(z.object({ tripId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.dailyPlan.findMany({
        include: {
          activities: {
            orderBy: { time: "asc" },
          },
        },
        orderBy: { dayNumber: "asc" },
        where: { tripId: input.tripId },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        data: DailyPlanSchema.omit({ tripId: true }),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.dailyPlan.update({
        data: {
          date: input.data.date ?? undefined,
          dayNumber: input.data.dayNumber ?? undefined,
        },
        include: {
          activities: true,
        },
        where: { id: input.id },
      });
    }),
});
