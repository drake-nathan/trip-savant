import { Calendar, DollarSign, MapPin, Star } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-border border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-foreground text-2xl font-bold">Trip Savant</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-foreground text-4xl font-bold md:text-6xl">
            Plan Your Perfect Trip
          </h2>
          <p className="text-muted-foreground mt-6 text-lg md:text-xl">
            Create detailed itineraries, manage budgets, and discover your next
            adventure with Trip Savant
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button className="text-base" size="lg">
              Get Started
            </Button>
            <Button className="text-base" size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 text-center">
            <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-foreground mb-2 text-lg font-semibold">
              Trip Planning
            </h3>
            <p className="text-muted-foreground">
              Add and organize your trips with detailed information and
              preferences
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-foreground mb-2 text-lg font-semibold">
              Itineraries
            </h3>
            <p className="text-muted-foreground">
              Create day-by-day itineraries with activities, locations, and
              timing
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
              <DollarSign className="h-6 w-6" />
            </div>
            <h3 className="text-foreground mb-2 text-lg font-semibold">
              Budget Tracking
            </h3>
            <p className="text-muted-foreground">
              Keep track of expenses and stay within your budget for every trip
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
              <Star className="h-6 w-6" />
            </div>
            <h3 className="text-foreground mb-2 text-lg font-semibold">
              Destination Ratings
            </h3>
            <p className="text-muted-foreground">
              Rate and review destinations to help plan your next adventure
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="mx-auto max-w-2xl p-8">
            <h3 className="text-foreground text-2xl font-bold">
              Ready to start planning?
            </h3>
            <p className="text-muted-foreground mt-4">
              Join thousands of travelers who trust Trip Savant to organize
              their adventures
            </p>
            <Button className="mt-6" size="lg">
              Start Your First Trip
            </Button>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-border bg-muted/20 mt-20 border-t">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Trip Savant. The best trip planner ever.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
