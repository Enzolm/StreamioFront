import React from "react";
import { Button, Input } from "@components/index";
import { useForm } from "react-hook-form";
// import { use } from "framer-motion/client";
import axios from "axios";

const User: React.FC = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onDelete = async (email: string) => {
    try {
      console.log("email", email);
      console.log("delete");
      const response = await axios.delete("http://localhost:3000/delete/user", {
        data: { email },
      });

      // Afficher la réponse du serveur
      console.log("Utilisateur supprimé avec succès:", response.data);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem("token"); // Récupérer le token JWT depuis localStorage (si besoin)

      // Effectuer la requête PUT pour mettre à jour l'utilisateur
      const response = await axios.put("http://localhost:3000/update/user", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Envoyer le token dans les headers si nécessaire
        },
      });

      // Afficher la réponse du serveur
      console.log("Utilisateur modifié avec succès:", response.data);
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur:", error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label=" prenom" {...register("prenom")} type="text" />
          <Input label=" nom" {...register("nom")} type="text" />
          <Input label=" mail" {...register("email")} type="email" />
          <Input label=" cp" {...register("codepostal")} type="text" />
          <Input label=" ville" {...register("ville")} type="text" />

          <Input label=" mdp" {...register("motdepasse")} type="password" />
          <Button label="Se connecter" />
        </form>
        <Button onClick={() => onDelete("lemaireenzo91@gmail.com")} label="Suprimer son compte" />
      </div>
    </>
  );
};

export default User;
