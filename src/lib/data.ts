export interface ItineraryItem {
  category:
    | "Accommodation"
    | "Activity"
    | "Entertainment"
    | "Flight"
    | "Food"
    | "Other"
    | "Shopping"
    | "Transport";
  cost: number;
  duration: number;
  id: string;
  name: string;
  notes: string;
  time: string;
  timing: "Afternoon" | "Evening" | "Morning";
}

export interface BudgetItem {
  amount: number;
  category: string;
  id: string;
  name: string;
  paid: boolean;
}

export interface Trip {
  budget: {
    daily: BudgetItem[];
    prePaid: number;
    preTrip: BudgetItem[];
    scheduled: number;
    total: number;
  };
  destination: string;
  duration: number;
  endDate: string;
  id: string;
  itinerary: {
    date: string;
    day: number;
    items: ItineraryItem[];
  }[];
  startDate: string;
  status: "Booked" | "Completed" | "Idea" | "Planning";
}

export const sampleTrips: Trip[] = [
  {
    budget: {
      daily: [
        {
          amount: 1000,
          category: "Food",
          id: "j-d-1",
          name: "Daily Food Budget",
          paid: false,
        },
        {
          amount: 200,
          category: "Transport",
          id: "j-d-2",
          name: "Local Transport",
          paid: false,
        },
        {
          amount: 500,
          category: "Shopping",
          id: "j-d-3",
          name: "Shopping & Souvenirs",
          paid: false,
        },
        {
          amount: 450,
          category: "Activity",
          id: "j-d-4",
          name: "Misc Activities",
          paid: false,
        },
      ],
      prePaid: 2800,
      preTrip: [
        {
          amount: 1500,
          category: "Flights",
          id: "j-p-1",
          name: "Round-trip Flights",
          paid: true,
        },
        {
          amount: 300,
          category: "Transport",
          id: "j-p-2",
          name: "Japan Rail Pass",
          paid: true,
        },
        {
          amount: 600,
          category: "Accommodation",
          id: "j-p-3",
          name: "Tokyo Hotel (4 nights)",
          paid: true,
        },
        {
          amount: 400,
          category: "Accommodation",
          id: "j-p-4",
          name: "Kyoto Ryokan (3 nights)",
          paid: true,
        },
        {
          amount: 50,
          category: "Entertainment",
          id: "j-p-5",
          name: "Ghibli Museum Tickets",
          paid: false,
        },
      ],
      scheduled: 1200,
      total: 5000,
    },
    destination: "10-Day Japan Trip",
    duration: 10,
    endDate: "2025-04-20",
    id: "japan-2025",
    itinerary: [
      {
        date: "April 10, 2025",
        day: 1,
        items: [
          {
            category: "Flight",
            cost: 0,
            duration: 120,
            id: "j-i-1",
            name: "Arrive at Narita (NRT)",
            notes: "Flight JL005",
            time: "14:30",
            timing: "Afternoon",
          },
          {
            category: "Transport",
            cost: 30,
            duration: 90,
            id: "j-i-2",
            name: "Train to Shinjuku",
            notes: "Narita Express",
            time: "16:00",
            timing: "Afternoon",
          },
          {
            category: "Accommodation",
            cost: 0,
            duration: 60,
            id: "j-i-3",
            name: "Check into Park Hyatt",
            notes: "Confirmation #12345",
            time: "18:00",
            timing: "Evening",
          },
          {
            category: "Food",
            cost: 15,
            duration: 60,
            id: "j-i-4",
            name: "Dinner at Ichiran Ramen",
            notes: "",
            time: "20:00",
            timing: "Evening",
          },
        ],
      },
      {
        date: "April 11, 2025",
        day: 2,
        items: [
          {
            category: "Activity",
            cost: 0,
            duration: 120,
            id: "j-i-5",
            name: "Shibuya Crossing & Hachiko Statue",
            notes: "",
            time: "",
            timing: "Morning",
          },
          {
            category: "Food",
            cost: 25,
            duration: 60,
            id: "j-i-6",
            name: "Lunch in Shibuya",
            notes: "Find a cool spot",
            time: "",
            timing: "Afternoon",
          },
          {
            category: "Activity",
            cost: 5,
            duration: 180,
            id: "j-i-7",
            name: "Meiji Jingu Shrine",
            notes: "",
            time: "",
            timing: "Afternoon",
          },
          {
            category: "Shopping",
            cost: 50,
            duration: 120,
            id: "j-i-8",
            name: "Harajuku Takeshita Street",
            notes: "Look for crepes",
            time: "",
            timing: "Evening",
          },
        ],
      },
    ],
    startDate: "2025-04-10",
    status: "Booked",
  },
  {
    budget: {
      daily: [],
      prePaid: 350,
      preTrip: [
        {
          amount: 350,
          category: "Flights",
          id: "v-p-1",
          name: "Flights to LAS",
          paid: true,
        },
        {
          amount: 600,
          category: "Accommodation",
          id: "v-p-2",
          name: "Bellagio Hotel (2 nights)",
          paid: false,
        },
        {
          amount: 250,
          category: "Entertainment",
          id: "v-p-3",
          name: "Cirque du Soleil Tickets",
          paid: false,
        },
      ],
      scheduled: 850,
      total: 1200,
    },
    destination: "Weekend Vegas Getaway",
    duration: 3,
    endDate: "2024-10-20",
    id: "vegas-2024",
    itinerary: [],
    startDate: "2024-10-18",
    status: "Planning",
  },
  {
    budget: {
      daily: [],
      prePaid: 0,
      preTrip: [],
      scheduled: 0,
      total: 8000,
    },
    destination: "European Vacation",
    duration: 21,
    endDate: "2026-06-21",
    id: "europe-2026",
    itinerary: [],
    startDate: "2026-06-01",
    status: "Idea",
  },
];
