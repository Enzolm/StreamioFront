import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { accountService } from "@/providers/VerifToken";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await accountService.isLogged().then((res) => {
          console.log("isLogged result:", res);
          setIsAuthenticated(res);
        });
      } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, []);

  // ⚡️ Afficher un écran de chargement tant que la vérification est en cours
  if (isAuthenticated === null) {
    return <p>Chargement...</p>;
  }

  // 🔐 Si le token est valide, on affiche l'enfant (contenu protégé)
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await accountService.isAdmin();
        setIsAuthenticated(result);
      } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, []);

  // ⚡️ Afficher un écran de chargement tant que la vérification est en cours
  if (isAuthenticated === null) {
    return <p>Chargement...</p>;
  }

  // 🔐 Si le token est valide, on affiche l'enfant (contenu protégé)
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export { AuthGuard, AdminGuard };
