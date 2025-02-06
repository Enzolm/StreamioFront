import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Service {
  Id_service: number;
  Nom: string;
  categorie: string;
  description: string;
  Prix: number | null;
  Photo: string;
  Video: string | null;
}

const AdminDashboard: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<number | null>(null);
  const [editedValues, setEditedValues] = useState<Partial<Service>>({});

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

  const handleEdit = (id: number) => {
    setEditingService(id);
    const serviceToEdit = services.find((service) => service.Id_service === id);
    if (serviceToEdit) {
      setEditedValues(serviceToEdit);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Service) => {
    setEditedValues({ ...editedValues, [field]: e.target.value });
  };

  const handleSave = async (id: number) => {
    const token = localStorage.getItem("token"); // Récupère le token depuis le localStorage (ou un autre moyen)

    if (!token) {
      setError("Jeton d'authentification manquant");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/update/service/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclure le token JWT dans l'en-tête
        },
        body: JSON.stringify({
          service_titre: editedValues.Nom,
          service_description: editedValues.description,
          categorie: editedValues.categorie,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Récupère le message d'erreur du backend
        throw new Error(errorMessage);
      }

      setServices(services.map((service) => (service.Id_service === id ? { ...service, ...editedValues } : service)));
      setEditingService(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du service:", error);
      setError(error instanceof Error ? error.message : "Une erreur inconnue s'est produite");
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token"); // Assurer que le token est bien récupéré pour la suppression

    if (!token) {
      setError("Jeton d'authentification manquant");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/delete/service/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Inclure le token JWT pour les requêtes sécurisées
        },
      });
      if (!response.ok) {
        const errorMessage = await response.text(); // Récupère le message d'erreur du backend
        throw new Error(errorMessage);
      }
      setServices(services.filter((service) => service.Id_service !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du service:", error);
      setError(error instanceof Error ? error.message : "Une erreur inconnue s'est produite");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#164C4F]">
      <div className="w-64 p-5 bg-[#197277] shadow-inner rounded-r-xl flex flex-col items-start space-y-4">
        <Link to="/">
          <motion.img src="/src/assets/logo.png" alt="Logo" className="w-40 mb-6 drop-shadow-lg" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} />
        </Link>
        <button className="w-full p-3 bg-[#1B5E5F] rounded-lg shadow-md hover:bg-[#14605E] transition text-white">Tableau de bord</button>
        <button className="w-full p-3 bg-[#1B5E5F] rounded-lg shadow-md hover:bg-[#14605E] transition text-white">Services</button>
        <button className="w-full p-3 bg-[#1B5E5F] rounded-lg shadow-md hover:bg-[#14605E] transition text-white">Utilisateurs</button>
      </div>

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6 text-[#197277]">Gestion des Services</h1>
        <div className="bg-white p-6 rounded-lg shadow-md border border-[#197277]">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
                    <td className="p-3 border">{editingService === service.Id_service ? <input type="text" value={editedValues.Nom || ""} onChange={(e) => handleChange(e, "Nom")} className="border p-2 w-full bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#197277]" /> : service.Nom}</td>
                    <td className="p-3 border">{editingService === service.Id_service ? <input type="text" value={editedValues.categorie || ""} onChange={(e) => handleChange(e, "categorie")} className="border p-2 w-full bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#197277]" /> : service.categorie}</td>
                    <td className="p-3 border">{editingService === service.Id_service ? <input type="text" value={editedValues.description || ""} onChange={(e) => handleChange(e, "description")} className="border p-2 w-full bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#197277]" /> : service.description}</td>
                    <td className="p-3 border flex space-x-3 justify-center">
                      {editingService === service.Id_service ? (
                        <button onClick={() => handleSave(service.Id_service)} className="text-green-500 hover:text-green-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300">
                          <FaSave />
                        </button>
                      ) : (
                        <button onClick={() => handleEdit(service.Id_service)} className="text-[#197277] hover:text-[#164C4F] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#197277]">
                          <FaEdit />
                        </button>
                      )}
                      <button onClick={() => handleDelete(service.Id_service)} className="text-red-500 hover:text-red-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
