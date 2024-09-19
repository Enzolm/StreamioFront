import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Connect from "./pages/Connect/Connect";
import App from "./App"; // Ajoute ton composant principal ici

// Crée le routeur avec les différentes routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Utilise un composant pour la route "/"
  },
  {
    path: "/connect",
    element: <Connect />, // Composant pour la route "/connect"
  },
]);

// Définir un composant qui utilise RouterProvider
const Root: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Root;
