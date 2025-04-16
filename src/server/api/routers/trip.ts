import { z } from "zod";

import type { TripStatus } from "@/generated/client";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const TripStatusSchema = z.enum([
  "Idea",
  "Planning",
  "Booked",
  "Completed",
  "Cancelled",
]);

const TripSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  endDate: z.date(),
  flight: z.string().optional().nullable(),
  id: z.string().optional(),
  lodging: z.string().optional().nullable(),
  startDate: z.date(),
  status: TripStatusSchema.default("Idea"),
  transportation: z.string().optional().nullable(),
});

export const tripRouter = createTRPCRouter({
  create: publicProcedure.input(TripSchema).mutation(async ({ ctx, input }) => {
    return ctx.db.trip.create({
      data: {
        budget: {
          create: {
            daily: 0,
            preTrip: 0,
            spent: 0,
            total: 0,
          },
        },
        destination: input.destination,
        endDate: input.endDate,
        flight: input.flight ?? undefined,
        lodging: input.lodging ?? undefined,
        startDate: input.startDate,
        status: input.status as TripStatus,
        transportation: input.transportation ?? undefined,
      },
    });
  }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.trip.delete({
        where: { id: input.id },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.trip.findMany({
      include: {
        budget: true,
      },
      orderBy: { startDate: "asc" },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const trip = await ctx.db.trip.findUnique({
        include: {
          budget: {
            include: {
              expenses: true,
            },
          },
          dailyPlans: {
            include: {
              activities: true,
            },
            orderBy: { dayNumber: "asc" },
          },
        },
        where: { id: input.id },
      });

      return trip;
    }),

  update: publicProcedure
    .input(
      z.object({
        data: TripSchema,
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.trip.update({
        data: {
          destination: input.data.destination,
          endDate: input.data.endDate,
          flight: input.data.flight ?? undefined,
          lodging: input.data.lodging ?? undefined,
          startDate: input.data.startDate,
          status: input.data.status as TripStatus,
          transportation: input.data.transportation ?? undefined,
        },
        where: { id: input.id },
      });
    }),
});
