import axios from "axios";
import { useNavigate } from "react-router-dom";

async function verifyToken(): Promise<boolean> {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return false;
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/verify-token", // Route sur ton backend pour vérifier le token
      {}, // Le corps est vide ici, car tu envoies le token dans les headers
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Envoie le token avec le format standard
        },
      }
    );

    console.log(response.data);
    return true;
  } catch (error: any) {
    if (error.response) {
      console.error("Error verifying token:", error.response.status, error.response.data);
    } else {
      console.error("Error verifying token:", error.message);
    }
    return false;
  }
}

async function isAdmin(): Promise<boolean> {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Payload:", payload);
    // Vérifie si isAdmin est strictement égal à 1
    if (payload.isAdmin === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error parsing token:", error);
    return false;
  }
}

async function isLogged(): Promise<boolean> {
  const token = localStorage.getItem("token");
  return !!token;
}

export function useLogout() {
  const navigate = useNavigate();

  return () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
}

export const accountService = {
  isLogged,
  verifyToken,
  useLogout,
  isAdmin,
};
