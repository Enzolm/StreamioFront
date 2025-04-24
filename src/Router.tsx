import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Service from "./pages/Service/Service.tsx";
import AdminDashboard from "@pages/admin/service_admin/AdminDashboard.tsx";
import AdminUserDashboard from "@pages/admin/user_admin/UserAdminDashboard.tsx";
import Home from "@pages/Home/Home.tsx";
import { AuthGuard, AdminGuard } from "./providers/AuthGuard";
import UserProfile from "./pages/UserPage/AccountManagement.tsx";
import ConnectMain from "./pages/Connect/connect-main.tsx";
import ServicePage from "@pages/Service/DetailService.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <ConnectMain />,
  },
  {
    path: "/signup",
    element: <ConnectMain />,
  },
  {
    path: "/service",
    element: <Service />,
  },
  {
    path: "/account",
    element: <UserProfile />,
  },
  {
    path: "/service/detail/:id",
    element: <ServicePage />,
  },

  {
    path: "/admin/create/service",
    element: (
      <AdminGuard>
        <AdminDashboard />
      </AdminGuard>
    ),
  },
  {
    path: "/admin/users/list",
    element: (
      <AdminGuard>
        <AdminUserDashboard />
      </AdminGuard>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminGuard>
        <AdminDashboard />
      </AdminGuard>
    ),
  },
]);

const Root: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Root;
