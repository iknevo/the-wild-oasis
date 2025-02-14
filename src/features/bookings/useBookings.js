import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  // FILTER
  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // SORT
  const sortValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };

  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getAllBookings(filter, sortBy),
  });
  return { bookings, error, isLoading };
}
