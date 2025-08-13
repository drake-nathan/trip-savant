"use client";

import type React from "react";

import { differenceInDays, format } from "date-fns";
import { ArrowLeft, CalendarIcon, Plane } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";

const NewTrip = () => {
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [status, setStatus] = useState<string>("");
  const [flightDetails, setFlightDetails] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [localTransport, setLocalTransport] = useState("");
  const [notes, setNotes] = useState("");

  const calculateDays = () => {
    if (startDate && endDate) {
      return differenceInDays(endDate, startDate) + 1;
    }
    return 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the trip data and redirect to budget setup
    console.info("Trip created:", {
      accommodation,
      days: calculateDays(),
      destination,
      endDate,
      flightDetails,
      localTransport,
      notes,
      startDate,
      status,
      tripName,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
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
            Create New Trip
          </h1>
          <p className="text-slate-600">Start crafting your perfect journey</p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Basic Trip Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-sans">Trip Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tripName">Trip Name</Label>
                  <Input
                    id="tripName"
                    onChange={(e) => {
                      setTripName(e.target.value);
                    }}
                    placeholder="e.g., Tokyo Adventure"
                    required
                    value={tripName}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    onChange={(e) => {
                      setDestination(e.target.value);
                    }}
                    placeholder="e.g., Tokyo, Japan"
                    required
                    value={destination}
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                        )}
                        variant="outline"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        // FIXME
                        // eslint-disable-next-line @typescript-eslint/no-deprecated
                        initialFocus
                        mode="single"
                        onSelect={setStartDate}
                        selected={startDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                        )}
                        variant="outline"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        // FIXME
                        // eslint-disable-next-line @typescript-eslint/no-deprecated
                        initialFocus
                        mode="single"
                        onSelect={setEndDate}
                        selected={endDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Duration</Label>
                  <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm">
                    {calculateDays() > 0 ?
                      `${calculateDays()} days`
                    : "Select dates"}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trip Status</Label>
                <Select onValueChange={setStatus} required value={status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trip status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Idea">
                      Idea - Just thinking about it
                    </SelectItem>
                    <SelectItem value="Planning">
                      Planning - Researching and organizing
                    </SelectItem>
                    <SelectItem value="Booked">
                      Booked - Reservations confirmed
                    </SelectItem>
                    <SelectItem value="Completed">
                      Completed - Trip finished
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Transportation Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-sans">
                <Plane className="h-5 w-5 text-amber-600" />
                Transportation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="flightDetails">Flight Details</Label>
                <Textarea
                  id="flightDetails"
                  onChange={(e) => {
                    setFlightDetails(e.target.value);
                  }}
                  placeholder="e.g., United Airlines UA123, Depart: LAX 8:00 AM, Arrive: NRT 1:30 PM +1"
                  rows={3}
                  value={flightDetails}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accommodation">Accommodation Info</Label>
                <Textarea
                  id="accommodation"
                  onChange={(e) => {
                    setAccommodation(e.target.value);
                  }}
                  placeholder="e.g., Hotel Gracery Shinjuku, 1-19-1 Kabukicho, Shinjuku City, Tokyo"
                  rows={3}
                  value={accommodation}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="localTransport">Local Transport</Label>
                <Select
                  onValueChange={setLocalTransport}
                  value={localTransport}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Primary local transportation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="walking">Walking</SelectItem>
                    <SelectItem value="public-transit">
                      Public Transit
                    </SelectItem>
                    <SelectItem value="rental-car">Rental Car</SelectItem>
                    <SelectItem value="rideshare">Rideshare/Taxi</SelectItem>
                    <SelectItem value="bicycle">Bicycle</SelectItem>
                    <SelectItem value="mixed">Mixed Transportation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="font-sans">Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="notes">Trip Notes</Label>
                <Textarea
                  id="notes"
                  onChange={(e) => {
                    setNotes(e.target.value);
                  }}
                  placeholder="Any additional details, special considerations, or reminders for this trip..."
                  rows={4}
                  value={notes}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col justify-end gap-4 sm:flex-row">
            <Button
              className="bg-transparent sm:w-auto"
              type="button"
              variant="outline"
            >
              Save as Draft
            </Button>
            <Link href="/trips/1/overview">
              <Button
                className="bg-amber-600 text-white hover:bg-amber-700 sm:w-auto"
                type="submit"
              >
                Create Trip & Continue
              </Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewTrip;
