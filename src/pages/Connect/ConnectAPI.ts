// import verifyToken from "../../providers/VerifToken";
// import axios from "axios";

// async function CallLoginApi(data: any) {
//   console.log(data);
//   try {
//     const response = await axios.post("http://localhost:3000/login", data);
//     console.log("Utilisateur connecté avec succès:", response.data.token);
//     localStorage.setItem("token", response.data.token);
//     verifyToken();
//     return response.data;
//   } catch (error: any) {
//     if (error.response) {
//       console.error(
//         "Erreur lors de la connexion de l'utilisateur:",
//         error.response.data
//       );
//     } else if (error.request) {
//       console.error("Aucune réponse reçue du serveur:", error.request);
//     } else {
//       console.error(
//         "Erreur lors de la configuration de la requête:",
//         error.message
//       );
//     }
//     throw error;
//   }
// }

// export default CallLoginApi;

import axios from "axios";

interface LoginResponse {
  token: string;
}

async function CallLoginApi(data: Record<string, any>): Promise<LoginResponse | null> {
  console.log("Données envoyées :", data);

  try {
    const response = await axios.post<LoginResponse>("http://localhost:3000/login", data);

    if (response.data && response.data.token) {
      console.log("Utilisateur connecté avec succès :", response.data.token);
      localStorage.setItem("token", response.data.token);

      return response.data;
    } else {
      console.error("Réponse inattendue : le token est manquant.");
      return null;
    }
  } catch (error: any) {
    if (error.response) {
      console.error("Erreur lors de la connexion de l'utilisateur :", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Aucune réponse reçue du serveur :", error.request);
    } else {
      console.error("Erreur lors de la configuration de la requête :", error.message);
    }
    throw error;
  }
}

export default CallLoginApi;
