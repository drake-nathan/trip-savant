export const mockTrips = [
  {
    budget: {
      daily: 250,
      expenses: {
        daily: [
          { amount: 80, description: "Meals" },
          { amount: 20, description: "Transportation" },
          { amount: 100, description: "Activities" },
          { amount: 50, description: "Souvenirs" },
        ],
        preTrip: [
          { amount: 1200, description: "Flight tickets" },
          { amount: 600, description: "Hotel reservation" },
        ],
      },
      preTrip: 1800,
      spent: 2100,
      total: 3500,
    },
    dailyPlans: [
      {
        plans: [
          {
            budget: 0,
            description: "Continental breakfast included with stay",
            time: "08:00 AM",
            title: "Breakfast at hotel",
          },
          {
            budget: 25,
            description: "Guided tour of the Eiffel Tower",
            time: "10:00 AM",
            title: "Visit Eiffel Tower",
          },
          {
            budget: 35,
            description: "Traditional French cuisine",
            time: "01:00 PM",
            title: "Lunch at Café de Paris",
          },
          {
            budget: 15,
            description: "Self-guided tour",
            time: "03:00 PM",
            title: "Louvre Museum",
          },
          {
            budget: 60,
            description: "Fine dining experience",
            time: "07:00 PM",
            title: "Dinner at Le Petit Chef",
          },
        ],
      },
      {
        plans: [
          {
            budget: 15,
            description: "Try authentic French pastries",
            time: "09:00 AM",
            title: "Breakfast at local bakery",
          },
          {
            budget: 0,
            description: "Explore the historic cathedral",
            time: "11:00 AM",
            title: "Notre-Dame Cathedral",
          },
          {
            budget: 25,
            description: "1-hour scenic cruise",
            time: "02:00 PM",
            title: "Seine River Cruise",
          },
          {
            budget: 45,
            description: "Casual dining",
            time: "06:00 PM",
            title: "Dinner at Bistro Parisien",
          },
        ],
      },
    ],
    destination: "Paris, France",
    endDate: "2023-06-22",
    flight: "AF123, JFK to CDG",
    id: "trip-1",
    lodging: "Hotel de Paris",
    startDate: "2023-06-15",
    status: "Booked",
    transportation: "Public Transit",
  },
  {
    budget: {
      daily: 300,
      expenses: {
        daily: [],
        preTrip: [{ amount: 1000, description: "Flight tickets (deposit)" }],
      },
      preTrip: 2500,
      spent: 1000,
      total: 5000,
    },
    dailyPlans: [],
    destination: "Tokyo, Japan",
    endDate: "2023-09-20",
    flight: "",
    id: "trip-2",
    lodging: "",
    startDate: "2023-09-10",
    status: "Planning",
    transportation: "Public Transit",
  },
  {
    budget: {
      daily: 200,
      expenses: {
        daily: [],
        preTrip: [],
      },
      preTrip: 2000,
      spent: 0,
      total: 4000,
    },
    dailyPlans: [],
    destination: "Bali, Indonesia",
    endDate: "2024-01-15",
    flight: "",
    id: "trip-3",
    lodging: "",
    startDate: "2024-01-05",
    status: "Idea",
    transportation: "",
  },
];
