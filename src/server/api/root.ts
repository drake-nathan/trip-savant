import { activityRouter } from "@/server/api/routers/activity";
import { budgetRouter } from "@/server/api/routers/budget";
import { dailyPlanRouter } from "@/server/api/routers/daily-plan";
import { expenseRouter } from "@/server/api/routers/expense";
import { tripRouter } from "@/server/api/routers/trip";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  activity: activityRouter,
  budget: budgetRouter,
  dailyPlan: dailyPlanRouter,
  expense: expenseRouter,
  trip: tripRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 *
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
