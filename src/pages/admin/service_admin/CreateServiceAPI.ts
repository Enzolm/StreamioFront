import verifyToken from "../../../providers/VerifToken";
import axios from "axios";

async function CallCreateService(data: any) {
  console.log("API data:", data);
  try {
    const response = await axios.post(
      "http://localhost:3000/create/service",
      data
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(
        "Erreur lors de la création du service:",
        error.response.data
      );
    } else if (error.request) {
      console.error("Aucune réponse reçue du serveur:", error.request);
    } else {
      console.error(
        "Erreur lors de la configuration de la requête:",
        error.message
      );
    }
    throw error;
  }
}

export default CallCreateService;
