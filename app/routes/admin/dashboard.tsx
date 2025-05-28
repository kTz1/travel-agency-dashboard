import { Header, StatsCard, TripCard } from "../../../components";

const Dashboard = () => {
  // Mock data
  const user = {
    name: "John Doe",
  };
  const dashboardStats = {
    totalUsers: 12450,
    usersJointed: { currentMonth: 200, lastMonth: 175 },
    totalTrips: 3210,
    tripsCreated: { currentMonth: 150, lastMonth: 205 },
    userRole: { total: 63, currentMonth: 20, lastMonth: 15 },
  };

  const { totalUsers, usersJointed, totalTrips, tripsCreated, userRole } =
    dashboardStats;

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? "Guest"} 👋`}
        description="Track activity, trends and popular destination is real time"
      />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard
            headerTitle="Total Users"
            total={totalUsers}
            currentMonthCount={usersJointed.currentMonth}
            lastMonthCount={usersJointed.lastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={totalTrips}
            currentMonthCount={tripsCreated.currentMonth}
            lastMonthCount={tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle="Active Users"
            total={userRole.total}
            currentMonthCount={userRole.currentMonth}
            lastMonthCount={userRole.lastMonth}
          />
        </div>
      </section>

      <TripCard />
    </main>
  );
};

export default Dashboard;
