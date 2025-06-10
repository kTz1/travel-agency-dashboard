import { appwriteConfig, database } from "./client";

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
  const d = new Date();
  const startCurrent = new Date(d.getFullYear(), d.getMonth(), 1).toISOString(); // first day of current month
  const startPrev = new Date(
    d.getFullYear(),
    d.getMonth() - 1,
    1
  ).toISOString(); // first day of previous month
  const endPrev = new Date(d.getFullYear(), d.getMonth(), 0).toISOString(); // last day of previous month

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

  // This function filters items based on a date range
  // and returns the count of items that match the criteria
  const filterByDate: FilterByDate = (items, key, start, end) =>
    items.filter((item) => item[key] >= start && (!end || item[key] <= end))
      .length;

  // This function filters items based on a date range
  const filterUsersByRole = (role: string) => {
    return users.documents.filter((u: Document) => u.status === role);
  };

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
      lastMonth: filterByDate(trips.documents, "createdAt", startPrev, endPrev),
    },
  };
};
