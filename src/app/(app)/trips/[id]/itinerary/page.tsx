"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Bed,
  ChevronDown,
  Clock,
  Coffee,
  GripVertical,
  Landmark,
  Moon,
  MoreHorizontal,
  Plane,
  Plus,
  ShoppingBag,
  Sun,
  Ticket,
  Train,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { type ItineraryItem, sampleTrips } from "@/lib/data";

const categoryIcons: Record<string, React.ElementType> = {
  Accommodation: Bed,
  Activity: Landmark,
  Entertainment: Ticket,
  Flight: Plane,
  Food: Utensils,
  Other: Coffee,
  Shopping: ShoppingBag,
  Transport: Train,
};

const timingIcons: Record<string, React.ElementType> = {
  Afternoon: Sun,
  Evening: Moon,
  Morning: Sun,
};

const SortableActivityCard = ({ item }: { item: ItineraryItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  // FIXME: check later
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const Icon = categoryIcons[item.category] || Coffee;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const TimingIcon = item.time ? Clock : timingIcons[item.timing] || Sun;

  return (
    <div
      className="group flex items-start gap-4"
      ref={setNodeRef}
      style={style}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none py-4"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 rounded-lg border bg-background p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold">{item.name}</p>
            <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <TimingIcon className="h-4 w-4" />
                <span>{item.time || item.timing}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon className="h-4 w-4" />
                <span>{item.category}</span>
              </div>
              {item.cost > 0 && (
                <span className="font-mono text-xs">${item.cost}</span>
              )}
            </div>
            {item.notes ?
              <p className="mt-2 text-sm text-muted-foreground">{item.notes}</p>
            : null}
          </div>
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
              <DropdownMenuItem className="text-red-500">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

const DayCard = ({
  date,
  day,
  items: initialItems,
}: {
  date: string;
  day: number;
  items: ItineraryItem[];
}) => {
  const [items, setItems] = React.useState(initialItems);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const dailyTotal = items.reduce((sum, item) => sum + item.cost, 0);

  return (
    <Collapsible defaultOpen>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CollapsibleTrigger asChild>
            <div className="flex cursor-pointer items-center gap-4">
              <CardTitle>
                Day {day}: {date}
              </CardTitle>
              <ChevronDown className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
            </div>
          </CollapsibleTrigger>
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              Total: ${dailyTotal.toLocaleString()}
            </Badge>
            <Button size="sm" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
            </Button>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              sensors={sensors}
            >
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {items.map((item) => (
                    <SortableActivityCard item={item} key={item.id} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

const ItineraryPage = ({ params }: { params: { id: string } }) => {
  const trip = sampleTrips.find((t) => t.id === params.id);

  if (!trip) {
    return <div>Trip not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Itinerary: {trip.destination}</h1>
          <p className="text-muted-foreground">
            {trip.startDate} - {trip.endDate}
          </p>
        </div>
        <Button asChild>
          <Link href={`/trips/${trip.id}/budget`}>Manage Budget</Link>
        </Button>
      </div>
      <Separator />
      <div className="space-y-4">
        {trip.itinerary.map((dayPlan) => (
          <DayCard
            date={dayPlan.date}
            day={dayPlan.day}
            items={dayPlan.items}
            key={dayPlan.day}
          />
        ))}
      </div>
    </div>
  );
};

export default ItineraryPage;
