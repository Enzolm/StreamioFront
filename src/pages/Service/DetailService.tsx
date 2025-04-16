import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Liste des services disponibles
const services: Service[] = [
  {
    id: "streaming",
    title: "Streaming HD",
    description:
      "Profitez de contenu haute définition avec notre service de streaming optimisé pour tous vos appareils.",
    icon: "🎬",
  },
  {
    id: "security",
    title: "Sécurité avancée",
    description:
      "Notre plateforme assure la protection de vos données et de votre vie privée avec un chiffrement de pointe.",
    icon: "🔒",
  },
  {
    id: "cloud",
    title: "Stockage Cloud",
    description:
      "Stockez et accédez à vos médias n'importe où avec notre solution cloud intégrée.",
    icon: "💾",
  },
  {
    id: "sync",
    title: "Synchronisation multi-appareils",
    description:
      "Synchronisez votre expérience sur tous vos appareils pour une continuité parfaite.",
    icon: "🔄",
  },
];

// Composant pour la carte de service
const ServiceCard: React.FC<{
  service: Service;
  onSelect: (service: Service) => void;
}> = ({ service, onSelect }) => {
  return (
    <motion.div
      className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm cursor-pointer"
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect(service)}
    >
      <div className="text-white text-3xl mb-4">{service.icon}</div>
      <h3 className="text-white text-xl font-semibold mb-2">{service.title}</h3>
      <p className="text-white text-opacity-80">{service.description}</p>
      <button
        className="mt-4 px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-[#197277] transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(service);
        }}
      >
        En savoir plus
      </button>
    </motion.div>
  );
};

// Composant Dialog personnalisé
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent scrolling when dialog is open
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto"; // Enable scrolling when dialog is closed
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              ref={dialogRef}
              className="relative bg-[#197277] text-white rounded-2xl shadow-xl max-w-md w-full mx-4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                className="absolute right-4 top-4 text-white text-opacity-80 hover:text-opacity-100"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div className="p-6">{children}</div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Composant du formulaire de contact
const ContactForm: React.FC<{
  selectedService: Service | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ selectedService, isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setIsSubmitted(false);
      }, 300); // Wait for dialog close animation
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi du formulaire
    setTimeout(() => {
      console.log("Formulaire envoyé:", {
        service: selectedService?.title,
        name,
        email,
        message,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Réinitialiser le formulaire après 2 secondes et fermer le dialogue
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Contactez-nous</h2>
        <p className="text-white text-opacity-80 mt-2">
          {selectedService
            ? `Demande d'informations concernant ${selectedService.title}`
            : "Envoyez-nous un message et nous vous répondrons dans les plus brefs délais."}
        </p>
      </div>

      {isSubmitted ? (
        <div className="py-6 flex flex-col items-center justify-center">
          <div className="bg-green-500 rounded-full p-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 className="text-xl font-medium">Message envoyé !</h3>
          <p className="text-white text-opacity-80 text-center mt-2">
            Nous vous répondrons dans les plus brefs délais.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              Nom
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border-0 text-white placeholder-white placeholder-opacity-50 focus:ring-2 focus:ring-white focus:outline-none"
              placeholder="Votre nom"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border-0 text-white placeholder-white placeholder-opacity-50 focus:ring-2 focus:ring-white focus:outline-none"
              placeholder="votre@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="service" className="block mb-1 text-sm font-medium">
              Service
            </label>
            <input
              id="service"
              value={selectedService?.title || ""}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border-0 text-white focus:ring-2 focus:ring-white focus:outline-none"
              readOnly
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border-0 text-white placeholder-white placeholder-opacity-50 focus:ring-2 focus:ring-white focus:outline-none min-h-32 resize-y"
              placeholder="Comment pouvons-nous vous aider ?"
              required
            />
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 px-6 bg-white text-[#197277] font-medium rounded-lg hover:bg-opacity-90 transition-all disabled:bg-opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer"}
          </motion.button>
        </form>
      )}
    </Dialog>
  );
};

// Page principale
const ServicePage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#197277] text-white flex flex-col items-center justify-center p-4">
      <div className="rounded-[37px] bg-[#197277] shadow-lg flex flex-col transition-all duration-700 items-center p-6 w-full max-w-4xl">
        {/* Logo */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center text-white text-3xl font-bold">
            <svg
              className="w-10 h-10 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8L8 13L13 8L18 13L23 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 16L8 21L13 16L18 21L23 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Streamio
          </div>
        </motion.div>

        {/* Services heading */}
        <motion.h1
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Nos Services
        </motion.h1>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 w-full">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={handleServiceSelect}
            />
          ))}
        </div>

        {/* Contact form dialog */}
        <ContactForm
          selectedService={selectedService}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />

        {/* Footer with contact button */}
        <div className="mt-8 text-center">
          <p className="text-white text-opacity-80 mb-4">
            Vous avez des questions ? N'hésitez pas à nous contacter.
          </p>
          <motion.button
            className="px-6 py-3 bg-white text-[#197277] font-medium rounded-lg hover:bg-opacity-90 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedService(null);
              setIsDialogOpen(true);
            }}
          >
            Nous contacter
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
