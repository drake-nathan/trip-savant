import { CheckCircle, DollarSign, Map, Wallet } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-gray-50 py-20 md:py-32 lg:py-40 dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center md:px-6">
            <h1 className="mb-4 text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
              Trip Savant
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 md:text-xl dark:text-gray-300">
              Effortless travel planning. Master your budget, itinerary, and
              expenses in one beautiful, minimalist interface.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 md:py-24 lg:py-32" id="features">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              Everything You Need to Plan the Perfect Trip
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Wallet className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Budget Tracking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Set your budget, track pre-trip and daily expenses, and see
                    exactly where your money is going.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Map className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Day-by-Day Planning</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Build a flexible daily itinerary with fixed reservations and
                    spontaneous activities.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Expense Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Easily add expenses on the go and link them to your budget
                    categories for a real-time overview.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          className="w-full bg-gray-50 py-20 md:py-24 lg:py-32 dark:bg-gray-900"
          id="pricing"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              Choose Your Plan
            </h2>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Standard</CardTitle>
                  <p className="text-4xl font-bold">
                    $5
                    <span className="text-lg font-normal text-gray-500">
                      /month
                    </span>
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Unlimited Trips</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Collaborative Planning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Budget & Expense Tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Daily Itinerary Builder</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild className="w-full">
                    <Link href="/dashboard">Sign Up</Link>
                  </Button>
                </div>
              </Card>
              <Card className="flex flex-col border-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Premium</CardTitle>
                    <div className="rounded-full bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
                      COMING SOON
                    </div>
                  </div>
                  <p className="text-4xl font-bold">
                    $10
                    <span className="text-lg font-normal text-gray-500">
                      /month
                    </span>
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>All Standard Features</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>AI-Powered Itinerary Suggestions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Automated Expense Categorization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Advanced Analytics & Reports</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button className="w-full" disabled>
                    Coming Soon
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
