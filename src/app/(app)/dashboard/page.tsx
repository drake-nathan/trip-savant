"use client";

import {
  LayoutGrid,
  List,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleTrips, type Trip } from "@/lib/data";

const getStatusVariant = (status: Trip["status"]) => {
  switch (status) {
    case "Booked": {
      return "secondary";
    }
    case "Completed": {
      return "outline";
    }
    case "Idea": {
      return "destructive";
    }
    case "Planning": {
      return "default";
    }
    default: {
      return "default";
    }
  }
};

const TripCard = ({ trip }: { trip: Trip }) => (
  <Card>
    <CardHeader>
      <div className="flex items-start justify-between">
        <div>
          <CardTitle>{trip.destination}</CardTitle>
          <CardDescription>
            {trip.startDate} - {trip.endDate}
          </CardDescription>
        </div>
        <Badge variant={getStatusVariant(trip.status)}>{trip.status}</Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div>
          <div className="mb-1 flex justify-between text-sm text-muted-foreground">
            <span>Budget</span>
            <span>
              ${trip.budget.prePaid.toLocaleString()} / $
              {trip.budget.total.toLocaleString()}
            </span>
          </div>
          <Progress value={(trip.budget.prePaid / trip.budget.total) * 100} />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-lg font-bold">{trip.duration} days</p>
            <p className="text-xs text-muted-foreground">Duration</p>
          </div>
          <div>
            <p className="text-lg font-bold">
              ${trip.budget.total.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Budgeted</p>
          </div>
          <div>
            <p className="text-lg font-bold">
              {Math.round((trip.budget.prePaid / trip.budget.total) * 100)}%
            </p>
            <p className="text-xs text-muted-foreground">Pre-paid</p>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button asChild variant="outline">
        <Link href={`/trips/${trip.id}/itinerary`}>View Itinerary</Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/trips/${trip.id}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/trips/${trip.id}/budget`}>Manage Budget</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardFooter>
  </Card>
);

const TripRow = ({ trip }: { trip: Trip }) => (
  <TableRow>
    <TableCell className="font-medium">{trip.destination}</TableCell>
    <TableCell>
      {trip.startDate} - {trip.endDate}
    </TableCell>
    <TableCell>
      <Badge variant={getStatusVariant(trip.status)}>{trip.status}</Badge>
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-2">
        <Progress
          className="w-24"
          value={(trip.budget.prePaid / trip.budget.total) * 100}
        />
        <span className="text-xs text-muted-foreground">
          {Math.round((trip.budget.prePaid / trip.budget.total) * 100)}%
        </span>
      </div>
    </TableCell>
    <TableCell className="text-right">
      ${trip.budget.total.toLocaleString()}
    </TableCell>
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/trips/${trip.id}/itinerary`}>View Itinerary</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/trips/${trip.id}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/trips/${trip.id}/budget`}>Manage Budget</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
);

const Dashboard = () => {
  const [view, setView] = React.useState("card");
  const [trips] = React.useState(sampleTrips);

  const upcomingTrips = trips.filter(
    (trip) => trip.status !== "Completed" && trip.status !== "Idea",
  );
  const allTrips = trips;
  const pastTrips = trips.filter((trip) => trip.status === "Completed");

  const renderTrips = (tripList: Trip[]) => {
    if (tripList.length === 0) {
      return (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed py-20 shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no trips here
            </h3>
            <p className="text-sm text-muted-foreground">
              Start planning your next adventure!
            </p>
            <Button asChild className="mt-4">
              <Link href="/trips/new">New Trip</Link>
            </Button>
          </div>
        </div>
      );
    }

    if (view === "card") {
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tripList.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      );
    }

    return (
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Destination</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Budget Progress</TableHead>
              <TableHead className="text-right">Total Budget</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tripList.map((trip) => (
              <TripRow key={trip.id} trip={trip} />
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  };

  return (
    <Tabs defaultValue="upcoming">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 gap-1" size="sm" variant="outline">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Status</DropdownMenuItem>
              <DropdownMenuItem>Date</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="h-8 w-8"
            onClick={() => {
              setView("card");
            }}
            size="icon"
            variant={view === "card" ? "secondary" : "ghost"}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Card View</span>
          </Button>
          <Button
            className="h-8 w-8"
            onClick={() => {
              setView("table");
            }}
            size="icon"
            variant={view === "table" ? "secondary" : "ghost"}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">Table View</span>
          </Button>
          <Button asChild className="h-8 gap-1" size="sm">
            <Link href="/trips/new">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                New Trip
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <TabsContent value="upcoming">{renderTrips(upcomingTrips)}</TabsContent>
      <TabsContent value="all">{renderTrips(allTrips)}</TabsContent>
      <TabsContent value="past">{renderTrips(pastTrips)}</TabsContent>
    </Tabs>
  );
};

export default Dashboard;
