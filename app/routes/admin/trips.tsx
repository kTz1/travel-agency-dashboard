import { useState } from "react";
import { Header, TripCard } from "components";
import type { Route } from "./+types/trips";
import { getAllTrips, getTripById } from "~/appwrite/trips";
import { useSearchParams, type LoaderFunctionArgs } from "react-router";
import { parseTripData } from "~/lib/utils";
import { PagerComponent } from "@syncfusion/ej2-react-grids";

// Fetch trips
export const loader = async ({ request }: LoaderFunctionArgs) => {
  // pagination
  const limit = 8; // number of trips per page
  const url = new URL(request.url); // get the current url
  const page = parseInt(url.searchParams.get("page") || "1", 10); // get the page number
  const offset = (page - 1) * limit; // calculate the offset

  const { allTrips, total } = await getAllTrips(limit, offset); // fetch trips and total number of trips

  return {
    trips: allTrips.map(({ $id, tripDetails, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetails),
      imageUrls: imageUrls ?? [],
    })),
    total,
  };
};

const Trips = ({ loaderData }: Route.ComponentProps) => {
  const trips = loaderData.trips as Trip[] | [];
  // Pagination
  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page") || 1);

  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.location.search = `?page=${page}`;
  };
  return (
    <main className="all-users wrapper">
      <Header
        title="Trips"
        description="View and edit AI-generated travel plans"
        ctaText="Create Trip"
        ctaUrl="/trips/create"
      />

      <section>
        <h1 className="p-24-semibold text-dark-100 mb-4">
          Manage Created Trips
        </h1>
        <div className="trip-grid mb-4">
          {trips.map((trip) => (
            <TripCard
              id={trip.id}
              key={trip.id}
              name={trip.name}
              location={trip.itinerary?.[0].location ?? ""}
              imageUrl={trip.imageUrls[0]}
              tags={[trip.interests, trip.travelStyle]}
              price={trip.estimatedPrice}
            />
          ))}
        </div>

        <PagerComponent
          totalRecordsCount={loaderData.total}
          pageSize={8}
          currentPage={currentPage}
          click={(args) => handlePageChange(args.currentPage)}
          cssClass="!mb-4"
        />
      </section>
    </main>
  );
};

export default Trips;
