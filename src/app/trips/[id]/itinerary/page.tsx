"use client";

import { addDays, format } from "date-fns";
import {
  ArrowLeft,
  Building,
  Calendar,
  Car,
  ChevronDown,
  ChevronRight,
  Clock,
  DollarSign,
  ExternalLink,
  GripVertical,
  MoreHorizontal,
  Music,
  Plane,
  Plus,
  ShoppingBag,
  Trash2,
  TrendingUp,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

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

// Time options for activities
const timeOptions = [
  { label: "Morning", value: "morning" },
  { label: "After Breakfast", value: "after-breakfast" },
  { label: "Mid Morning", value: "mid-morning" },
  { label: "Before Lunch", value: "before-lunch" },
  { label: "Lunch", value: "lunch" },
  { label: "After Lunch", value: "after-lunch" },
  { label: "Afternoon", value: "afternoon" },
  { label: "Evening", value: "evening" },
  { label: "Dinner", value: "dinner" },
  { label: "Night", value: "night" },
  { label: "Specific Time", value: "specific" },
];

// Sample itinerary data
const initialItinerary = [
  {
    activities: [
      {
        category: "flights",
        cost: 0,
        duration: "13 hours",
        id: 1,
        isFixed: true,
        linkToBudget: false,
        name: "Flight to Tokyo",
        notes: "United Airlines UA123",
        specificTime: "08:00",
        timeType: "specific",
      },
      {
        category: "accommodation",
        cost: 0,
        duration: "30 minutes",
        id: 2,
        isFixed: false,
        linkToBudget: false,
        name: "Hotel check-in",
        notes: "Hotel Gracery Shinjuku",
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
        isFixed: false,
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
        isFixed: false,
        linkToBudget: true,
        name: "Lunch at local ramen shop",
        notes: "Try the tonkotsu ramen",
        timeType: "lunch",
      },
    ],
    date: new Date("2024-03-16"),
    day: 2,
  },
];

const ItineraryPlanning = ({ params }: { params: { id: string } }) => {
  const [itinerary, setItinerary] = useState(initialItinerary);
  const [collapsedDays, setCollapsedDays] = useState<Set<number>>(new Set());
  const [showAddActivity, setShowAddActivity] = useState<null | number>(null);
  const [newActivity, setNewActivity] = useState({
    category: "",
    cost: "",
    duration: "",
    linkToBudget: false,
    name: "",
    notes: "",
    specificTime: "",
    timeType: "",
  });

  // Generate all days for the trip
  const generateDays = () => {
    const days = [];
    for (let i = 0; i < tripData.days; i++) {
      const date = addDays(tripData.startDate, i);
      const existingDay = itinerary.find((day) => day.day === i + 1);
      days.push({
        activities: existingDay?.activities ?? [],
        date,
        day: i + 1,
      });
    }
    return days;
  };

  const allDays = generateDays();

  const toggleDayCollapse = (day: number) => {
    const newCollapsed = new Set(collapsedDays);
    if (newCollapsed.has(day)) {
      newCollapsed.delete(day);
    } else {
      newCollapsed.add(day);
    }
    setCollapsedDays(newCollapsed);
  };

  const addActivity = (dayNumber: number) => {
    if (newActivity.name && newActivity.category && newActivity.timeType) {
      const activity = {
        category: newActivity.category,
        cost: Number.parseFloat(newActivity.cost) || 0,
        duration: newActivity.duration,
        id: Date.now(),
        isFixed: newActivity.timeType === "specific",
        linkToBudget: newActivity.linkToBudget,
        name: newActivity.name,
        notes: newActivity.notes,
        specificTime: newActivity.specificTime,
        timeType: newActivity.timeType,
      };

      setItinerary((prev) => {
        const updated = prev.map((day) => {
          if (day.day === dayNumber) {
            return { ...day, activities: [...day.activities, activity] };
          }
          return day;
        });

        // If day doesn't exist in itinerary, add it
        if (!prev.find((day) => day.day === dayNumber)) {
          const date = addDays(tripData.startDate, dayNumber - 1);
          updated.push({ activities: [activity], date, day: dayNumber });
        }

        return updated;
      });

      setNewActivity({
        category: "",
        cost: "",
        duration: "",
        linkToBudget: false,
        name: "",
        notes: "",
        specificTime: "",
        timeType: "",
      });
      setShowAddActivity(null);
    }
  };

  const removeActivity = (dayNumber: number, activityId: number) => {
    setItinerary((prev) =>
      prev.map((day) => {
        if (day.day === dayNumber) {
          return {
            ...day,
            activities: day.activities.filter(
              (activity) => activity.id !== activityId,
            ),
          };
        }
        return day;
      }),
    );
  };

  const getDailySpending = (dayNumber: number) => {
    const day = itinerary.find((d) => d.day === dayNumber);
    if (!day) return 0;
    return day.activities
      .filter((a) => a.linkToBudget)
      .reduce((sum, activity) => sum + activity.cost, 0);
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
    return (
      timeOptions.find((opt) => opt.value === activity.timeType)?.label ||
      activity.timeType
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
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
            <Link href={`/trips/${params.id}/budget`}>
              <Button className="bg-transparent" size="sm" variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Budget
              </Button>
            </Link>
          </div>
          <h1 className="mb-2 font-sans text-3xl font-bold text-slate-800">
            Daily Itinerary
          </h1>
          <p className="text-slate-600">
            {tripData.name} • {format(tripData.startDate, "MMM d")} -{" "}
            {format(tripData.endDate, "MMM d, yyyy")}
          </p>
        </div>

        {/* Budget Impact Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-50 p-2">
                  <TrendingUp className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">
                    Total Planned Spending
                  </p>
                  <p className="text-xl font-bold text-amber-600">
                    $
                    {itinerary.reduce(
                      (total, day) =>
                        total +
                        day.activities
                          .filter((a) => a.linkToBudget)
                          .reduce((sum, a) => sum + a.cost, 0),
                      0,
                    )}
                  </p>
                </div>
              </div>
              <Link href={`/trips/${params.id}/overview`}>
                <Button className="bg-transparent" size="sm" variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Budget Impact
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Itinerary Days */}
        <div className="space-y-6">
          {allDays.map((day) => {
            const isCollapsed = collapsedDays.has(day.day);
            const dailySpending = getDailySpending(day.day);

            return (
              <Card className="overflow-hidden" key={day.day}>
                <Collapsible
                  onOpenChange={() => {
                    toggleDayCollapse(day.day);
                  }}
                  open={!isCollapsed}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer transition-colors hover:bg-slate-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {isCollapsed ?
                            <ChevronRight className="h-5 w-5 text-slate-400" />
                          : <ChevronDown className="h-5 w-5 text-slate-400" />}
                          <div>
                            <CardTitle className="font-sans">
                              Day {day.day} - {format(day.date, "EEEE, MMM d")}
                            </CardTitle>
                            <p className="mt-1 text-sm text-slate-600">
                              {day.activities.length} activities planned
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {dailySpending > 0 && (
                            <Badge
                              className="border-amber-200 bg-amber-50 text-amber-700"
                              variant="outline"
                            >
                              <DollarSign className="mr-1 h-3 w-3" />$
                              {dailySpending}
                            </Badge>
                          )}
                          <Button
                            className="bg-transparent"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowAddActivity(day.day);
                            }}
                            size="sm"
                            variant="outline"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Activity
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      {/* Add Activity Form */}
                      {showAddActivity === day.day && (
                        <div className="mb-6 space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                          <h4 className="font-semibold text-slate-800">
                            Add New Activity
                          </h4>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="activityName">
                                Activity Name
                              </Label>
                              <Input
                                id="activityName"
                                onChange={(e) => {
                                  setNewActivity({
                                    ...newActivity,
                                    name: e.target.value,
                                  });
                                }}
                                placeholder="e.g., Visit Senso-ji Temple"
                                value={newActivity.name}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="activityCategory">Category</Label>
                              <Select
                                onValueChange={(value) => {
                                  setNewActivity({
                                    ...newActivity,
                                    category: value,
                                  });
                                }}
                                value={newActivity.category}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {activityCategories.map((category) => (
                                    <SelectItem
                                      key={category.id}
                                      value={category.id}
                                    >
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                              <Label htmlFor="activityTime">Time</Label>
                              <Select
                                onValueChange={(value) => {
                                  setNewActivity({
                                    ...newActivity,
                                    timeType: value,
                                  });
                                }}
                                value={newActivity.timeType}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeOptions.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {newActivity.timeType === "specific" && (
                              <div className="space-y-2">
                                <Label htmlFor="specificTime">
                                  Specific Time
                                </Label>
                                <Input
                                  id="specificTime"
                                  onChange={(e) => {
                                    setNewActivity({
                                      ...newActivity,
                                      specificTime: e.target.value,
                                    });
                                  }}
                                  type="time"
                                  value={newActivity.specificTime}
                                />
                              </div>
                            )}

                            <div className="space-y-2">
                              <Label htmlFor="activityDuration">Duration</Label>
                              <Input
                                id="activityDuration"
                                onChange={(e) => {
                                  setNewActivity({
                                    ...newActivity,
                                    duration: e.target.value,
                                  });
                                }}
                                placeholder="e.g., 2 hours"
                                value={newActivity.duration}
                              />
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="activityCost">Cost ($)</Label>
                              <Input
                                id="activityCost"
                                onChange={(e) => {
                                  setNewActivity({
                                    ...newActivity,
                                    cost: e.target.value,
                                  });
                                }}
                                placeholder="0"
                                type="number"
                                value={newActivity.cost}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Link to Budget</Label>
                              <div className="flex h-10 items-center space-x-2">
                                <Switch
                                  checked={newActivity.linkToBudget}
                                  onCheckedChange={(checked) => {
                                    setNewActivity({
                                      ...newActivity,
                                      linkToBudget: checked,
                                    });
                                  }}
                                />
                                <span className="text-sm text-slate-600">
                                  {newActivity.linkToBudget ?
                                    "Counts toward daily budget"
                                  : "No budget impact"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="activityNotes">Notes</Label>
                            <Textarea
                              id="activityNotes"
                              onChange={(e) => {
                                setNewActivity({
                                  ...newActivity,
                                  notes: e.target.value,
                                });
                              }}
                              placeholder="Additional details, confirmation numbers, etc."
                              rows={2}
                              value={newActivity.notes}
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button
                              className="bg-amber-600 text-white hover:bg-amber-700"
                              onClick={() => {
                                addActivity(day.day);
                              }}
                              size="sm"
                            >
                              Add Activity
                            </Button>
                            <Button
                              onClick={() => {
                                setShowAddActivity(null);
                              }}
                              size="sm"
                              variant="outline"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Activities List */}
                      <div className="space-y-3">
                        {day.activities.length === 0 ?
                          <div className="py-8 text-center text-slate-500">
                            <Calendar className="mx-auto mb-3 h-12 w-12 text-slate-300" />
                            <p>No activities planned for this day</p>
                            <Button
                              className="mt-3 bg-transparent"
                              onClick={() => {
                                setShowAddActivity(day.day);
                              }}
                              size="sm"
                              variant="outline"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add First Activity
                            </Button>
                          </div>
                        : day.activities.map((activity) => {
                            const categoryInfo = getCategoryInfo(
                              activity.category,
                            );
                            const IconComponent = categoryInfo.icon;
                            return (
                              <div
                                className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4"
                                key={activity.id}
                              >
                                <div className="flex flex-1 items-center gap-3">
                                  <GripVertical className="h-4 w-4 cursor-move text-slate-400" />
                                  <div
                                    className={`rounded-lg bg-slate-50 p-2 ${categoryInfo.color}`}
                                  >
                                    <IconComponent className="h-4 w-4" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="mb-1 flex items-center gap-2">
                                      <h4 className="font-medium text-slate-800">
                                        {activity.name}
                                      </h4>
                                      {activity.isFixed ?
                                        <Badge
                                          className="text-xs"
                                          variant="outline"
                                        >
                                          Fixed Time
                                        </Badge>
                                      : null}
                                      {activity.linkToBudget ?
                                        <Badge
                                          className="bg-amber-50 text-xs text-amber-700"
                                          variant="outline"
                                        >
                                          Budget
                                        </Badge>
                                      : null}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600">
                                      <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {formatTimeDisplay(activity)}
                                      </div>
                                      {activity.duration ?
                                        <span>• {activity.duration}</span>
                                      : null}
                                      {activity.cost > 0 && (
                                        <span className="flex items-center gap-1">
                                          • <DollarSign className="h-3 w-3" />
                                          {activity.cost}
                                        </span>
                                      )}
                                    </div>
                                    {activity.notes ?
                                      <p className="mt-1 text-sm text-slate-500">
                                        {activity.notes}
                                      </p>
                                    : null}
                                  </div>
                                </div>
                                <Button
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => {
                                    removeActivity(day.day, activity.id);
                                  }}
                                  size="sm"
                                  variant="ghost"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            );
                          })
                        }
                      </div>

                      {/* Daily Summary */}
                      {day.activities.length > 0 && (
                        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">
                              Daily Summary
                            </span>
                            <div className="flex items-center gap-4">
                              <span className="text-slate-600">
                                {day.activities.length} activities
                              </span>
                              {dailySpending > 0 && (
                                <span className="font-medium text-amber-700">
                                  <DollarSign className="mr-1 inline h-3 w-3" />
                                  ${dailySpending} budgeted
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
          <Button className="bg-transparent sm:w-auto" variant="outline">
            Save Itinerary
          </Button>
          <Link href={`/trips/${params.id}/overview`}>
            <Button className="bg-amber-600 text-white hover:bg-amber-700 sm:w-auto">
              Back to Overview
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ItineraryPlanning;
