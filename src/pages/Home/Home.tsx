import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import { PlayCircle, Shield, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-main text-white">
      {/* Hero Section */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-screen bg-main flex items-center justify-center text-center px-4">
        <div className="container mx-auto flex flex-col items-center">
          {/* Logo */}
          <motion.img src="/src/assets/logo.png" alt="Logo" className="w-40 mb-6 drop-shadow-lg" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} />

          {/* Title */}
          <motion.h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-glow" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            Votre vision, Notre savoir-faire.
          </motion.h1>

          {/* Subtitle */}
          <motion.p className="text-lg md:text-xl max-w-2xl mt-4 opacity-80" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            Votre plateforme rapide, sécurisée et optimisée pour des échanges simplifiés.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="flex gap-6 mt-8" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <Link to="/service">
              <Button label="Commencer" className="bg-accent text-white hover:bg-accent/80 shadow-lg shadow-accent/30" />
            </Link>
            <Link to="/login">
              <Button label="Se connecter" className="bg-transparent border border-white hover:bg-white/10" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-200 relative rounded-xl">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Pourquoi nous choisir ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <PlayCircle className="w-12 h-12 mb-4 text-main" />,
                title: "Streaming Haute Qualité",
                description: "Profitez d'une expérience de streaming fluide en haute définition",
              },
              {
                icon: <Shield className="w-12 h-12 mb-4 text-main" />,
                title: "Sécurité Maximale",
                description: "Vos contenus sont protégés avec les dernières technologies de sécurité",
              },
              {
                icon: <Users className="w-12 h-12 mb-4 text-main" />,
                title: "Communauté Active",
                description: "Rejoignez une communauté dynamique de créateurs et spectateurs",
              },
            ].map((feature, index) => (
              <motion.div key={index} className="p-6 rounded-xl bg-white shadow-lg text-center" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}>
                {feature.icon}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section className="bg-main text-white py-24 px-6 relative" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à commencer ?</h2>
          <p className="text-lg opacity-90 max-w-lg mx-auto mb-6">Rejoignez dès maintenant une plateforme moderne et puissante pour le streaming.</p>
          <Link to="/signup">
            <Button label="Créer un compte" className="bg-white text-main font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-white/80 transition-all" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
