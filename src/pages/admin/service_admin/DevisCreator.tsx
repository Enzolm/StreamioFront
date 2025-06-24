import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserSelectPopup from "./SelectUsers.tsx";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { set } from "react-hook-form";
import { stat } from "fs";

type DevisLigne = {
  description: string;
  quantite: number;
  prix_unitaire: number;
  total_ligne?: number;
};

type ClientInfo = {
  nom: string;
  telephone: string;
  adresse: string;
  ville: string;
};

export default function DevisCreatorPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [client, setClient] = React.useState<ClientInfo>({
    nom: "",
    telephone: "",
    adresse: "",
    ville: "",
  });
  const [items, setItems] = React.useState<DevisLigne[]>([{ description: "", quantite: 1, prix_unitaire: 0 }]);
  const [numeroDevis, setNumeroDevis] = React.useState("12345");
  const [dateDevis, setDateDevis] = React.useState(new Date().toLocaleDateString("fr-FR"));
  const [validiteDevis, setValiditeDevis] = React.useState("1 mois");
  const [tauxTVA, setTauxTVA] = React.useState(20);
  const [conditions, setConditions] = React.useState("Tous les fichiers sources et droits d'auteur seront transférés une fois le paiement final reçu.\n\nLes fichiers livrés seront au format numérique haute résolution.");

  const pdfRef = useRef<HTMLDivElement>(null);

  const addItem = () => {
    setItems([...items, { description: "", quantite: 1, prix_unitaire: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleChangeItem = (index: number, key: "description" | "quantite" | "prix_unitaire", value: string) => {
    setItems((prevItems) => {
      const updated = [...prevItems];
      const item = { ...updated[index] };

      if (key === "quantite" || key === "prix_unitaire") {
        item[key] = parseFloat(value) || 0;
      } else {
        item[key] = value;
      }

      item.total_ligne = item.quantite * item.prix_unitaire;
      updated[index] = item;

      return updated;
    });
  };

  useEffect(() => {
    console.log("DevisCreatorPage", items, client, numeroDevis, dateDevis, validiteDevis, tauxTVA, conditions, selectedUserId);
  });

  const [DialogOpen, setDialogOpen] = useState(false);

  const generatePDF = async () => {
    console.log("Génération du PDF...");
    if (!pdfRef.current) return;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Devis ${numeroDevis}</title>
            <style>
              * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
              }
              
              body { 
                font-family: Arial, sans-serif; 
                margin: 0; 
                padding: 20px;
                background: white;
                color: black;
                line-height: 1.4;
              }
              
              .devis-container {
                width: 595px;
                min-height: 842px;
                padding: 32px;
                background: white;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              
              .header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 32px;
              }
              
              .company-info h1 {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 8px;
              }
              
              .company-details {
                font-size: 12px;
                color: #666;
                line-height: 1.5;
              }
              
              .devis-info {
                text-align: right;
                font-size: 12px;
                color: #666;
              }
              
              .devis-info div {
                margin-bottom: 4px;
              }
              
              .devis-info .font-semibold {
                font-weight: 600;
                color: black;
              }
              
              .client-section {
                margin-bottom: 32px;
              }
              
              .client-section .label {
                font-size: 12px;
                color: #666;
                margin-bottom: 8px;
              }
              
              .client-name {
                font-weight: 600;
                font-size: 18px;
                margin-bottom: 4px;
              }
              
              .client-details {
                font-size: 12px;
                color: #666;
                line-height: 1.5;
              }
              
              .numero-devis {
                text-align: right;
                margin-bottom: 32px;
              }
              
              .numero-devis div {
                font-size: 20px;
                font-weight: bold;
              }
              
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 32px;
              }
              
              th, td {
                border: 1px solid #ccc;
                padding: 12px;
              }
              
              th {
                background-color: #f5f5f5;
                font-weight: 600;
              }
              
              .text-left { text-align: left; }
              .text-center { text-align: center; }
              .text-right { text-align: right; }
              
              .totaux {
                display: flex;
                justify-content: flex-end;
                margin-bottom: 32px;
              }
              
              .totaux-content {
                width: 256px;
              }
              
              .total-line {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
              }
              
              .total-final {
                display: flex;
                justify-content: space-between;
                font-size: 18px;
                font-weight: bold;
                border-top: 1px solid #ccc;
                padding-top: 8px;
              }
              
              .conditions {
                margin-bottom: 32px;
              }
              
              .conditions h3 {
                font-weight: bold;
                margin-bottom: 12px;
              }
              
              .conditions-text {
                font-size: 12px;
                color: #333;
                white-space: pre-line;
                line-height: 1.5;
              }
              
              .signature {
                margin-top: 48px;
              }
              
              .signature-label {
                font-size: 12px;
                color: #666;
                margin-bottom: 32px;
              }
              
              .signature-line {
                border-bottom: 1px solid #ccc;
                width: 192px;
                height: 1px;
              }
              
              @media print {
                body { margin: 0; padding: 0; }
                .devis-container { box-shadow: none; }
              }
            </style>
          </head>
          <body>
            <div class="devis-container">
              <div class="header">
                <div class="company-info">
                  <h1>STREAMIO</h1>
                  <div class="company-details">
                    <div>69 RUE DE PARIS, 91400, ORSAY</div>
                    <div>06 00 00 00 00</div>
                    <div>SERVICE-CLIENT@STREAMIO.COM</div>
                    <div>STREAMIO.COM</div>
                  </div>
                </div>
                <div class="devis-info">
                  <div>DATE DU DEVIS :</div>
                  <div class="font-semibold">${dateDevis}</div>
                  <div style="margin-top: 8px;">VALIDITÉ DU DEVIS :</div>
                  <div class="font-semibold">${validiteDevis}</div>
                </div>
              </div>

              <div class="client-section">
                <div class="label">À L'ATTENTION DE</div>
                <div class="client-name">${client.nom || "CLIENT"}</div>
                <div class="client-details">
                  <div>${client.telephone}</div>
                  <div>${client.adresse}</div>
                  <div>${client.ville}</div>
                </div>
              </div>

              <div class="numero-devis">
                <div>N°${numeroDevis}</div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th class="text-left">Description</th>
                    <th class="text-center">Quantité</th>
                    <th class="text-right">Prix</th>
                    <th class="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${items
                    .map(
                      (item) => `
                    <tr>
                      <td class="text-left">${item.description}</td>
                      <td class="text-center">${item.quantite}</td>
                      <td class="text-right">${item.prix_unitaire.toFixed(2)} €</td>
                      <td class="text-right">${(item.quantite * item.prix_unitaire).toFixed(2)} €</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>

              <div class="totaux">
                <div class="totaux-content">
                  <div class="total-line">
                    <span>Sous total :</span>
                    <span>${sousTotal.toFixed(2)} €</span>
                  </div>
                  <div class="total-line">
                    <span>TVA (${tauxTVA}%) :</span>
                    <span>${montantTVA.toFixed(2)} €</span>
                  </div>
                  <div class="total-final">
                    <span>TOTAL :</span>
                    <span>${total.toFixed(2)} €</span>
                  </div>
                </div>
              </div>

              <div class="conditions">
                <h3>Termes et conditions</h3>
                <div class="conditions-text">${conditions}</div>
              </div>

              <div class="signature">
                <div class="signature-label">Signature du client</div>
                <div class="signature-line"></div>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus(); // Important pour que la fenêtre soit bien active
      printWindow.print();
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Veuillez vous connecter pour créer un devis.");
      return;
    }
    if (!selectedUserId) {
      alert("Veuillez sélectionner un utilisateur.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/create/devis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Remplace par ton vrai token JWT
        },
        body: JSON.stringify({
          user_id: selectedUserId,
          numero_devis: numeroDevis,
          client: {
            nom: client.nom,
            telephone: client.telephone,
            adresse: client.adresse,
            ville: client.ville,
          },
          dateDevis: dateDevis,
          validiteDevis: validiteDevis,
          sous_total: sousTotal,
          tauxTVA: tauxTVA,
          montantTVA: sousTotal * (tauxTVA / 100),
          montant_total: sousTotal + sousTotal * (tauxTVA / 100),
          statut: "envoyé",
          conditions: conditions,
          commentaires: "Aucun",
          pdf_url: "", // Tu peux ajouter une URL de PDF si nécessaire
          tache_list: items,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur lors de la création du devis : ${errorText}`);
      }
      const data = await response.json();
      console.log("Devis créé avec succès :", data);
      alert("Devis créé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création du devis :", error);
    }
  };

  const sousTotal = items.reduce((acc, item) => acc + item.quantite * item.prix_unitaire, 0);
  const montantTVA = sousTotal * (tauxTVA / 100);
  const total = sousTotal + montantTVA;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button onClick={() => navigate("/admin")} className="w-full p-3 bg-[#1B5E5F] rounded-lg shadow-md hover:bg-[#14605E] transition text-white">
        Retour
      </button>
      <Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
        <UserSelectPopup
          onSelect={(id, closed) => {
            setSelectedUserId(id);
            setDialogOpen(!closed); // donc false → ferme le dialog
            generatePDF();
            console.log("pdf passé");
            handleSave();
          }}
        />
      </Dialog>
      ;
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulaire de saisie */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Informations du devis</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">N° Devis</label>
                  <Input value={numeroDevis} onChange={(e) => setNumeroDevis(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <Input value={dateDevis} onChange={(e) => setDateDevis(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Validité</label>
                  <Input value={validiteDevis} onChange={(e) => setValiditeDevis(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">TVA (%)</label>
                  <Input type="number" value={tauxTVA} onChange={(e) => setTauxTVA(parseFloat(e.target.value) || 0)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Informations du client</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom/Entreprise</label>
                  <Input value={client.nom} onChange={(e) => setClient({ ...client, nom: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Téléphone</label>
                  <Input value={client.telephone} onChange={(e) => setClient({ ...client, telephone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Adresse</label>
                  <Input value={client.adresse} onChange={(e) => setClient({ ...client, adresse: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ville</label>
                  <Input value={client.ville} onChange={(e) => setClient({ ...client, ville: e.target.value })} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Articles/Services</h2>
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-6">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Input value={item.description} onChange={(e) => handleChangeItem(index, "description", e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Qté</label>
                    <Input type="number" value={item.quantite} onChange={(e) => handleChangeItem(index, "quantite", e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Prix</label>
                    <Input type="number" value={item.prix_unitaire} onChange={(e) => handleChangeItem(index, "prix_unitaire", e.target.value)} />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">Total</label>
                    <div className="text-sm font-medium py-2">{(item.quantite * item.prix_unitaire).toFixed(2)} €</div>
                  </div>
                  <div className="col-span-1">
                    <Button variant="outline" size="sm" onClick={() => removeItem(index)} disabled={items.length === 1}>
                      ×
                    </Button>
                  </div>
                </div>
              ))}
              <Button onClick={addItem} variant="outline" className="w-full">
                + Ajouter un article
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Conditions</h2>
              <Textarea value={conditions} onChange={(e) => setConditions(e.target.value)} rows={4} placeholder="Termes et conditions..." />
              <Button onClick={() => setDialogOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700">
                Générer le PDF
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Aperçu du devis */}
        <div className="lg:sticky lg:top-4">
          <div ref={pdfRef} className="bg-white shadow-lg min-h-[842px] p-8" style={{ width: "595px", fontFamily: "Arial, sans-serif" }}>
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
                  <div className="font-semibold">{dateDevis}</div>
                  <div className="mt-2">VALIDITÉ DU DEVIS :</div>
                  <div className="font-semibold">{validiteDevis}</div>
                </div>
              </div>
            </div>

            {/* Informations client */}
            <div className="mb-8">
              <div className="text-sm text-gray-600 mb-2">À L'ATTENTION DE</div>
              <div className="font-semibold text-lg">{client.nom || "CLIENT"}</div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>{client.telephone}</div>
                <div>{client.adresse}</div>
                <div>{client.ville}</div>
              </div>
            </div>

            {/* Numéro de devis */}
            <div className="text-right mb-8">
              <div className="text-2xl font-bold">N°{numeroDevis}</div>
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
                {items.map((item, i) => (
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
                  <span className="font-semibold">{sousTotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span>TVA ({tauxTVA}%) :</span>
                  <span className="font-semibold">{montantTVA.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>TOTAL :</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
            </div>

            {/* Conditions */}
            <div className="mb-8">
              <h3 className="font-bold mb-3">Termes et conditions</h3>
              <div className="text-sm text-gray-700 whitespace-pre-line">{conditions}</div>
            </div>

            {/* Signature */}
            <div className="mt-12">
              <div className="text-sm text-gray-600">Signature du client</div>
              <div className="mt-8 border-b border-gray-300 w-48"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
