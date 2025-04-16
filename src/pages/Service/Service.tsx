import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Définir le type pour le service
interface ServiceType {
  id: number;
  Nom: string;
  categorie: string;
  description: string;
  Photo?: string;
}

const Service = () => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [orderBy, setOrderBy] = useState("Nom ASC");
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  ); // Stocker le token JWT

  // Récupérer les services depuis l'API
  useEffect(() => {
    console.log("orderBy", orderBy);
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/get/services?orderBy=${orderBy}`
        );
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des services:", error);
      }
    };

    fetchServices();
  }, [orderBy]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Supprimer un service
  const handleDelete = async (id: number) => {
    if (!token) {
      alert("Vous devez être connecté pour supprimer un service.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/delete/service/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setServices(services.filter((service) => service.id !== id));
        alert("Service supprimé avec succès");
      } else {
        const message = await response.text();
        alert(message);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du service:", error);
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="min-h-screen bg-[#197277] text-white mt-5">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-16 px-4"
      >
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-bold mb-8"
          >
            Nos Services
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl mb-12 text-white/90"
          >
            Découvrez notre gamme complète de services professionnel
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto"
          >
            <select
              className="w-full p-4 rounded-lg bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all appearance-none mb-4"
              onChange={(e) => setOrderBy(e.target.value)}
              value={orderBy}
            >
              <option value="Nom ASC" className="bg-[#197277] text-white">
                Trier par
              </option>
              <option value="Nom ASC" className="bg-[#197277] text-white">
                Nom (Croissant)
              </option>
              <option value="Nom DESC" className="bg-[#197277] text-white">
                Nom (Décroissant)
              </option>
            </select>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-16 px-6"
      >
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length === 0 ? (
              <div className="col-span-full text-center text-xl">
                Aucun service trouvé.
              </div>
            ) : (
              services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20"
                >
                  <div className="p-6">
                    <div className="aspect-video bg-white/5 rounded-lg mb-6 overflow-hidden">
                      {service.Photo && (
                        <img
                          src={service.Photo}
                          alt={service.Nom}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.Nom}</h3>
                    <div className="badge badge-accent">
                      {service.categorie}
                    </div>
                    <p className="text-white/80 mb-6 min-h-[60px]">
                      {service.description}
                    </p>
                    <button className="w-full bg-white text-[#197277] font-semibold py-3 px-4 rounded-lg hover:bg-white/90 transition-colors duration-200">
                      En savoir plus
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Service;
