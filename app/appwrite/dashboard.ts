import { parseTripData } from "~/lib/utils";
import { database, appwriteConfig } from "./client";

interface Document {
  [key: string]: any;
}

type FilterByDate = (
  items: Document[],
  key: string,
  start: string,
  end?: string
) => number;

export const getUsersAndTripsStats = async (): Promise<DashboardStats> => {
  const d = new Date(); // Current date
  const startCurrent = new Date(d.getFullYear(), d.getMonth(), 1).toISOString(); // Start of current month
  const startPrev = new Date(
    d.getFullYear(),
    d.getMonth() - 1,
    1
  ).toISOString(); // Start of previous month
  const endPrev = new Date(d.getFullYear(), d.getMonth(), 0).toISOString(); // End of previous month

  // Fetch users and trips from the database
  const [users, trips] = await Promise.all([
    database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
    ),
    database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.tripCollectionId
    ),
  ]);

  // Define the DashboardStats interface
  const filterByDate: FilterByDate = (items, key, start, end) =>
    items.filter((item) => item[key] >= start && (!end || item[key] <= end))
      .length; // Filter items by date range
  // Define the DashboardStats type
  const filterUsersByRole = (role: string) => {
    return users.documents.filter((u: Document) => u.status === role); // Filter users by role
  };
  // Return the aggregated stats
  return {
    totalUsers: users.total,
    usersJoined: {
      currentMonth: filterByDate(
        users.documents,
        "joinedAt",
        startCurrent,
        undefined
      ),
      lastMonth: filterByDate(users.documents, "joinedAt", startPrev, endPrev),
    },
    userRole: {
      total: filterUsersByRole("user").length,
      currentMonth: filterByDate(
        filterUsersByRole("user"),
        "joinedAt",
        startCurrent,
        undefined
      ),
      lastMonth: filterByDate(
        filterUsersByRole("user"),
        "joinedAt",
        startPrev,
        endPrev
      ),
    },
    totalTrips: trips.total,
    tripsCreated: {
      currentMonth: filterByDate(
        trips.documents,
        "createdAt",
        startCurrent,
        undefined
      ),
      lastMonth: filterByDate(
        filterUsersByRole("user"),
        "joinedAt",
        startPrev,
        endPrev
      ),
    },
  };
};

export const getUserGrowthPerDay = async () => {
  // Fetch all users from the database
  const users = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId
  );

  // Reduce the users to count how many joined each day and format the date
  const userGrowth = users.documents.reduce(
    (acc: { [key: string]: number }, user: Document) => {
      const date = new Date(user.joinedAt); // Convert joinedAt to Date object
      const day = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }); // Format the date
      acc[day] = (acc[day] || 0) + 1; // Increment the count for that day
      return acc;
    },
    {}
  );
  // Convert the userGrowth object to an array of objects with count and day
  // This will return an array of objects with count and day properties
  // where count is the number of users who joined on that day
  // and day is the formatted date string
  return Object.entries(userGrowth).map(([day, count]) => ({
    count: Number(count),
    day,
  }));
};

export const getTripsCreatedPerDay = async () => {
  // Fetch all trips from the database
  const trips = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.tripCollectionId
  );

  // Reduce the trips to count how many were created each day and format the date
  // This will return an array of objects with count and day properties
  // where count is the number of trips created on that day
  // and day is the formatted date string
  const tripsGrowth = trips.documents.reduce(
    (acc: { [key: string]: number }, trip: Document) => {
      const date = new Date(trip.createdAt);
      const day = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    },
    {}
  );
  // Convert the tripsGrowth object to an array of objects with count and day
  // This will return an array of objects with count and day properties
  // where count is the number of trips created on that day
  // and day is the formatted date string
  return Object.entries(tripsGrowth).map(([day, count]) => ({
    count: Number(count),
    day,
  }));
};

export const getTripsByTravelStyle = async () => {
  // Fetch all trips from the database
  const trips = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.tripCollectionId
  );

  // Reduce the trips to count how many have each travel style
  const travelStyleCounts = trips.documents.reduce(
    (acc: { [key: string]: number }, trip: Document) => {
      const tripDetail = parseTripData(trip.tripDetails);
      // Check if tripDetail and travelStyle exist
      // If they do, increment the count for that travel style
      // If travelStyle is not defined, it will not increment the count
      // This will return an object with travel styles as keys and counts as values
      if (tripDetail && tripDetail.travelStyle) {
        const travelStyle = tripDetail.travelStyle;
        acc[travelStyle] = (acc[travelStyle] || 0) + 1;
      }
      return acc;
    },
    {}
  );
  // Convert the travelStyleCounts object to an array of objects with count and travelStyle
  // This will return an array of objects with count and travelStyle properties
  // where count is the number of trips with that travel style
  return Object.entries(travelStyleCounts).map(([travelStyle, count]) => ({
    count: Number(count),
    travelStyle,
  }));
};
