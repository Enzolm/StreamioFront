import React, { useState, useEffect } from "react";

const Service = () => {
  const [services, setServices] = useState<any[]>([]);
  const [orderBy, setOrderBy] = useState<string>("");

  useEffect(() => {
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
  }, [orderBy]); // Rechercher à chaque fois que orderBy change

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="orderBy" className="block text-lg font-medium">
          Trier par
        </label>
        <select
          id="orderBy"
          className="select select-bordered w-full max-w-xs"
          onChange={handleOrderChange}
        >
          <option value="">Sélectionner un tri</option>
          <option value="nom ASC">Nom (Croissant)</option>
          <option value="nom DESC">Nom (Décroissant)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {services.length === 0 ? (
          <p>Aucun service trouvé.</p>
        ) : (
          services.map((service: any) => (
            <div
              key={service.id}
              className="card w-full max-w-sm bg-white shadow-md p-4"
            >
              <h3 className="text-xl font-semibold">{service.nom}</h3>
              <p>{service.description}</p>
              <p className="text-sm text-gray-500">
                Catégorie: {service.Photo}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Service;
