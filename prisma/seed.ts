import { env } from "@/env.js";
import { ExpenseType, PrismaClient, type TripStatus } from "@/generated/client";

import { mockTrips } from "../src/lib/mock-data.js";

const prisma = new PrismaClient();

const main = async () => {
  if (env.NODE_ENV !== "development") {
    throw new Error("Don't you dare, seeding is only allowed in development");
  }

  console.info("Seeding database...");

  // Clear existing data
  await prisma.activity.deleteMany({});
  await prisma.dailyPlan.deleteMany({});
  await prisma.expense.deleteMany({});
  await prisma.budget.deleteMany({});
  await prisma.trip.deleteMany({});

  // Seed the database with mock data
  for (const mockTrip of mockTrips) {
    console.info(`Creating trip: ${mockTrip.destination}`);

    // Create the trip
    const trip = await prisma.trip.create({
      data: {
        destination: mockTrip.destination,
        endDate: new Date(mockTrip.endDate),
        flight: mockTrip.flight || undefined,
        id: mockTrip.id,
        lodging: mockTrip.lodging || undefined,
        startDate: new Date(mockTrip.startDate),
        status: mockTrip.status as TripStatus,
        transportation: mockTrip.transportation || undefined,
      },
    });

    // Create budget
    const budget = await prisma.budget.create({
      data: {
        daily: mockTrip.budget.daily,
        preTrip: mockTrip.budget.preTrip,
        spent: mockTrip.budget.spent,
        total: mockTrip.budget.total,
        tripId: trip.id,
      },
    });

    // Create daily expenses
    if (mockTrip.budget.expenses.daily.length) {
      for (const expense of mockTrip.budget.expenses.daily) {
        await prisma.expense.create({
          data: {
            amount: expense.amount,
            budgetId: budget.id,
            description: expense.description,
            expenseType: ExpenseType.Daily,
          },
        });
      }
    }

    // Create pre-trip expenses
    if (mockTrip.budget.expenses.preTrip.length) {
      for (const expense of mockTrip.budget.expenses.preTrip) {
        await prisma.expense.create({
          data: {
            amount: expense.amount,
            budgetId: budget.id,
            description: expense.description,
            expenseType: ExpenseType.PreTrip,
          },
        });
      }
    }

    // Create daily plans and activities
    if (mockTrip.dailyPlans.length) {
      for (let i = 0; i < mockTrip.dailyPlans.length; i++) {
        const dailyPlan = mockTrip.dailyPlans[i];

        // Calculate the date for this day based on trip start date
        const planDate = new Date(trip.startDate);
        planDate.setDate(planDate.getDate() + i);

        const createdDailyPlan = await prisma.dailyPlan.create({
          data: {
            date: planDate,
            dayNumber: i + 1,
            tripId: trip.id,
          },
        });

        // Create activities for this day
        if (dailyPlan?.plans.length) {
          for (const plan of dailyPlan.plans) {
            await prisma.activity.create({
              data: {
                budget: plan.budget,
                dailyPlanId: createdDailyPlan.id,
                description: plan.description,
                time: plan.time,
                title: plan.title,
              },
            });
          }
        }
      }
    }
  }

  console.info("Database seeding completed successfully!");
};

main()
  .catch((e: unknown) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
