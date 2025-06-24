import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { accountService, useLogout } from "@/providers/VerifToken";
import { useNavigate } from "react-router-dom";
import EditService from "./EditService";
import { Dialog } from "@radix-ui/react-dialog";

interface Service {
  Id_service: string;
  Nom: string;
  categorie: string;
  description: string;
  Photo: string;
  Video: string | null;
}

const AdminDashboard: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectID, setSelectID] = useState<string>("");
  const [OpenDialog, setOpenDialog] = useState(false);
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  const [newService, setNewService] = useState<Partial<Service>>({
    Nom: "",
    categorie: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3000/get/services");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Service[] = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }
        setServices(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
        console.error("Erreur lors de la récupération des services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleNewServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Service) => {
    setNewService({ ...newService, [field]: e.target.value });
    console.log(`Champ ${field} mis à jour:`, e.target.value);
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Tokken d'authentification manquant");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/delete/service/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      setServices(services.filter((service) => service.Id_service !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du service:", error);
      setError(error instanceof Error ? error.message : "Une erreur inconnue s'est produite");
    } finally {
      setSelectID("");
    }
  };

  const handleCreateService = async () => {
    console.log("Création du service:", newService);
    console.log("Nouveau service:", newService.Nom, newService.categorie, newService.description);
    // Vérification que tous les champs requis sont remplis
    if (!newService.Nom || !newService.categorie || !newService.description) {
      setError("Tous les champs doivent être remplis");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Tokken d'authentification manquant");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/create/service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Nom: newService.Nom,
          categorie: newService.categorie,
          description: newService.description,
          Photo: newService.Photo || "",
          Video: newService.Video || "",
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const createdService = await response.json();
      setServices([...services, createdService]);
      setShowNewServiceForm(false);
    } catch (error) {
      console.error("Erreur lors de la création du service:", error);
      setError(error instanceof Error ? error.message : "Une erreur inconnue s'est produite");
    } finally {
      setNewService({ Nom: "", categorie: "", description: "" });
    }
  };

  return (
    <div className="flex min-h-screen bg-[#164C4F]">
      <div className="w-64 p-5 bg-[#197277] shadow-inner rounded-r-xl flex flex-col items-start space-y-4">
        <Link to="/">
          <motion.img src="/src/assets/logo.png" alt="Logo" className="w-40 mb-6 drop-shadow-lg" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} />
        </Link>
        <button onClick={() => navigate("/admin")} className="w-full p-3 bg-[#113c3d] rounded-lg shadow-md  transition text-white">
          Services
        </button>
        <button onClick={() => navigate("/admin/users/list")} className="w-full p-3 bg-[#1B5E5F] rounded-lg shadow-md hover:bg-[#14605E] transition text-white">
          Utilisateurs
        </button>
        <button onClick={() => navigate("/admin/devis")} className="w-full p-3 bg-[#1B5E5F] rounded-lg shadow-md hover:bg-[#14605E] transition text-white">
          Devis
        </button>
      </div>

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6 text-[#197277]">Gestion des Services</h1>

        <div className="bg-white p-6 rounded-lg shadow-md border border-[#197277]">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#197277]">Liste des services</h2>
            <button onClick={() => setShowNewServiceForm(!showNewServiceForm)} className="flex items-center space-x-2 px-4 py-2 bg-[#1B5E5F] text-white rounded-lg shadow-md hover:bg-[#14605E] transition">
              <FaPlus />
              <span>Nouveau Service</span>
            </button>
          </div>

          {showNewServiceForm && (
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <input type="text" placeholder="Nom du service" value={newService.Nom} onChange={(e) => handleNewServiceChange(e, "Nom")} className="w-full p-2 border rounded-lg mb-2" />
              <input type="text" placeholder="Catégorie" value={newService.categorie} onChange={(e) => handleNewServiceChange(e, "categorie")} className="w-full p-2 border rounded-lg mb-2" />
              <textarea placeholder="Description" value={newService.description} onChange={(e) => handleNewServiceChange(e, "description")} className="w-full p-2 border rounded-lg mb-2" />
              <button onClick={handleCreateService} className="w-full bg-[#197277] text-white p-2 rounded-lg hover:bg-[#164C4F] transition">
                Créer
              </button>
            </div>
          )}

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#197277] text-white">
                <th className="p-3 border">Nom</th>
                <th className="p-3 border">Catégorie</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    Aucun service trouvé.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.Id_service} className="border">
                    <td className="p-3 border">{service.Nom}</td>
                    <td className="p-3 border">{service.categorie}</td>
                    <td className="p-3 border">{service.description}</td>
                    <td className="p-3 border flex space-x-3 justify-center">
                      <button
                        onClick={() => {
                          setSelectID(service.Id_service);
                          setOpenDialog(true);
                        }}
                        className="text-[#197277] hover:text-[#164C4F] p-2 rounded-lg"
                      >
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteService(service.Id_service)} className="text-red-500 hover:text-red-700 p-2 rounded-lg">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <Dialog open={OpenDialog} onOpenChange={setOpenDialog}>
            <EditService
              id={selectID}
              data={{
                Nom: services.find((service) => service.Id_service === selectID)?.Nom || "",
                categorie: services.find((service) => service.Id_service === selectID)?.categorie || "",
                description: services.find((service) => service.Id_service === selectID)?.description || "",
              }}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
