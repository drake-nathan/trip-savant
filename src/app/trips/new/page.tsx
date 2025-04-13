"use client";

import type React from "react";

import { format } from "date-fns";
import { Building, CalendarIcon, Car, PlaneTakeoff } from "lucide-react";
import { useRouter } from "next/navigation";
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

const NewTripPage = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Save trip data to database
    toast("Your trip has been successfully pretended.");

    router.push("/trips");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">Create New Trip</h1>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
            <CardDescription>
              Enter the basic information about your trip.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="e.g., Paris, France"
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
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
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
                <Input id="flight" placeholder="e.g., AA123, JFK to CDG" />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2" htmlFor="lodging">
                  <Building className="h-4 w-4" /> Lodging
                </Label>
                <Input id="lodging" placeholder="e.g., Marriott Hotel Paris" />
              </div>

              <div className="space-y-2">
                <Label
                  className="flex items-center gap-2"
                  htmlFor="transportation"
                >
                  <Car className="h-4 w-4" /> Local Transportation
                </Label>
                <Select>
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
            <Button type="submit">Create Trip</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default NewTripPage;
