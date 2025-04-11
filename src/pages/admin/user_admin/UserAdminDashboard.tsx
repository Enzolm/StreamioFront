import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Utilisateurs {
  id: string;
  nom: string;
  prenom: string;
  email: string;
}

const AdminUserDashboard: React.FC = () => {
  const [services, setServices] = useState<Utilisateurs[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<number | null>(null);
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  const [newService, setNewService] = useState<Partial<Utilisateurs>>({
    id: "",
    nom: "",
    prenom: "",
    email: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3000/get/users");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Utilisateurs[] = await response.json();
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

  const handleNewServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Utilisateurs) => {
    console.log("field", e.target.value);
    setNewService({ ...newService, [field]: e.target.value });
  };

  const handleCreateService = async () => {
    console.log("Création du user:", newService);

    // Vérification que tous les champs requis sont remplis
    if (!newService.nom || !newService.prenom || !newService.email === null) {
      setError("Tous les champs doivent être remplis");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Jeton d'authentification manquant");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/create/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nom: newService.nom,
          prenom: newService.prenom,
          email: newService.email,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const createdService = await response.json();
      setServices([...services, createdService]);
      setShowNewServiceForm(false);
      setNewService({ nom: "", prenom: "", email: "" });
    } catch (error) {
      console.error("Erreur lors de la création du service:", error);
      setError(error instanceof Error ? error.message : "Une erreur inconnue s'est produite");
    }
  };

  const handleDeleteUsers = async (id: string) => {
    if (!id) {
      alert("Vous devez être connecté pour supprimer un service.");
      return;
    }

    try {
      console.log("id", id);
      const response = await fetch(`http://localhost:3000/delete/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedServices = services.filter((service) => service.id !== id);
        setServices(updatedServices);
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
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
        <Link to="/admin">
          <button className="w-full p-3 bg-[#1B5E5F] rounded-lg shadow-md hover:bg-[#14605E] transition text-white">Tableau de bord</button>
        </Link>
        <button className="w-full p-3 bg-[#1B5E5F] rounded-lg shadow-md hover:bg-[#14605E] transition text-white">Services</button>
        <button className="w-full p-3 bg-[#1B5E5F] rounded-lg shadow-md hover:bg-[#14605E] transition text-white">Utilisateurs</button>
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
              <input type="text" placeholder="Nom" value={newService.nom || ""} onChange={(e) => handleNewServiceChange(e, "nom")} className="w-full p-2 border rounded-lg mb-2" />
              <input type="text" placeholder="Prenom" value={newService.prenom || ""} onChange={(e) => handleNewServiceChange(e, "prenom")} className="w-full p-2 border rounded-lg mb-2" />
              <textarea placeholder="email" value={newService.email || ""} onChange={(e) => handleNewServiceChange(e, "email")} className="w-full p-2 border rounded-lg mb-2" />
              <button onClick={handleCreateService} className="w-full bg-[#197277] text-white p-2 rounded-lg hover:bg-[#164C4F] transition">
                Créer
              </button>
            </div>
          )}

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#197277] text-white">
                <th className="p-3 border">Nom</th>
                <th className="p-3 border">Prenom</th>
                <th className="p-3 border">Email</th>
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
                  <tr key={service.email} className="border">
                    <td className="p-3 border">{service.nom}</td>
                    <td className="p-3 border">{service.prenom}</td>
                    <td className="p-3 border">{service.email}</td>
                    <td className="p-3 border flex space-x-3 justify-center">
                      <button className="text-[#197277] hover:text-[#164C4F] p-2 rounded-lg">
                        <FaEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700 p-2 rounded-lg">
                        <FaTrash onClick={() => handleDeleteUsers(service.id)} />
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

export default AdminUserDashboard;
