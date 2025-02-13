import { useQuery } from "@tanstack/react-query";
import { getAllBokkings } from "../../services/apiBookings";

export function useBookings() {
  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBokkings,
  });
  return { bookings, error, isLoading };
}
