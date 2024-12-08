import axios from "axios";

export default async function verifyToken(): Promise<boolean> {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return false;
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/verify-token",
      {}, // Le corps est vide ici, car tu envoies le token dans les headers
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Envoie le token avec le format standard
        },
      }
    );

    console.log("Token is valid:", response.data);
    return true;
  } catch (error: any) {
    if (error.response) {
      console.error(
        "Error verifying token:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("Error verifying token:", error.message);
    }
    return false;
  }
}
