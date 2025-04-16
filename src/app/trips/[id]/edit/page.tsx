"use client";

import type React from "react";

import { format } from "date-fns";
import { Building, CalendarIcon, Car, PlaneTakeoff } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";

const EditTripPage = () => {
  const params = useParams();
  const router = useRouter();

  // Fetch the trip by ID using tRPC
  const { id } = params;
  const {
    data: trip,
    error,
    isLoading,
  } = api.trip.getById.useQuery({ id: id as string });

  const [startDate, setStartDate] = useState<Date | undefined>(
    trip ? new Date(trip.startDate) : undefined,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    trip ? new Date(trip.endDate) : undefined,
  );

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, we would update the trip data in a database
    toast("Your trip has been successfully updated.");

    router.push(`/trips/${trip.id}`);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">Edit Trip: {trip.destination}</h1>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
            <CardDescription>
              Update the information about your trip.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                defaultValue={trip.destination}
                id="destination"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="w-full justify-start text-left font-normal"
                      variant="outline"
                    >
                      {startDate ?
                        format(startDate, "PPP")
                      : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      initialFocus
                      mode="single"
                      onSelect={setStartDate}
                      selected={startDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="w-full justify-start text-left font-normal"
                      variant="outline"
                    >
                      {endDate ?
                        format(endDate, "PPP")
                      : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      disabled={(date) =>
                        startDate ? date < startDate : false
                      }
                      initialFocus
                      mode="single"
                      onSelect={setEndDate}
                      selected={endDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trip Status</Label>
              <Select defaultValue={trip.status.toLowerCase()}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Transportation & Lodging</h3>

              <div className="space-y-2">
                <Label className="flex items-center gap-2" htmlFor="flight">
                  <PlaneTakeoff className="h-4 w-4" /> Flight Details
                </Label>
                <Input defaultValue={trip.flight ?? ""} id="flight" />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2" htmlFor="lodging">
                  <Building className="h-4 w-4" /> Lodging
                </Label>
                <Input defaultValue={trip.lodging ?? ""} id="lodging" />
              </div>

              <div className="space-y-2">
                <Label
                  className="flex items-center gap-2"
                  htmlFor="transportation"
                >
                  <Car className="h-4 w-4" /> Local Transportation
                </Label>
                <Select defaultValue={trip.transportation ?? ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transportation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rental">Rental Car</SelectItem>
                    <SelectItem value="transit">Public Transit</SelectItem>
                    <SelectItem value="taxi">Taxi/Rideshare</SelectItem>
                    <SelectItem value="walking">Walking</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Total Budget ($)</Label>
              <Input
                defaultValue={trip.budget?.total.toString() ?? ""}
                id="budget"
                type="number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes about your trip..."
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() => {
                router.back();
              }}
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default EditTripPage;
