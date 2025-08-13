"use client";

import {
  ArrowLeft,
  Building,
  Calendar,
  Car,
  ExternalLink,
  MoreHorizontal,
  Music,
  PiggyBank,
  Plane,
  Plus,
  ShoppingBag,
  Trash2,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getTripData } from "@/api/trips";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";

// Default budget categories with icons
const defaultCategories = [
  { color: "text-blue-600", icon: Plane, id: "flights", name: "Flights" },
  {
    color: "text-green-600",
    icon: Building,
    id: "accommodation",
    name: "Accommodation",
  },
  { color: "text-orange-600", icon: Utensils, id: "food", name: "Food" },
  {
    color: "text-purple-600",
    icon: Music,
    id: "entertainment",
    name: "Entertainment",
  },
  { color: "text-red-600", icon: Car, id: "transport", name: "Transport" },
  {
    color: "text-pink-600",
    icon: ShoppingBag,
    id: "shopping",
    name: "Shopping",
  },
  { color: "text-gray-600", icon: MoreHorizontal, id: "other", name: "Other" },
];

// Sample pre-trip expenses
const initialPreTripExpenses = [
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
  { amount: 280, category: "transport", id: 4, isPaid: false, name: "JR Pass" },
];

// Sample daily budget allocations
const initialDailyBudget = [
  { amount: 80, id: "food" },
  { amount: 100, id: "entertainment" },
  { amount: 30, id: "transport" },
  { amount: 50, id: "shopping" },
  { amount: 40, id: "other" },
];

const BudgetManagement = ({ params }: { params: { id: string } }) => {
  const [tripData, setTripData] = useState({ days: 0, name: "" });
  const [preTripExpenses, setPreTripExpenses] = useState(
    initialPreTripExpenses,
  );
  const [dailyBudget, setDailyBudget] = useState(initialDailyBudget);
  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    isPaid: false,
    name: "",
  });
  const [showAddExpense, setShowAddExpense] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTripData(params.id);
        setTripData(data);
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };
    void fetchData();
  }, [params.id]);

  // Calculate budget overview
  const totalPreTripCost = preTripExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const totalPaid = preTripExpenses
    .filter((e) => e.isPaid)
    .reduce((sum, expense) => sum + expense.amount, 0);
  const totalDailyBudget =
    dailyBudget.reduce((sum, item) => sum + item.amount, 0) *
    (tripData.days || 10);
  const totalTripCost = totalPreTripCost + totalDailyBudget;
  const paidPercentage =
    totalTripCost > 0 ? Math.round((totalPaid / totalTripCost) * 100) : 0;
  const remainingToPay = totalPreTripCost - totalPaid;
  const monthsUntilTrip = Math.max(
    1,
    Math.ceil(
      (new Date("2024-03-15").getTime() - Date.now()) /
        (1000 * 60 * 60 * 24 * 30),
    ),
  );
  const monthlySavingsNeeded = Math.max(0, remainingToPay / monthsUntilTrip);

  const addPreTripExpense = () => {
    if (newExpense.name && newExpense.amount && newExpense.category) {
      const expense = {
        amount: Number.parseFloat(newExpense.amount),
        category: newExpense.category,
        id: Date.now(),
        isPaid: newExpense.isPaid,
        name: newExpense.name,
      };
      setPreTripExpenses([...preTripExpenses, expense]);
      setNewExpense({ amount: "", category: "", isPaid: false, name: "" });
      setShowAddExpense(false);
    }
  };

  const removePreTripExpense = (id: number) => {
    setPreTripExpenses(preTripExpenses.filter((expense) => expense.id !== id));
  };

  const toggleExpensePaid = (id: number) => {
    setPreTripExpenses(
      preTripExpenses.map((expense) =>
        expense.id === id ? { ...expense, isPaid: !expense.isPaid } : expense,
      ),
    );
  };

  const updateDailyBudget = (categoryId: string, amount: number) => {
    setDailyBudget(
      dailyBudget.map((item) =>
        item.id === categoryId ? { ...item, amount } : item,
      ),
    );
  };

  const getCategoryInfo = (categoryId: string) => {
    return (
      defaultCategories.find((cat) => cat.id === categoryId) ??
      defaultCategories[6]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <Link href={`/trips/${params.id}/overview`}>
              <Button
                className="text-slate-600 hover:text-slate-800"
                size="sm"
                variant="ghost"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Overview
              </Button>
            </Link>
            <Link href={`/trips/${params.id}/itinerary`}>
              <Button className="bg-transparent" size="sm" variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Itinerary
              </Button>
            </Link>
          </div>
          <h1 className="mb-2 font-sans text-3xl font-bold text-slate-800">
            Budget Management
          </h1>
          <p className="text-slate-600">
            {tripData.name} • {tripData.days} days
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Budget Overview Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-sans">
                  <PiggyBank className="h-5 w-5 text-amber-600" />
                  Budget Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Total Trip Cost */}
                <div className="rounded-lg bg-slate-50 p-4 text-center">
                  <p className="mb-1 text-sm text-slate-600">Total Trip Cost</p>
                  <p className="text-3xl font-bold text-slate-800">
                    ${totalTripCost.toLocaleString()}
                  </p>
                </div>

                {/* Payment Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      Payment Progress
                    </span>
                    <span className="text-sm text-slate-600">
                      {paidPercentage}%
                    </span>
                  </div>
                  <Progress className="h-3" value={paidPercentage} />

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-green-600">Already Paid</span>
                      <span className="font-medium text-green-600">
                        ${totalPaid.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-600">Needs Payment</span>
                      <span className="font-medium text-amber-600">
                        ${remainingToPay.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Daily Budget</span>
                      <span className="font-medium text-slate-600">
                        ${totalDailyBudget.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Monthly Savings */}
                {remainingToPay > 0 && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium text-amber-800">
                        Monthly Savings Needed
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-amber-800">
                      ${monthlySavingsNeeded.toFixed(0)}
                    </p>
                    <p className="mt-1 text-xs text-amber-600">
                      For {monthsUntilTrip} months until trip
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Budget Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Pre-Trip Expenses */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-sans">Pre-Trip Expenses</CardTitle>
                  <Button
                    className="bg-amber-600 text-white hover:bg-amber-700"
                    onClick={() => {
                      setShowAddExpense(true);
                    }}
                    size="sm"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Expense
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add New Expense Form */}
                {showAddExpense ?
                  <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="expenseName">Expense Name</Label>
                        <Input
                          id="expenseName"
                          onChange={(e) => {
                            setNewExpense({
                              ...newExpense,
                              name: e.target.value,
                            });
                          }}
                          placeholder="e.g., Round-trip flights"
                          value={newExpense.name}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expenseAmount">Amount ($)</Label>
                        <Input
                          id="expenseAmount"
                          onChange={(e) => {
                            setNewExpense({
                              ...newExpense,
                              amount: e.target.value,
                            });
                          }}
                          placeholder="0"
                          type="number"
                          value={newExpense.amount}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="expenseCategory">Category</Label>
                        <Select
                          onValueChange={(value) => {
                            setNewExpense({ ...newExpense, category: value });
                          }}
                          value={newExpense.category}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {defaultCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Payment Status</Label>
                        <div className="flex h-10 items-center space-x-2">
                          <Switch
                            checked={newExpense.isPaid}
                            onCheckedChange={(checked) => {
                              setNewExpense({ ...newExpense, isPaid: checked });
                            }}
                          />
                          <span className="text-sm text-slate-600">
                            {newExpense.isPaid ? "Paid" : "Unpaid"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="bg-amber-600 text-white hover:bg-amber-700"
                        onClick={addPreTripExpense}
                        size="sm"
                      >
                        Add Expense
                      </Button>
                      <Button
                        onClick={() => {
                          setShowAddExpense(false);
                        }}
                        size="sm"
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                : null}

                {/* Expense List */}
                <div className="space-y-3">
                  {preTripExpenses.map((expense) => {
                    const categoryInfo = getCategoryInfo(expense.category);
                    const IconComponent = categoryInfo.icon;
                    return (
                      <div
                        className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4"
                        key={expense.id}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`rounded-lg bg-slate-50 p-2 ${categoryInfo.color}`}
                          >
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">
                              {expense.name}
                            </p>
                            <p className="text-sm text-slate-600">
                              {categoryInfo.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-slate-800">
                            ${expense.amount.toLocaleString()}
                          </span>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={expense.isPaid}
                              onCheckedChange={() => {
                                toggleExpensePaid(expense.id);
                              }}
                            />
                            <Badge
                              className={
                                expense.isPaid ?
                                  "bg-green-100 text-green-800"
                                : ""
                              }
                              variant={expense.isPaid ? "default" : "secondary"}
                            >
                              {expense.isPaid ? "Paid" : "Unpaid"}
                            </Badge>
                          </div>
                          <Button
                            className="text-red-600 hover:text-red-700"
                            onClick={() => {
                              removePreTripExpense(expense.id);
                            }}
                            size="sm"
                            variant="ghost"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pre-paid Progress */}
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-green-800">
                      Pre-Trip Expenses
                    </span>
                    <span className="text-sm text-green-600">
                      {Math.round((totalPaid / totalPreTripCost) * 100)}%
                      pre-paid
                    </span>
                  </div>
                  <Progress
                    className="h-2"
                    value={(totalPaid / totalPreTripCost) * 100}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Daily Budget Planning */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">
                  Daily Budget Planning
                </CardTitle>
                <p className="text-sm text-slate-600">
                  Set daily allowances for each category
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {defaultCategories.slice(2).map((category) => {
                    const budgetItem = dailyBudget.find(
                      (item) => item.id === category.id,
                    );
                    const IconComponent = category.icon;
                    return (
                      <div
                        className="rounded-lg border border-slate-200 bg-white p-4"
                        key={category.id}
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <div
                            className={`rounded-lg bg-slate-50 p-2 ${category.color}`}
                          >
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <span className="font-medium text-slate-800">
                            {category.name}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`daily-${category.id}`}>
                            Daily Budget ($)
                          </Label>
                          <Input
                            id={`daily-${category.id}`}
                            min="0"
                            onChange={(e) => {
                              updateDailyBudget(
                                category.id,
                                Number.parseFloat(e.target.value) || 0,
                              );
                            }}
                            type="number"
                            value={budgetItem?.amount || 0}
                          />
                          <p className="text-xs text-slate-500">
                            Total: $
                            {(
                              (budgetItem?.amount || 0) * (tripData.days || 10)
                            ).toLocaleString()}{" "}
                            for {tripData.days || 10} days
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Daily Budget Summary */}
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-amber-800">
                      Total Daily Budget
                    </span>
                    <span className="text-xl font-bold text-amber-800">
                      ${totalDailyBudget.toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-amber-600">
                    ${totalDailyBudget / (tripData.days || 10)} per day ×{" "}
                    {tripData.days || 10} days
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col justify-end gap-4 sm:flex-row">
              <Button className="bg-transparent sm:w-auto" variant="outline">
                Save Budget
              </Button>
              <Link href={`/trips/${params.id}/overview`}>
                <Button className="bg-amber-600 text-white hover:bg-amber-700 sm:w-auto">
                  Back to Overview
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BudgetManagement;
