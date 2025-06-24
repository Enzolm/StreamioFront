import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Service from "./pages/Service/Service.tsx";
import AdminDashboard from "@pages/admin/service_admin/AdminDashboard.tsx";
import AdminUserDashboard from "@pages/admin/user_admin/UserAdminDashboard.tsx";
import Home from "@pages/Home/Home.tsx";
import { AuthGuard, AdminGuard } from "./providers/AuthGuard";
import UserMainPage from "./pages/UserPage/Main.tsx";
import ConnectMain from "./pages/Connect/connect-main.tsx";
import ServicePage from "@pages/Service/DetailService.tsx";
import DevisPage from "@pages/admin/service_admin/Devis.tsx";
import DevisCreatorPage from "@pages/admin/service_admin/DevisCreator.tsx";

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
    element: <UserMainPage />,
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
  {
    path: "/admin/devis/creator",
    element: (
      <AdminGuard>
        <DevisCreatorPage />
      </AdminGuard>
    ),
  },
  {
    path: "/admin/devis",
    element: (
      <AdminGuard>
        <DevisPage />
      </AdminGuard>
    ),
  },
]);

const Root: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Root;
