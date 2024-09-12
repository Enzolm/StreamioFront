import { createBrowserRouter } from "react-router-dom";
import Connect from "./Connect";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/connect",
        element: <Connect />,
      },
    ],
  },
]);
