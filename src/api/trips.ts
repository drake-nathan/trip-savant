// Mock API functions for trip data
export interface TripData {
  days: number;
  destination: string;
  endDate: Date;
  id: string;
  name: string;
  startDate: Date;
  status: string;
}

// Mock function to get trip data
export const getTripData = async (tripId: string): Promise<TripData> => {
  // In a real app, this would fetch from an API
  const mockData: TripData = {
    days: 10,
    destination: "Tokyo, Japan",
    endDate: new Date("2024-03-25"),
    id: tripId,
    name: "Tokyo Adventure",
    startDate: new Date("2024-03-15"),
    status: "Booked",
  };

  return Promise.resolve(mockData);
};

// Mock function to save trip data
export const saveTripData = async (
  tripData: Partial<TripData>,
): Promise<TripData> => {
  // In a real app, this would save to an API
  console.info("Saving trip data:", tripData);

  const savedData: TripData = {
    days: tripData.days || 1,
    destination: tripData.destination || "",
    endDate: tripData.endDate ?? new Date(),
    id: tripData.id || "1",
    name: tripData.name || "New Trip",
    startDate: tripData.startDate ?? new Date(),
    status: tripData.status || "Idea",
  };

  return Promise.resolve(savedData);
};
