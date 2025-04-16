"use client";

import { format } from "date-fns";
import {
  Calendar,
  DollarSign,
  Edit,
  Map,
  PlusCircle,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import type { TripStatus } from "@/generated/client";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";

const Trips = () => {
  // Fetch trips from API
  const { data: trips = [], refetch } = api.trip.getAll.useQuery();

  // Handle loading state
  // const isLoading = false; // Uncomment when needed
  // const error = null; // Uncomment when needed

  // Delete trip mutation
  const deleteTripMutation = api.trip.delete.useMutation({
    onError: (error) => {
      toast.error(`Error deleting trip: ${error.message}`);
    },
    onSuccess: () => {
      toast("The trip has been successfully deleted.");
      void refetch(); // Refetch the trips list after deletion
    },
  });

  const deleteTrip = (id: string) => {
    deleteTripMutation.mutate({ id });
  };

  const getStatusColor = (status: TripStatus) => {
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
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Trips</h1>
        <Button asChild>
          <Link href="/trips/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Trip
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Trips</TabsTrigger>
          <TabsTrigger value="idea">Ideas</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="booked">Booked</TabsTrigger>
        </TabsList>
        <TabsContent className="mt-6" value="all">
          {trips.length === 0 ?
            <div className="py-10 text-center">
              <p className="text-muted-foreground">
                You haven&apos;t created any trips yet.
              </p>
              <Button asChild className="mt-4">
                <Link href="/trips/new">Create Your First Trip</Link>
              </Button>
            </div>
          : <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trips.map((trip) => (
                <Card key={trip.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle>{trip.destination}</CardTitle>
                      <Badge className={getStatusColor(trip.status)}>
                        {trip.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {format(new Date(trip.startDate), "MMM d, yyyy")} -{" "}
                      {format(new Date(trip.endDate), "MMM d, yyyy")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="text-muted-foreground h-4 w-4" />
                        <span>
                          Budget: ${trip.budget?.total.toLocaleString() ?? 0}
                        </span>
                      </div>
                      {trip.flight ?
                        <div className="flex items-center gap-2">
                          <Map className="text-muted-foreground h-4 w-4" />
                          <span>Flight: {trip.flight}</span>
                        </div>
                      : null}
                      {trip.lodging ?
                        <div className="flex items-center gap-2">
                          <Calendar className="text-muted-foreground h-4 w-4" />
                          <span>Lodging: {trip.lodging}</span>
                        </div>
                      : null}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button asChild variant="outline">
                      <Link href={`/trips/${trip.id}`}>View Details</Link>
                    </Button>
                    <div className="flex gap-2">
                      <Button asChild size="icon" variant="ghost">
                        <Link href={`/trips/${trip.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button
                        onClick={() => {
                          deleteTrip(trip.id);
                        }}
                        size="icon"
                        variant="ghost"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          }
        </TabsContent>
        <TabsContent className="mt-6" value="idea">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trips
              .filter((trip) => trip.status.toLowerCase() === "idea")
              .map((trip) => (
                <Card key={trip.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle>{trip.destination}</CardTitle>
                      <Badge className={getStatusColor(trip.status)}>
                        {trip.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {format(new Date(trip.startDate), "MMM d, yyyy")} -{" "}
                      {format(new Date(trip.endDate), "MMM d, yyyy")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="text-muted-foreground h-4 w-4" />
                        <span>
                          Budget: ${trip.budget?.total.toLocaleString() ?? 0}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button asChild variant="outline">
                      <Link href={`/trips/${trip.id}`}>View Details</Link>
                    </Button>
                    <div className="flex gap-2">
                      <Button asChild size="icon" variant="ghost">
                        <Link href={`/trips/${trip.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button
                        onClick={() => {
                          deleteTrip(trip.id);
                        }}
                        size="icon"
                        variant="ghost"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent className="mt-6" value="planning">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trips
              .filter((trip) => trip.status.toLowerCase() === "planning")
              .map((trip) => (
                <Card key={trip.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle>{trip.destination}</CardTitle>
                      <Badge className={getStatusColor(trip.status)}>
                        {trip.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {format(new Date(trip.startDate), "MMM d, yyyy")} -{" "}
                      {format(new Date(trip.endDate), "MMM d, yyyy")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="text-muted-foreground h-4 w-4" />
                        <span>
                          Budget: ${trip.budget?.total.toLocaleString() ?? 0}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button asChild variant="outline">
                      <Link href={`/trips/${trip.id}`}>View Details</Link>
                    </Button>
                    <div className="flex gap-2">
                      <Button asChild size="icon" variant="ghost">
                        <Link href={`/trips/${trip.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button
                        onClick={() => {
                          deleteTrip(trip.id);
                        }}
                        size="icon"
                        variant="ghost"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent className="mt-6" value="booked">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trips
              .filter((trip) => trip.status.toLowerCase() === "booked")
              .map((trip) => (
                <Card key={trip.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle>{trip.destination}</CardTitle>
                      <Badge className={getStatusColor(trip.status)}>
                        {trip.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {format(new Date(trip.startDate), "MMM d, yyyy")} -{" "}
                      {format(new Date(trip.endDate), "MMM d, yyyy")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="text-muted-foreground h-4 w-4" />
                        <span>
                          Budget: ${trip.budget?.total.toLocaleString() ?? 0}
                        </span>
                      </div>
                      {trip.flight ?
                        <div className="flex items-center gap-2">
                          <Map className="text-muted-foreground h-4 w-4" />
                          <span>Flight: {trip.flight}</span>
                        </div>
                      : null}
                      {trip.lodging ?
                        <div className="flex items-center gap-2">
                          <Calendar className="text-muted-foreground h-4 w-4" />
                          <span>Lodging: {trip.lodging}</span>
                        </div>
                      : null}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button asChild variant="outline">
                      <Link href={`/trips/${trip.id}`}>View Details</Link>
                    </Button>
                    <div className="flex gap-2">
                      <Button asChild size="icon" variant="ghost">
                        <Link href={`/trips/${trip.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button
                        onClick={() => {
                          deleteTrip(trip.id);
                        }}
                        size="icon"
                        variant="ghost"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Trips;
