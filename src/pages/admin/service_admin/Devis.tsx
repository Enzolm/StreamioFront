import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/index.ts";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Tache = {
  description: string;
  quantite: number;
  prix_unitaire: number;
  total_ligne: number;
};

type Devis = {
  id: number;
  user_id: number;
  numero_devis: string;

  client_nom: string;
  client_telephone: string;
  client_adresse: string;
  client_ville: string;

  date_creation: string; // ISO date format
  date_devis: string; // Format "DD/MM/YYYY"
  validite_devis: string;

  sous_total: string; // Reçu en tant que string (ex: "21312.00")
  taux_tva: string;
  montant_tva: string;
  montant_total: string;

  statut: "brouillon" | "envoyé" | "accepté" | "refusé" | "terminé";

  conditions: string;
  commentaire: string;
  pdf_url: string;
  updated_at: string;

  tache_list: Tache[];
};

export default function DevisPage() {
  const navigate = useNavigate();
  const [DevisList, setDevisList] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/get/all/devis")
      .then((res) => res.json())
      .then((data) => {
        // 🔍 Vérifie que tu reçois bien un tableau
        console.log("Devis reçu :", data);
        if (Array.isArray(data)) {
          setDevisList(data);
        } else {
          console.error("La réponse n'est pas un tableau :", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement :", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-[#164C4F]">
      <div className="w-64 p-5 bg-[#197277] shadow-inner rounded-r-xl flex flex-col items-start space-y-4">
        <Link to="/">
          <motion.img src="/src/assets/logo.png" alt="Logo" className="w-40 mb-6 drop-shadow-lg" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} />
        </Link>
        <button onClick={() => navigate("/admin")} className="w-full p-3 bg-[#1B5E5F] rounded-lg shadow-md hover:bg-[#14605E] transition text-white">
          Services
        </button>
        <button onClick={() => navigate("/admin/users/list")} className="w-full p-3 bg-[#1B5E5F] rounded-lg shadow-md hover:bg-[#14605E] transition text-white">
          Utilisateurs
        </button>
        <button onClick={() => navigate("/admin/devis")} className="w-full p-3 bg-[#113c3d] rounded-lg shadow-md transition text-white">
          Devis
        </button>
      </div>
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6 text-[#197277]">Gestion des Devis</h1>
        <div className="bg-white p-6 rounded-lg shadow-md border border-[#197277]">
          <button onClick={() => navigate("/admin/devis/creator")} className="bg-[#197277] text-white hover:bg-[#164C4F] transition rounded-md">
            Créer un nouveau devis
          </button>
          <div>
            {loading ? (
              <p>Chargement...</p>
            ) : (
              Array.isArray(DevisList) &&
              DevisList.map((devis) => (
                <div className="flex justify-between rounded-sm bg-slate-400 m-2 p-4" key={devis.id}>
                  <h2 className="m-1">N/° :{devis.numero_devis}</h2>
                  <p className="m-1">Nom du client : {devis.client_nom}</p>
                  <p>Créé le {devis.date_devis}</p>
                  <p className="p-1 rounded-md align-middle text-center bg-yellow-700">{devis.statut}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
