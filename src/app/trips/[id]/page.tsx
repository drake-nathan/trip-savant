"use client";

import type { Decimal } from "@prisma/client/runtime/library";

import { addDays, differenceInDays, format } from "date-fns";
import {
  ArrowLeft,
  Building,
  Calendar,
  Car,
  Edit,
  PlaneTakeoff,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseType } from "@/generated/client";
import { api } from "@/trpc/react";

// Define the Activity interface based on the DB schema
interface Activity {
  budget: Decimal;
  createdAt: Date;
  dailyPlanId: string;
  description: null | string;
  id: string;
  time: null | string;
  title: string;
  updatedAt: Date;
}

const TripDetailsPage = () => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch the trip by ID using tRPC
  const { id } = params;
  const {
    data: trip,
    error,
    isLoading,
  } = api.trip.getById.useQuery({ id: id as string });

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        <h1 className="mb-4 text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="py-10 text-center">
        <h1 className="mb-4 text-2xl font-bold">Trip not found</h1>
        <p className="text-muted-foreground mb-6">
          The trip you&apos;re looking for doesn&apos;t exist or has been
          deleted.
        </p>
        <Button asChild>
          <Link href="/trips">Back to Trips</Link>
        </Button>
      </div>
    );
  }

  // Calculate trip duration
  const tripDuration =
    differenceInDays(new Date(trip.endDate), new Date(trip.startDate)) + 1;

  // Generate daily planners based on trip dates
  const dailyPlanners = [];
  for (let i = 0; i < tripDuration; i++) {
    const currentDate = addDays(new Date(trip.startDate), i);
    dailyPlanners.push({
      activities: trip.dailyPlans[i]?.activities ?? [],
      date: currentDate,
    });
  }

  // Calculate budget progress
  const spentAmount = trip.budget ? Number(trip.budget.spent) : 0;
  const totalBudget = trip.budget ? Number(trip.budget.total) : 0;
  const spentPercentage =
    totalBudget > 0 ? (spentAmount / totalBudget) * 100 : 0;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "booked": {
        return "bg-green-500/20 text-green-700 dark:text-green-400";
      }
      case "idea": {
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      }
      case "planning": {
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400";
      }
      default: {
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400";
      }
    }
  };

  const addExpense = () => {
    toast("Your expense has been added to the budget.");
  };

  const addPlan = () => {
    toast("Your plan has been added to the itinerary.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button asChild size="icon" variant="ghost">
            <Link href="/trips">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{trip.destination}</h1>
          <Badge className={getStatusColor(trip.status)}>{trip.status}</Badge>
        </div>
        <Button asChild>
          <Link href={`/trips/${trip.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Trip
          </Link>
        </Button>
      </div>

      <div className="text-muted-foreground">
        {format(new Date(trip.startDate), "MMMM d, yyyy")} -{" "}
        {format(new Date(trip.endDate), "MMMM d, yyyy")} · {tripDuration}{" "}
        {tripDuration === 1 ? "day" : "days"}
      </div>

      <Tabs onValueChange={setActiveTab} value={activeTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="planner">Daily Planner</TabsTrigger>
        </TabsList>

        <TabsContent className="space-y-6" value="overview">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trip.flight ?
                  <div className="flex items-start gap-3">
                    <PlaneTakeoff className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
                      <h3 className="font-medium">Flight</h3>
                      <p>{trip.flight}</p>
                    </div>
                  </div>
                : null}

                {trip.lodging ?
                  <div className="flex items-start gap-3">
                    <Building className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
                      <h3 className="font-medium">Lodging</h3>
                      <p>{trip.lodging}</p>
                    </div>
                  </div>
                : null}

                {trip.transportation ?
                  <div className="flex items-start gap-3">
                    <Car className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
                      <h3 className="font-medium">Transportation</h3>
                      <p>{trip.transportation}</p>
                    </div>
                  </div>
                : null}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Budget</span>
                  <span className="font-medium">
                    ${totalBudget.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Spent</span>
                  <span className="font-medium">
                    ${spentAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className="font-medium">
                    ${(totalBudget - spentAmount).toLocaleString()}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(spentPercentage)}%</span>
                  </div>
                  <Progress value={spentPercentage} />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => {
                    setActiveTab("budget");
                  }}
                  variant="outline"
                >
                  View Full Budget
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Plans</CardTitle>
              <CardDescription>Your next few activities</CardDescription>
            </CardHeader>
            <CardContent>
              {dailyPlanners[0] && dailyPlanners[0].activities.length > 0 ?
                <div className="space-y-4">
                  {dailyPlanners[0].activities
                    .slice(0, 3)
                    .map((activity: Activity) => (
                      <div className="flex items-start gap-3" key={activity.id}>
                        <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
                        <div>
                          <h3 className="font-medium">
                            {activity.time ?? ""} - {activity.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              : <p className="text-muted-foreground">
                  No activities added yet.
                </p>
              }
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => {
                  setActiveTab("planner");
                }}
                variant="outline"
              >
                View Full Itinerary
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent className="space-y-6" value="budget">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Budget Summary</CardTitle>
                <div className="text-2xl font-bold">
                  ${trip.budget?.total.toLocaleString()}
                </div>
              </div>
              <CardDescription>Track your expenses and budget</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Spent: ${spentAmount.toLocaleString()}</span>
                  <span>
                    Remaining: $
                    {(totalBudget - spentAmount).toLocaleString()}
                  </span>
                </div>
                <Progress value={spentPercentage} />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Pre-Trip Expenses</h3>
                  <span>${trip.budget?.preTrip.toLocaleString()}</span>
                </div>

                {trip.budget?.expenses.map((expense) => {
                  if (expense.expenseType === ExpenseType.PreTrip) {
                    return (
                      <div
                        className="flex items-center justify-between pl-4"
                        key={expense.description}
                      >
                        <span className="text-muted-foreground">
                          {expense.description}
                        </span>
                        <span>${expense.amount.toLocaleString()}</span>
                      </div>
                    );
                  }

                  return null;
                })}

                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Daily Budget</h3>
                  <span>${trip.budget?.daily.toLocaleString()} / day</span>
                </div>

                {trip.budget?.expenses.map((expense) => {
                  if (expense.expenseType === ExpenseType.Daily) {
                    return (
                      <div
                        className="flex items-center justify-between pl-4"
                        key={expense.description}
                      >
                        <span className="text-muted-foreground">
                          {expense.description}
                        </span>
                        <span>${expense.amount.toLocaleString()}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              <Separator />

              <form className="space-y-4">
                <h3 className="font-medium">Add New Expense</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="expense-description">Description</Label>
                    <Input
                      id="expense-description"
                      placeholder="e.g., Flight tickets"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expense-amount">Amount ($)</Label>
                    <Input
                      id="expense-amount"
                      placeholder="0.00"
                      type="number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expense-type">Expense Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pretrip">Pre-Trip Expense</SelectItem>
                      <SelectItem value="daily">Daily Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={addExpense} type="button">
                  Add Expense
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent className="space-y-6" value="planner">
          {dailyPlanners.map((day, index) => (
            <Card key={day.date.toISOString()}>
              <CardHeader>
                <CardTitle>
                  Day {index + 1}: {format(day.date, "EEEE, MMMM d, yyyy")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {day.activities.length > 0 ?
                  day.activities.map((activity: Activity) => (
                    <div className="flex items-start gap-3" key={activity.id}>
                      <div className="bg-muted w-16 rounded-md p-2 text-center">
                        <span className="text-sm font-medium">
                          {activity.time ?? ""}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{activity.title}</h3>
                        <p className="text-muted-foreground">
                          {activity.description}
                        </p>
                        <div className="mt-1 text-sm">
                          <span className="text-muted-foreground">
                            Budget:{" "}
                          </span>
                          <span>${activity.budget.toString()}</span>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  ))
                : <p className="text-muted-foreground">
                    No activities for this day yet.
                  </p>
                }

                <form className="mt-6 space-y-4 rounded-lg border p-4">
                  <h3 className="font-medium">Add Plan for Day {index + 1}</h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`plan-time-${index}`}>Time</Label>
                      <Input
                        id={`plan-time-${index}`}
                        placeholder="e.g., 09:00 AM"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`plan-title-${index}`}>Title</Label>
                      <Input
                        id={`plan-title-${index}`}
                        placeholder="e.g., Visit Eiffel Tower"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`plan-description-${index}`}>
                      Description
                    </Label>
                    <Input
                      id={`plan-description-${index}`}
                      placeholder="Details about this activity..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`plan-budget-${index}`}>
                      Budget (optional)
                    </Label>
                    <Input
                      id={`plan-budget-${index}`}
                      placeholder="0.00"
                      type="number"
                    />
                  </div>

                  <Button onClick={addPlan} type="button">
                    Add to Itinerary
                  </Button>
                </form>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TripDetailsPage;
