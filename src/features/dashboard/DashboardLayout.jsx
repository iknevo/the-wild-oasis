import styled from "styled-components";
import Spinner from "./../../ui/Spinner.jsx";
import { useCabins } from "./../cabins/useCabins";
import SalesChart from "./SalesChart.jsx";
import Stats from "./Stats.jsx";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isLoadingBookings, numDays } = useRecentBookings();
  const { stays, confirmedStays, isLoadingStays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        numCabins={cabins.length}
      />
      <div>Today&apos;s activity</div>
      <div>chart stay durations</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
