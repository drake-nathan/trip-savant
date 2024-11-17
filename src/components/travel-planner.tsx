"use client";

import { format } from "date-fns";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Trip {
  airbnb?: string;
  endDate: Date;
  flight?: string;
  hotel?: string;
  id: number;
  name: string;
  startDate: Date;
}

export const TravelPlannerComponent = (): React.JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [newTrip, setNewTrip] = useState<Omit<Trip, "id">>({
    endDate: new Date(),
    name: "",
    startDate: new Date(),
  });
  const [selectedTrip, setSelectedTrip] = useState<null | Trip>(null);

  const handleLogin = (): void => {
    // In a real app, this would involve authentication
    setIsLoggedIn(true);
  };

  const handleLogout = (): void => {
    setIsLoggedIn(false);
  };

  const handleCreateTrip = (): void => {
    if (newTrip.name && newTrip.startDate && newTrip.endDate) {
      setTrips([...trips, { ...newTrip, id: Date.now() }]);
      setNewTrip({ endDate: new Date(), name: "", startDate: new Date() });
    }
  };

  const handleUpdateTrip = (updatedTrip: Trip): void => {
    setTrips(
      trips.map((trip) => {
        return trip.id === updatedTrip.id ? updatedTrip : trip;
      }),
    );
    setSelectedTrip(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Travel Planner</h1>
          {isLoggedIn ?
            <Button onClick={handleLogout}>Logout</Button>
          : <Button onClick={handleLogin}>Login</Button>}
        </div>
      </header>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {isLoggedIn ?
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create a New Trip</CardTitle>
                <CardDescription>Plan your next adventure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tripName">Trip Name</Label>
                  <Input
                    id="tripName"
                    onChange={(e) => {
                      return setNewTrip({ ...newTrip, name: e.target.value });
                    }}
                    placeholder="Summer Vacation"
                    value={newTrip.name}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full justify-start text-left font-normal"
                          variant="outline"
                        >
                          <CalendarIcon className="mr-2 size-4" />
                          {newTrip.startDate ?
                            format(newTrip.startDate, "PPP")
                          : <span>Pick a date</span>}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="p-0">
                        <Calendar
                          initialFocus
                          mode="single"
                          onSelect={(date) => {
                            return (
                              date &&
                              setNewTrip({ ...newTrip, startDate: date })
                            );
                          }}
                          selected={newTrip.startDate}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full justify-start text-left font-normal"
                          variant="outline"
                        >
                          <CalendarIcon className="mr-2 size-4" />
                          {newTrip.endDate ?
                            format(newTrip.endDate, "PPP")
                          : <span>Pick a date</span>}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="p-0">
                        <Calendar
                          initialFocus
                          mode="single"
                          onSelect={(date) => {
                            return (
                              date && setNewTrip({ ...newTrip, endDate: date })
                            );
                          }}
                          selected={newTrip.endDate}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleCreateTrip}>Create Trip</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Trips</CardTitle>
                <CardDescription>
                  Manage your upcoming adventures
                </CardDescription>
              </CardHeader>
              <CardContent>
                {trips.map((trip) => {
                  return (
                    <div
                      className="flex items-center justify-between border-b p-4 last:border-b-0"
                      key={trip.id}
                    >
                      <div>
                        <h3 className="font-semibold">{trip.name}</h3>
                        <p className="text-sm text-gray-500">
                          {format(trip.startDate, "MMM d, yyyy")} -{" "}
                          {format(trip.endDate, "MMM d, yyyy")}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => {
                                return setSelectedTrip(trip);
                              }}
                              size="icon"
                              variant="outline"
                            >
                              <PlusIcon className="size-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Trip Details</DialogTitle>
                              <DialogDescription>
                                Add flight, Airbnb, or hotel information for
                                your trip.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="flight">
                                  Flight Information
                                </Label>
                                <Input
                                  id="flight"
                                  onChange={(e) => {
                                    return setSelectedTrip((trip) => {
                                      return trip ?
                                          { ...trip, flight: e.target.value }
                                        : null;
                                    });
                                  }}
                                  placeholder="Flight number, time, etc."
                                  value={selectedTrip?.flight ?? ""}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="airbnb">
                                  Airbnb Information
                                </Label>
                                <Input
                                  id="airbnb"
                                  onChange={(e) => {
                                    return setSelectedTrip((trip) => {
                                      return trip ?
                                          { ...trip, airbnb: e.target.value }
                                        : null;
                                    });
                                  }}
                                  placeholder="Airbnb address, check-in info, etc."
                                  value={selectedTrip?.airbnb ?? ""}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="hotel">Hotel Information</Label>
                                <Input
                                  id="hotel"
                                  onChange={(e) => {
                                    return setSelectedTrip((trip) => {
                                      return trip ?
                                          { ...trip, hotel: e.target.value }
                                        : null;
                                    });
                                  }}
                                  placeholder="Hotel name, reservation number, etc."
                                  value={selectedTrip?.hotel ?? ""}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                onClick={() => {
                                  return (
                                    selectedTrip &&
                                    handleUpdateTrip(selectedTrip)
                                  );
                                }}
                              >
                                Save Details
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        : <Card>
            <CardHeader>
              <CardTitle>Welcome to Travel Planner</CardTitle>
              <CardDescription>
                Please log in to start planning your trips.
              </CardDescription>
            </CardHeader>
          </Card>
        }
      </main>
    </div>
  );
};
