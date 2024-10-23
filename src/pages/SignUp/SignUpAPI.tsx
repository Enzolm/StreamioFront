import axios from "axios";

async function CallSignUpAPI(data: any) {
  console.log(data);
  try {
    const response = await axios.post("http://localhost:3000/signup", data);
    console.log("Utilisateur créé avec succès:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(
        "Erreur lors de la création de l'utilisateur:",
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
console.log("CallSignUpAPI", CallSignUpAPI);

export default CallSignUpAPI;
