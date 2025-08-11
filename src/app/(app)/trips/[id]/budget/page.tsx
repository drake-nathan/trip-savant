"use client";

import { MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type BudgetItem, sampleTrips } from "@/lib/data";

// FIXME
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BudgetOverviewPanel = ({ trip }: { trip: any }) => {
  const { prePaid, scheduled, total } = trip.budget;
  const remainingToPlan = total - prePaid - scheduled;
  const today = new Date();
  const tripDate = new Date(trip.startDate.replaceAll("-", "/"));
  const monthsUntilTrip =
    (tripDate.getFullYear() - today.getFullYear()) * 12 +
    (tripDate.getMonth() - today.getMonth());
  const savingsNeeded =
    scheduled > 0 && monthsUntilTrip > 0 ? scheduled / monthsUntilTrip : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
        <CardDescription>
          Total Trip Cost: ${total.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-1 flex justify-between">
            <span className="text-sm font-medium text-green-600">
              Already Paid
            </span>
            <span className="text-sm font-medium text-green-600">
              ${prePaid.toLocaleString()}
            </span>
          </div>
          <Progress
            className="h-2 [&>div]:bg-green-500"
            value={(prePaid / total) * 100}
          />
        </div>
        <div>
          <div className="mb-1 flex justify-between">
            <span className="text-sm font-medium text-yellow-600">
              Scheduled / Needs Saving
            </span>
            <span className="text-sm font-medium text-yellow-600">
              ${scheduled.toLocaleString()}
            </span>
          </div>
          <Progress
            className="h-2 [&>div]:bg-yellow-500"
            value={(scheduled / total) * 100}
          />
        </div>
        <div>
          <div className="mb-1 flex justify-between">
            <span className="text-sm font-medium text-gray-500">
              Remaining to Plan
            </span>
            <span className="text-sm font-medium text-gray-500">
              ${remainingToPlan.toLocaleString()}
            </span>
          </div>
          <Progress className="h-2" value={(remainingToPlan / total) * 100} />
        </div>
        <Separator />
        <div className="text-center">
          <p className="text-lg font-semibold">${savingsNeeded.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">
            Monthly savings needed
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const BudgetTable = ({
  items,
  onAddItem,
  onDeleteItem,
  onUpdateItem,
  title,
}: {
  items: BudgetItem[];
  onAddItem: () => void;
  onDeleteItem: (id: string) => void;
  onUpdateItem: (item: BudgetItem) => void;
  title: string;
}) => {
  const total = items.reduce((sum, item) => sum + item.amount, 0);
  const paidTotal = items
    .filter((item) => item.paid)
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              Total: ${total.toLocaleString()} | Paid: $
              {paidTotal.toLocaleString()}
            </CardDescription>
          </div>
          <Button onClick={onAddItem} size="sm" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Paid</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow className="group" key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={item.paid}
                    onCheckedChange={(checked) => {
                      onUpdateItem({ ...item, paid: Boolean(checked) });
                    }}
                  />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.category}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  ${item.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="h-8 w-8 opacity-0 group-hover:opacity-100"
                        size="icon"
                        variant="ghost"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => {
                          onDeleteItem(item.id);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const BudgetPage = ({ params }: { params: { id: string } }) => {
  const tripData = sampleTrips.find((t) => t.id === params.id);
  const [trip, setTrip] = React.useState(tripData);

  if (!trip) {
    return <div>Trip not found</div>;
  }

  const handleUpdateItem = (
    section: "daily" | "preTrip",
    updatedItem: BudgetItem,
  ) => {
    setTrip((prevTrip) => {
      if (!prevTrip) return prevTrip;
      const newSectionItems = prevTrip.budget[section].map((item) =>
        item.id === updatedItem.id ? updatedItem : item,
      );
      return {
        ...prevTrip,
        budget: {
          ...prevTrip.budget,
          [section]: newSectionItems,
        },
      };
    });
  };

  const handleDeleteItem = (section: "daily" | "preTrip", itemId: string) => {
    setTrip((prevTrip) => {
      if (!prevTrip) return prevTrip;
      const newSectionItems = prevTrip.budget[section].filter(
        (item) => item.id !== itemId,
      );
      return {
        ...prevTrip,
        budget: {
          ...prevTrip.budget,
          [section]: newSectionItems,
        },
      };
    });
  };

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="space-y-6 md:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Budget: {trip.destination}</h1>
            <p className="text-muted-foreground">
              Manage your pre-trip and daily expenses.
            </p>
          </div>
          <Button asChild>
            <Link href={`/trips/${trip.id}/itinerary`}>View Itinerary</Link>
          </Button>
        </div>
        <BudgetTable
          items={trip.budget.preTrip}
          onAddItem={() => {
            console.info("Add pre-trip item");
          }}
          onDeleteItem={(id) => {
            handleDeleteItem("preTrip", id);
          }}
          onUpdateItem={(item) => {
            handleUpdateItem("preTrip", item);
          }}
          title="Pre-Trip Expenses"
        />
        <BudgetTable
          items={trip.budget.daily}
          onAddItem={() => {
            console.info("Add daily item");
          }}
          onDeleteItem={(id) => {
            handleDeleteItem("daily", id);
          }}
          onUpdateItem={(item) => {
            handleUpdateItem("daily", item);
          }}
          title="Daily Budget Planning"
        />
      </div>
      <div className="md:col-span-1">
        <BudgetOverviewPanel trip={trip} />
      </div>
    </div>
  );
};

export default BudgetPage;
