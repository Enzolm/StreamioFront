import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Connect from "./pages/Connect/Connect";
import SignUp from "./pages/SignUp/SignUp";
import App from "./App";
import Service from "./pages/Service/Service.tsx";
import AdminDashboard from "@pages/admin/service_admin/AdminDashboard.tsx";
import Home from "@pages/Home/Home.tsx";
import AuthGuard from "./providers/AuthGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Connect />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/service",
    element: <Service />,
  },

  {
    path: "/admin/create/service",
    element: (
      <AuthGuard>
        <AdminDashboard />
      </AuthGuard>
    ),
  },
  {
    path: "/admin",
    element: (
      <AuthGuard>
        <AdminDashboard />
      </AuthGuard>
    ),
  },
]);

const Root: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Root;
