import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { set } from "react-hook-form";
import { json } from "stream/consumers";

interface Favoris {
  id: number;
  Nom: string;
  description: string;
}

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

const UserFavoris: React.FC = () => {
  const [favoris, setFavoris] = useState<Favoris[]>([]);
  const Navigate = useNavigate();
  const [DevisList, setDevis] = useState<Devis[]>([]);
  const [DialogOpen, setDialogOpen] = useState(false);
  const [DevisSelected, setDevisSelected] = useState<Devis | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };

  useEffect(() => {
    getOneFavorisByUser();
  }, []);

  function getOneFavorisByUser() {
    axios
      .get("http://localhost:3000/get/favoris", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setFavoris(response.data);
        // console.log("Favoris:", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des favoris:", error);
      });
  }

  function removeFavori(id: number) {
    axios
      .delete(`http://localhost:3000/delete/favoris/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setFavoris(favoris.filter((favori) => favori.id !== id));
        console.log("Favori supprimé avec succès");
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du favori:", error);
      });
  }

  function RefusedDevis(id: number) {
    axios
      .put(
        `http://localhost:3000/update/devis/statut/${id}`,
        { statut: "refusé" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setDevis(DevisList.filter((devis) => devis.id !== id));
        console.log("Devis refusé avec succès");
      })
      .catch((error) => {
        console.error("Erreur lors du refus du devis:", error);
      });
  }

  function ValidedDevis(id: number) {
    axios
      .put(
        `http://localhost:3000/update/devis/statut/${id}`,
        { statut: "accepté" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setDevis(DevisList.filter((devis) => devis.id !== id));
        console.log("Devis validé avec succès");
      })
      .catch((error) => {
        console.error("Erreur lors du refus du devis:", error);
      });
  }

  //get devis by id
  useEffect(() => {
    const fetchDevis = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token d'authentification manquant");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/get/devis`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setDevis(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du devis:", error);
      }
    };
    fetchDevis();
  }, []);

  return (
    <div className="flex">
      {/* <div className="w-1/4 bg-[#197277] p-6 text-white"> */}
      <div className="">
        <button onClick={handleLogout} className=" shadow-sm mt-4 bg-[#104a4e] text-white px-4 py-2 rounded hover:bg-[#145a5f] transition-colors duration-300">
          Se déconnecter
        </button>
      </div>
      <div className="mb-4 ml-4">
        <p className="font-semibold"></p>
        <div className="flex flex-col items-center justify-center">
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">Favoris</h2>
            {favoris.map((favori) => (
              <div key={favori.id} className="mb-4 text-black border-l-4 border-yellow-600 bg-blue-50 rounded-md p-4 shadow-md">
                <div>
                  <p>Nom: {favori.Nom}</p>
                  <p>Description: {favori.description}</p>
                </div>
                <div>
                  <button className="rounded bg-red-800 text-white px-4 py-2" onClick={() => removeFavori(favori.id)}>
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">Devis</h2>

            {DevisList.map((devis) => (
              <div key={devis.id} className="mb-4 text-black border-l-4 border-blue-700 bg-blue-50 rounded-md p-4 shadow-md">
                <div>
                  <p>Numéro de devis: {devis.numero_devis}</p>
                  <p>Client: {devis.client_nom}</p>
                  <p>Date de création: {devis.date_creation}</p>
                  <p>Statut: {devis.statut}</p>
                </div>
                <div>
                  <button
                    className="rounded bg-blue-800 text-white px-4 py-2"
                    onClick={() => {
                      setDevisSelected(devis);
                      setDialogOpen(true);
                    }}
                  >
                    Voir le devis
                  </button>
                  {devis.statut === "envoyé" && (
                    <button className="rounded bg-red-800 text-white px-4 py-2" onClick={() => RefusedDevis(devis.id)}>
                      Refuser
                    </button>
                  )}
                  {devis.statut === "envoyé" && (
                    <button className="rounded bg-green-800 text-white px-4 py-2" onClick={() => ValidedDevis(devis.id)}>
                      Valider
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog open={DialogOpen} onOpenChange={() => setDialogOpen(!DialogOpen)}>
        <DialogContent className="min-w-[600px]">
          <DialogHeader>
            <DialogTitle>Devis</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            {DevisSelected && (
              <div className="lg:sticky lg:top-4">
                <div className="bg-white shadow-lg min-h-[842px] p-8" style={{ width: "595px", fontFamily: "Arial, sans-serif" }}>
                  {/* En-tête avec logo/entreprise */}
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">STREAMIO</h1>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>69 RUE DE PARIS, 91400, ORSAY</div>
                        <div>06 00 00 00 00</div>
                        <div>SERVICE-CLIENT@STREAMIO.COM</div>
                        <div>STREAMIO.COM</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-4">
                        <div>DATE DU DEVIS :</div>
                        <div className="font-semibold">{DevisSelected.date_devis}</div>
                        <div className="mt-2">VALIDITÉ DU DEVIS :</div>
                        <div className="font-semibold">{DevisSelected.validite_devis}</div>
                      </div>
                    </div>
                  </div>

                  {/* Informations client */}
                  <div className="mb-8">
                    <div className="text-sm text-gray-600 mb-2">À L'ATTENTION DE</div>
                    <div className="font-semibold text-lg">{DevisSelected.client_nom || "CLIENT"}</div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>{DevisSelected.client_telephone}</div>
                      <div>{DevisSelected.client_adresse}</div>
                      <div>{DevisSelected.client_ville}</div>
                    </div>
                  </div>

                  {/* Numéro de devis */}
                  <div className="text-right mb-8">
                    <div className="text-2xl font-bold">N°{DevisSelected.numero_devis}</div>
                  </div>

                  {/* Tableau des articles */}
                  <table className="w-full mb-8 border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left">Description</th>
                        <th className="border border-gray-300 p-3 text-center">Quantité</th>
                        <th className="border border-gray-300 p-3 text-right">Prix</th>
                        <th className="border border-gray-300 p-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DevisSelected.tache_list.map((item, i) => (
                        <tr key={i}>
                          <td className="border border-gray-300 p-3">{item.description}</td>
                          <td className="border border-gray-300 p-3 text-center">{item.quantite}</td>
                          <td className="border border-gray-300 p-3 text-right">{item.prix_unitaire.toFixed(2)} €</td>
                          <td className="border border-gray-300 p-3 text-right">{(item.quantite * item.prix_unitaire).toFixed(2)} €</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Totaux */}
                  <div className="flex justify-end mb-8">
                    <div className="w-64 space-y-2">
                      <div className="flex justify-between">
                        <span>Sous total :</span>
                        <span className="font-semibold">{Number(DevisSelected.sous_total).toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TVA ({DevisSelected.taux_tva}%) :</span>
                        <span className="font-semibold">{Number(DevisSelected.montant_tva).toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>TOTAL :</span>
                        <span>{Number(DevisSelected.montant_total).toFixed(2)} €</span>
                      </div>
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="mb-8">
                    <h3 className="font-bold mb-3">Termes et conditions</h3>
                    <div className="text-sm text-gray-700 whitespace-pre-line">{DevisSelected.conditions}</div>
                  </div>

                  {/* Signature */}
                  <div className="mt-12">
                    <div className="text-sm text-gray-600">Signature du client</div>
                    <div className="mt-8 border-b border-gray-300 w-48"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserFavoris;
