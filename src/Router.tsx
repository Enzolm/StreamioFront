import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Connect from "./pages/Connect/Connect";
import SignUp from "./pages/SignUp/SignUp";
import App from "./App";
import Service from "./pages/Service/Service.tsx";
import AdminService from "@pages/admin/service_admin/AdminService.tsx";
import Home from "@pages/Home/Home.tsx";
import AuthGuard from "./providers/AuthGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <Home />
      </AuthGuard>
    ),
  },
  {
    path: "/login",
    element: <Connect />,
  },
  {
    path: "/signup",
    element: (
      <AuthGuard>
        <SignUp />
      </AuthGuard>
    ),
  },
  {
    path: "/service",
    element: <Service />,
  },

  {
    path: "/admin/create/service",
    element: <AdminService />,
  },
]);

const Root: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Root;
