"use client";

import {
  Calendar,
  Clock,
  DollarSign,
  LayoutGrid,
  List,
  MapPin,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

// Sample trip data
const sampleTrips = [
  {
    budget: 4500,
    dates: "Mar 15 - Mar 25, 2024",
    days: 10,
    destination: "Tokyo, Japan",
    id: 1,
    image: "/tokyo-cherry-blossoms.png",
    prepaidPercentage: 71,
    spent: 3200,
    status: "Booked" as const,
  },
  {
    budget: 1200,
    dates: "Apr 8 - Apr 10, 2024",
    days: 3,
    destination: "Las Vegas, Nevada",
    id: 2,
    image: "/las-vegas-strip-neon.png",
    prepaidPercentage: 33,
    spent: 400,
    status: "Planning" as const,
  },
  {
    budget: 6000,
    dates: "Jun 1 - Jun 21, 2024",
    days: 21,
    destination: "European Adventure",
    id: 3,
    image: "/european-cities-architecture.png",
    prepaidPercentage: 0,
    spent: 0,
    status: "Idea" as const,
  },
];

const statusColors = {
  Booked: "bg-green-100 text-green-800",
  Completed: "bg-blue-100 text-blue-800",
  Idea: "bg-gray-100 text-gray-800",
  Planning: "bg-amber-100 text-amber-800",
};

const Dashboard = () => {
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [filter, setFilter] = useState<"All" | "Past" | "Upcoming">("Upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrips = sampleTrips.filter((trip) => {
    const matchesSearch = trip.destination
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (filter === "All") return matchesSearch;
    if (filter === "Upcoming") {
      // @ts-expect-error FIXME later
      return matchesSearch && trip.status !== "Completed";
    }
    // @ts-expect-error FIXME later
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (filter === "Past") return matchesSearch && trip.status === "Completed";
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="mb-2 font-sans text-3xl font-bold text-slate-800">
            Dashboard
          </h1>
          <p className="text-slate-600">
            Your next adventure, perfectly planned.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
              <Input
                className="w-64 pl-10"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                placeholder="Search trips..."
                value={searchQuery}
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex rounded-lg border border-slate-200 bg-white p-1">
              {(["Upcoming", "All", "Past"] as const).map((filterOption) => (
                <Button
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    filter === filterOption ?
                      "bg-amber-600 text-white"
                    : "text-slate-600 hover:text-slate-800"
                  }`}
                  key={filterOption}
                  onClick={() => {
                    setFilter(filterOption);
                  }}
                >
                  {filterOption}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex rounded-lg border border-slate-200 bg-white p-1">
              <Button
                className={`rounded-md p-2 transition-colors ${
                  viewMode === "card" ?
                    "bg-slate-100 text-slate-800"
                  : "text-slate-600 hover:text-slate-800"
                }`}
                onClick={() => {
                  setViewMode("card");
                }}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                className={`rounded-md p-2 transition-colors ${
                  viewMode === "table" ?
                    "bg-slate-100 text-slate-800"
                  : "text-slate-600 hover:text-slate-800"
                }`}
                onClick={() => {
                  setViewMode("table");
                }}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Link href="/trips/new">
              <Button className="bg-amber-600 text-white hover:bg-amber-700">
                <Plus className="mr-2 h-4 w-4" />
                New Trip
              </Button>
            </Link>
          </div>
        </div>

        {/* Trips Display */}
        {viewMode === "card" ?
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTrips.map((trip) => (
              <Link href={`/trips/${trip.id}/overview`} key={trip.id}>
                <Card className="cursor-pointer transition-shadow duration-300 hover:shadow-lg">
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    {/* eslint-disable-next-line nextjs/no-img-element */}
                    <img
                      alt={trip.destination}
                      className="h-full w-full object-cover"
                      src={trip.image || "/placeholder.svg"}
                    />
                    <Badge
                      className={`absolute top-3 right-3 ${statusColors[trip.status]}`}
                    >
                      {trip.status}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="mb-1 font-sans text-xl font-semibold text-slate-800">
                        {trip.destination}
                      </h3>
                      <p className="flex items-center text-slate-600">
                        <Calendar className="mr-1 h-4 w-4" />
                        {trip.dates}
                      </p>
                    </div>

                    {/* Budget Progress */}
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">
                          Budget Progress
                        </span>
                        <span className="text-sm text-slate-600">
                          ${trip.spent.toLocaleString()} / $
                          {trip.budget.toLocaleString()}
                        </span>
                      </div>
                      <Progress
                        className="h-2"
                        value={trip.prepaidPercentage}
                      />
                      <p className="mt-1 text-xs text-slate-500">
                        {trip.prepaidPercentage}% pre-paid
                      </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex justify-between text-sm text-slate-600">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {trip.days} days
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="mr-1 h-4 w-4" />$
                        {trip.budget.toLocaleString()} budgeted
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        : <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-slate-800">
                      Destination
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-800">
                      Dates
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-800">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-800">
                      Budget
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-800">
                      Progress
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-800">
                      Days
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTrips.map((trip) => (
                    <Link href={`/trips/${trip.id}/overview`} key={trip.id}>
                      <tr className="cursor-pointer border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-slate-400" />
                            <span className="font-medium text-slate-800">
                              {trip.destination}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {trip.dates}
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={statusColors[trip.status]}>
                            {trip.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-800">
                          ${trip.budget.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Progress
                              className="h-2 w-20"
                              value={trip.prepaidPercentage}
                            />
                            <span className="text-sm text-slate-600">
                              {trip.prepaidPercentage}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {trip.days}
                        </td>
                      </tr>
                    </Link>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        }

        {/* Empty State */}
        {filteredTrips.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
              <MapPin className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="mb-2 font-sans text-lg font-semibold text-slate-800">
              No trips found
            </h3>
            <p className="mb-6 text-slate-600">
              {searchQuery ?
                "Try adjusting your search terms"
              : "No trip yet? Start crafting your perfect journey."}
            </p>
            <Link href="/trips/new">
              <Button className="bg-amber-600 text-white hover:bg-amber-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Trip
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
