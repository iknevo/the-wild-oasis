import { createBrowserRouter, Navigate } from "react-router-dom";

import Account from "./pages/Account.jsx";
import Booking from "./pages/Booking.jsx";
import Bookings from "./pages/Bookings.jsx";
import Cabins from "./pages/Cabins.jsx";
import Checkin from "./pages/Checkin.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Settings from "./pages/Settings.jsx";
import Users from "./pages/Users.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";

const Router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        element: <Navigate to="dashboard" replace />,
        index: true,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "bookings/:bookingId",
        element: <Booking />,
      },
      {
        path: "checkin/:bookingId",
        element: <Checkin />,
      },
      {
        path: "cabins",
        element: <Cabins />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default Router;
