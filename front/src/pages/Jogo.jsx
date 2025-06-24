import React, { useState } from "react";
import { motion } from "framer-motion";

const Jogo = () => {
  const [estado, setEstado] = useState("inicio"); // 'inicio' | 'carregando' | 'jogo'

  const iniciarJogo = () => {
    setEstado("carregando");
    setTimeout(() => {
      setEstado("jogo");
    }, 2000); // Simula carregamento de 2 segundos
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#558358] to-[#446746] text-white p-4">
      <motion.h1
        className="text-5xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Jogo Interativo
      </motion.h1>

      {estado === "inicio" && (
        <>
          <motion.p
            className="text-lg mb-6 text-center max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Em breve, um jogo cheio de desafios sobre cidadania digital, empatia e respeito!
          </motion.p>
          <motion.button
            onClick={iniciarJogo}
            className="bg-white text-[#558358] font-semibold px-6 py-3 rounded-xl shadow-md hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Começar Jogo
          </motion.button>
        </>
      )}

      {estado === "carregando" && (
        <motion.div
          className="flex flex-col items-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"
            style={{ borderTopColor: "#99D6A1" }}
          />
          <p>Carregando jogo...</p>
        </motion.div>
      )}

      {estado === "jogo" && (
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-2xl font-bold">🚧 Jogo em construção 🚧</p>
          <p className="mt-2">Volte em breve para jogar!</p>
        </motion.div>
      )}
    </div>
  );
};

export default Jogo;
