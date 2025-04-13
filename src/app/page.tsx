import { Calendar, DollarSign, Map, PlaneTakeoff } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4 py-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Travel Savant
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          Plan your trips, manage your budget, and organize your itinerary all
          in one place.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Button asChild size="lg">
            <Link href="/trips/new">Create New Trip</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/trips">View My Trips</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <PlaneTakeoff className="h-6 w-6" />
              Trip Planning
            </CardTitle>
            <CardDescription>Create and manage your trips</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Organize your trips with details like dates, locations, and
              status.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="ghost">
              <Link href="/trips/new">Create Trip</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <DollarSign className="h-6 w-6" />
              Budget Tracking
            </CardTitle>
            <CardDescription>Manage your travel expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Track pre-trip expenses, daily budgets, and monitor your spending.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="ghost">
              <Link href="/trips">Manage Budgets</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="h-6 w-6" />
              Daily Planner
            </CardTitle>
            <CardDescription>Plan each day of your trip</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Schedule activities, meals, and transportation for each day of
              your journey.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="ghost">
              <Link href="/trips">View Planners</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Map className="h-6 w-6" />
              Trip Overview
            </CardTitle>
            <CardDescription>Get a complete view of your trip</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              See all your trip details, budget, and daily plans in one place.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="ghost">
              <Link href="/trips">View Trips</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;
