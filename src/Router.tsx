import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Connect from "./pages/Connect/Connect";
import SignUp from "./pages/SignUp/SignUp";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Connect />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

const Root: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Root;
