import axios from "axios";

async function CallLoginApi(data: any) {
  console.log(data);
  try {
    const response = await axios.post("http://localhost:3000/login", data);
    console.log("Utilisateur connecté avec succès:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(
        "Erreur lors de la connexion de l'utilisateur:",
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

export default CallLoginApi;
