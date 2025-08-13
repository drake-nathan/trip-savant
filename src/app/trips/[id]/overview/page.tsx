"use client";

import { format } from "date-fns";
import {
  AlertCircle,
  ArrowLeft,
  Building,
  Calendar,
  Car,
  CheckCircle,
  Clock,
  DollarSign,
  MoreHorizontal,
  Music,
  PiggyBank,
  Plane,
  ShoppingBag,
  TrendingUp,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample trip data
const tripData = {
  days: 10,
  destination: "Tokyo, Japan",
  endDate: new Date("2024-03-25"),
  id: "1",
  name: "Tokyo Adventure",
  startDate: new Date("2024-03-15"),
};

// Activity categories with icons
const activityCategories = [
  {
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    color: "text-blue-600",
    icon: Plane,
    id: "flights",
    name: "Flights",
  },
  {
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    color: "text-green-600",
    icon: Building,
    id: "accommodation",
    name: "Accommodation",
  },
  {
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    color: "text-orange-600",
    icon: Utensils,
    id: "food",
    name: "Food",
  },
  {
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    color: "text-purple-600",
    icon: Music,
    id: "entertainment",
    name: "Entertainment",
  },
  {
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    color: "text-red-600",
    icon: Car,
    id: "transport",
    name: "Transport",
  },
  {
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    color: "text-pink-600",
    icon: ShoppingBag,
    id: "shopping",
    name: "Shopping",
  },
  {
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    color: "text-gray-600",
    icon: MoreHorizontal,
    id: "other",
    name: "Other",
  },
];

// Sample budget data
const budgetData = {
  dailyBudget: [
    { amount: 80, id: "food" },
    { amount: 100, id: "entertainment" },
    { amount: 30, id: "transport" },
    { amount: 50, id: "shopping" },
    { amount: 40, id: "other" },
  ],
  preTripExpenses: [
    {
      amount: 1200,
      category: "flights",
      id: 1,
      isPaid: true,
      name: "Round-trip flights",
    },
    {
      amount: 1800,
      category: "accommodation",
      id: 2,
      isPaid: true,
      name: "Hotel booking (10 nights)",
    },
    {
      amount: 150,
      category: "other",
      id: 3,
      isPaid: false,
      name: "Travel insurance",
    },
    {
      amount: 280,
      category: "transport",
      id: 4,
      isPaid: false,
      name: "JR Pass",
    },
  ],
};

// Sample itinerary data with budget connections
const itineraryData = [
  {
    activities: [
      {
        category: "flights",
        cost: 0,
        duration: "13 hours",
        id: 1,
        linkToBudget: false,
        name: "Flight to Tokyo",
        notes: "United Airlines UA123",
        specificTime: "08:00",
        timeType: "specific",
      },
      {
        category: "transport",
        cost: 25,
        duration: "1 hour",
        id: 2,
        linkToBudget: true,
        name: "Airport transfer",
        notes: "Narita Express to Shinjuku",
        timeType: "evening",
      },
    ],
    date: new Date("2024-03-15"),
    day: 1,
  },
  {
    activities: [
      {
        category: "entertainment",
        cost: 0,
        duration: "2 hours",
        id: 3,
        linkToBudget: true,
        name: "Senso-ji Temple visit",
        notes: "Traditional temple in Asakusa",
        timeType: "morning",
      },
      {
        category: "food",
        cost: 15,
        duration: "1 hour",
        id: 4,
        linkToBudget: true,
        name: "Lunch at local ramen shop",
        notes: "Try the tonkotsu ramen",
        timeType: "lunch",
      },
      {
        category: "entertainment",
        cost: 35,
        duration: "3 hours",
        id: 5,
        linkToBudget: true,
        name: "Tokyo Skytree visit",
        notes: "Observation deck tickets",
        timeType: "afternoon",
      },
    ],
    date: new Date("2024-03-16"),
    day: 2,
  },
];

const TripOverview = ({ params }: { params: { id: string } }) => {
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);
  const [highlightedActivities, setHighlightedActivities] = useState<number[]>(
    [],
  );

  // Calculate budget totals
  const totalPreTripCost = budgetData.preTripExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const totalPaid = budgetData.preTripExpenses
    .filter((e) => e.isPaid)
    .reduce((sum, expense) => sum + expense.amount, 0);
  const totalDailyBudget =
    budgetData.dailyBudget.reduce((sum, item) => sum + item.amount, 0) *
    tripData.days;
  const totalTripCost = totalPreTripCost + totalDailyBudget;

  // Calculate actual spending from itinerary
  const actualSpending = itineraryData.reduce((total, day) => {
    return (
      total +
      day.activities
        .filter((a) => a.linkToBudget)
        .reduce((dayTotal, activity) => dayTotal + activity.cost, 0)
    );
  }, 0);

  // Calculate category spending
  const categorySpending = activityCategories
    .map((category) => {
      const budgetAmount =
        budgetData.dailyBudget.find((b) => b.id === category.id)?.amount || 0;
      const totalBudget = budgetAmount * tripData.days;
      const actualSpent = itineraryData.reduce((total, day) => {
        return (
          total +
          day.activities
            .filter((a) => a.category === category.id && a.linkToBudget)
            .reduce((sum, activity) => sum + activity.cost, 0)
        );
      }, 0);

      return {
        ...category,
        actualSpent,
        budgetAmount: totalBudget,
        percentage:
          totalBudget > 0 ? Math.round((actualSpent / totalBudget) * 100) : 0,
        remaining: totalBudget - actualSpent,
      };
    })
    .filter((cat) => cat.budgetAmount > 0);

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setHighlightedActivities([]);
    } else {
      setSelectedCategory(categoryId);
      const activities = itineraryData.flatMap((day) =>
        day.activities
          .filter((a) => a.category === categoryId)
          .map((a) => a.id),
      );
      setHighlightedActivities(activities);
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    return (
      activityCategories.find((cat) => cat.id === categoryId) ??
      activityCategories[6]
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatTimeDisplay = (activity: any) => {
    if (activity.timeType === "specific" && activity.specificTime) {
      return activity.specificTime;
    }
    return activity.timeType
      .replace("-", " ")
      .replaceAll(/\b\w/g, (l: string) => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                className="text-slate-600 hover:text-slate-800"
                size="sm"
                variant="ghost"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="mb-2 font-sans text-3xl font-bold text-slate-800">
            Trip Overview
          </h1>
          <p className="text-slate-600">
            {tripData.name} • {format(tripData.startDate, "MMM d")} -{" "}
            {format(tripData.endDate, "MMM d, yyyy")}
          </p>
        </div>

        {/* Budget Summary Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2">
                  <PiggyBank className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Budget</p>
                  <p className="text-2xl font-bold text-slate-800">
                    ${totalTripCost.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-50 p-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Pre-Paid</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${totalPaid.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-orange-50 p-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Planned Spending</p>
                  <p className="text-2xl font-bold text-orange-600">
                    ${actualSpending.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-50 p-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Remaining Budget</p>
                  <p className="text-2xl font-bold text-amber-600">
                    ${(totalDailyBudget - actualSpending).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs className="space-y-6" defaultValue="integrated">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="integrated">Integrated View</TabsTrigger>
            <TabsTrigger value="budget">Budget Details</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary Details</TabsTrigger>
          </TabsList>

          {/* Integrated View */}
          <TabsContent className="space-y-6" value="integrated">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Budget Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">
                    Budget by Category
                  </CardTitle>
                  <p className="text-sm text-slate-600">
                    Click categories to highlight related activities
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categorySpending.map((category) => {
                    const IconComponent = category.icon;
                    const isSelected = selectedCategory === category.id;
                    return (
                      <div
                        className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                          isSelected ?
                            `${category.bgColor} ${category.borderColor} shadow-md`
                          : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                        key={category.id}
                        onClick={() => {
                          handleCategoryClick(category.id);
                        }}
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`rounded-lg p-2 ${isSelected ? "bg-white" : category.bgColor}`}
                            >
                              <IconComponent
                                className={`h-4 w-4 ${category.color}`}
                              />
                            </div>
                            <span className="font-medium text-slate-800">
                              {category.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-slate-800">
                              ${category.actualSpent} / ${category.budgetAmount}
                            </p>
                            <p className="text-xs text-slate-600">
                              {category.percentage}% used
                            </p>
                          </div>
                        </div>
                        <Progress className="h-2" value={category.percentage} />
                        <div className="mt-2 flex justify-between text-xs text-slate-500">
                          <span>Remaining: ${category.remaining}</span>
                          <span>
                            {itineraryData.reduce(
                              (count, day) =>
                                count +
                                day.activities.filter(
                                  (a) =>
                                    a.category === category.id &&
                                    a.linkToBudget,
                                ).length,
                              0,
                            )}{" "}
                            activities
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Connected Itinerary */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">
                    Connected Activities
                  </CardTitle>
                  <p className="text-sm text-slate-600">
                    {selectedCategory ?
                      `Showing ${getCategoryInfo(selectedCategory).name} activities`
                    : "Select a budget category to see related activities"}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedCategory ?
                    <div className="space-y-3">
                      {itineraryData.map((day) => {
                        const dayActivities = day.activities.filter(
                          (a) => a.category === selectedCategory,
                        );
                        if (dayActivities.length === 0) return null;

                        return (
                          <div className="space-y-2" key={day.day}>
                            <h4 className="border-b border-slate-200 pb-1 text-sm font-medium text-slate-700">
                              Day {day.day} - {format(day.date, "MMM d")}
                            </h4>
                            {dayActivities.map((activity) => {
                              const categoryInfo = getCategoryInfo(
                                activity.category,
                              );
                              const IconComponent = categoryInfo.icon;
                              const isHighlighted =
                                highlightedActivities.includes(activity.id);

                              return (
                                <div
                                  className={`rounded-lg border p-3 transition-all duration-200 ${
                                    isHighlighted ?
                                      `${categoryInfo.bgColor} ${categoryInfo.borderColor} shadow-sm`
                                    : "border-slate-200 bg-white"
                                  }`}
                                  key={activity.id}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`rounded p-1.5 ${categoryInfo.bgColor}`}
                                    >
                                      <IconComponent
                                        className={`h-3 w-3 ${categoryInfo.color}`}
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-slate-800">
                                        {activity.name}
                                      </p>
                                      <div className="mt-1 flex items-center gap-3 text-xs text-slate-600">
                                        <span className="flex items-center gap-1">
                                          <Clock className="h-3 w-3" />
                                          {formatTimeDisplay(activity)}
                                        </span>
                                        {(
                                          activity.linkToBudget &&
                                          activity.cost > 0
                                        ) ?
                                          <span className="flex items-center gap-1 font-medium text-amber-600">
                                            <DollarSign className="h-3 w-3" />
                                            {activity.cost}
                                          </span>
                                        : null}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  : <div className="py-8 text-center text-slate-500">
                      <Calendar className="mx-auto mb-3 h-12 w-12 text-slate-300" />
                      <p>Click a budget category to see connected activities</p>
                    </div>
                  }
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Budget Details Tab */}
          <TabsContent value="budget">
            <div className="py-8 text-center">
              <p className="mb-4 text-slate-600">Detailed budget management</p>
              <Link href={`/trips/${params.id}/budget`}>
                <Button className="bg-amber-600 text-white hover:bg-amber-700">
                  Go to Budget Management
                </Button>
              </Link>
            </div>
          </TabsContent>

          {/* Itinerary Details Tab */}
          <TabsContent value="itinerary">
            <div className="py-8 text-center">
              <p className="mb-4 text-slate-600">Detailed itinerary planning</p>
              <Link href={`/trips/${params.id}/itinerary`}>
                <Button className="bg-amber-600 text-white hover:bg-amber-700">
                  Go to Itinerary Planning
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href={`/trips/${params.id}/budget`}>
            <Button className="bg-transparent sm:w-auto" variant="outline">
              Edit Budget
            </Button>
          </Link>
          <Link href={`/trips/${params.id}/itinerary`}>
            <Button className="bg-transparent sm:w-auto" variant="outline">
              Edit Itinerary
            </Button>
          </Link>
          <Button className="bg-amber-600 text-white hover:bg-amber-700 sm:w-auto">
            Export Trip Plan
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TripOverview;
