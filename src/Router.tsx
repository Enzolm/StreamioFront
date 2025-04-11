import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Connect from "./pages/Connect/Connect";
// import SignUp from "./pages/Connect/Signup.tsx";
import App from "./App";
import Service from "./pages/Service/Service.tsx";
import AdminDashboard from "@pages/admin/service_admin/AdminDashboard.tsx";
import AdminUserDashboard from "@pages/admin/user_admin/UserAdminDashboard.tsx";
import Home from "@pages/Home/Home.tsx";
import AuthGuard from "./providers/AuthGuard";
import UserProfile from "./pages/UserPage/AccountManagement.tsx";
import ConnectMain from "./pages/Connect/connect-main.tsx";

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
    path: "/admin/create/service",
    element: (
      <AuthGuard>
        <AdminDashboard />
      </AuthGuard>
    ),
  },
  {
    path: "/admin/users/list",
    element: (
      <AuthGuard>
        <AdminUserDashboard />
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
