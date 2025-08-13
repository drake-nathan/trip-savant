import { BarChart3, Calendar, Check, DollarSign } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                className="font-sans text-2xl font-bold text-slate-800 transition-colors hover:text-amber-600"
                href="/"
              >
                Trip Savant
              </Link>
            </div>
            <div className="hidden items-center space-x-8 md:flex">
              <a
                className="font-medium text-slate-600 transition-colors hover:text-amber-600"
                href="#features"
              >
                Features
              </a>
              <a
                className="font-medium text-slate-600 transition-colors hover:text-amber-600"
                href="#pricing"
              >
                Pricing
              </a>
              <Link href="/dashboard">
                <Button
                  className="border-slate-300 bg-transparent text-slate-700 hover:bg-slate-50"
                  variant="outline"
                >
                  Login
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-amber-600 text-white hover:bg-amber-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 font-sans text-5xl leading-tight font-bold text-slate-800 md:text-6xl">
            Your next adventure,
            <br />
            <span className="text-amber-600">perfectly planned</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-slate-600">
            Track every expense, plan every day, and turn your travel dreams
            into reality with intelligent budget management and seamless
            itinerary planning.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button
                className="bg-amber-600 px-8 py-3 text-lg text-white hover:bg-amber-700"
                size="lg"
              >
                Start Planning Free
              </Button>
            </Link>
            <Button
              className="border-slate-300 bg-transparent px-8 py-3 text-lg text-slate-700 hover:bg-slate-50"
              size="lg"
              variant="outline"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-amber-50/30 py-20" id="features">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-sans text-3xl font-bold text-slate-800 md:text-4xl">
              Everything you need for the perfect trip
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              From sunrise hikes to midnight markets — all in one place
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-slate-200 transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <DollarSign className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="mb-4 font-sans text-xl font-semibold text-slate-800">
                  Budget Tracking
                </h3>
                <p className="leading-relaxed text-slate-600">
                  Track every expense. Stay on course. Visual budget breakdowns
                  and daily spend monitoring keep you financially aligned with
                  your travel goals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <Calendar className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="mb-4 font-sans text-xl font-semibold text-slate-800">
                  Day-by-Day Planning
                </h3>
                <p className="leading-relaxed text-slate-600">
                  Flexible timeline planning with drag-and-drop scheduling. Mix
                  fixed reservations with spontaneous adventures seamlessly.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <BarChart3 className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="mb-4 font-sans text-xl font-semibold text-slate-800">
                  Expense Management
                </h3>
                <p className="leading-relaxed text-slate-600">
                  Connect your budget to your itinerary. See how each activity
                  impacts your spending with real-time financial insights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20" id="pricing">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-sans text-3xl font-bold text-slate-800 md:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-slate-600">
              Choose the plan that fits your travel style
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
            <Card className="border-slate-200 transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="mb-8 text-center">
                  <h3 className="mb-2 font-sans text-2xl font-bold text-slate-800">
                    Standard
                  </h3>
                  <div className="mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold text-slate-800">
                      $5
                    </span>
                    <span className="ml-2 text-slate-600">/month</span>
                  </div>
                  <p className="text-slate-600">
                    Perfect for regular travelers
                  </p>
                </div>

                <ul className="mb-8 space-y-4">
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-amber-600" />
                    <span className="text-slate-700">Unlimited trips</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-amber-600" />
                    <span className="text-slate-700">
                      Budget tracking & analytics
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-amber-600" />
                    <span className="text-slate-700">
                      Day-by-day itinerary planning
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-amber-600" />
                    <span className="text-slate-700">
                      Expense categorization
                    </span>
                  </li>
                </ul>

                <Link href="/dashboard">
                  <Button className="w-full bg-amber-600 text-white hover:bg-amber-700">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="relative border-amber-200 bg-amber-50/50 transition-shadow duration-300 hover:shadow-lg">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 transform bg-amber-600 text-white">
                Coming Soon
              </Badge>
              <CardContent className="p-8">
                <div className="mb-8 text-center">
                  <h3 className="mb-2 font-sans text-2xl font-bold text-slate-800">
                    Premium
                  </h3>
                  <div className="mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold text-slate-800">
                      $10
                    </span>
                    <span className="ml-2 text-slate-600">/month</span>
                  </div>
                  <p className="text-slate-600">Enhanced with AI features</p>
                </div>

                <ul className="mb-8 space-y-4">
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-amber-600" />
                    <span className="text-slate-700">
                      Everything in Standard
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-amber-600" />
                    <span className="text-slate-700">
                      AI-powered recommendations
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-amber-600" />
                    <span className="text-slate-700">
                      Smart budget optimization
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-amber-600" />
                    <span className="text-slate-700">Priority support</span>
                  </li>
                </ul>

                <Button
                  className="w-full bg-transparent"
                  disabled
                  variant="outline"
                >
                  Notify Me
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-sans text-3xl font-bold text-white md:text-4xl">
            Ready to plan your perfect trip?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-slate-300">
            Join thousands of travelers who trust Trip Savant to turn their
            adventures into unforgettable experiences.
          </p>
          <Link href="/dashboard">
            <Button
              className="bg-amber-600 px-8 py-3 text-lg text-white hover:bg-amber-700"
              size="lg"
            >
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="mb-4 font-sans text-2xl font-bold text-slate-800">
              Trip Savant
            </h3>
            <p className="mb-6 text-slate-600">
              Your next adventure, perfectly planned.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-slate-500">
              <a className="transition-colors hover:text-amber-600" href="#">
                Privacy Policy
              </a>
              <a className="transition-colors hover:text-amber-600" href="#">
                Terms of Service
              </a>
              <a className="transition-colors hover:text-amber-600" href="#">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
