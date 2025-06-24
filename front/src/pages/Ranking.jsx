import React from "react";
import { motion } from "framer-motion";
import { Crown, Medal, Award } from "lucide-react";

const Ranking = () => {
  const top3 = [
    {
      nome: "João Vitor",
      pontos: 950,
      badge: "Herói Lendário",
      icon: <Crown className="w-8 h-8 text-yellow-500" />,
      avatar: "🦸‍♂️",
    },
    {
      nome: "Ana Silva",
      pontos: 900,
      badge: "Guardião da Web",
      icon: <Medal className="w-8 h-8 text-slate-400" />,
      avatar: "🐱",
    },
    {
      nome: "Lucas Melo",
      pontos: 870,
      badge: "Protetor Digital",
      icon: <Award className="w-8 h-8 text-amber-700" />,
      avatar: "🐉",
    },
  ];

  const rankingGeral = [
    { nome: "Carla Lima", pontos: 860, badge: "Cidadão Consciente", avatar: "😀" },
    { nome: "Bruno Reis", pontos: 850, badge: "Cidadão Consciente", avatar: "🐱" },
    { nome: "Juliana Paiva", pontos: 840, badge: "Cidadão Consciente", avatar: "🦸‍♂️" },
    { nome: "Daniel Rocha", pontos: 830, badge: "Cidadão Consciente", avatar: "🐉" },
    { nome: "Paulo Henrique", pontos: 820, badge: "Cidadão Consciente", avatar: "😀" },
    { nome: "Mariana Souza", pontos: 810, badge: "Cidadão Consciente", avatar: "🐱" },
    { nome: "Thiago Nunes", pontos: 800, badge: "Cidadão Consciente", avatar: "😀" },
  ];

  return (
    <motion.div
      className="bg-white min-h-screen p-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top 3 em destaque */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-[#558358] mb-4">
            🏆 Top 3 Heróis da Semana
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {top3.map((heroi, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center"
              >
                <div className="mb-2">{heroi.icon}</div>
                <div className="text-6xl mb-2">{heroi.avatar}</div>
                <h3 className="text-lg font-semibold text-[#558358]">{heroi.nome}</h3>
                <p className="text-gray-700 text-sm">{heroi.badge}</p>
                <p className="text-gray-600 font-bold mt-1">{heroi.pontos} pts</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ranking Geral */}
        <div>
          <h2 className="text-xl font-semibold text-[#558358] mb-4">
            🌟 Ranking Geral
          </h2>
          <div className="bg-white shadow-md rounded-2xl p-4 space-y-3 max-h-[500px] overflow-y-auto">
            {rankingGeral.map((pessoa, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{pessoa.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {index + 4}. {pessoa.nome}
                    </p>
                    <p className="text-xs text-gray-500">{pessoa.badge}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#558358]">
                  {pessoa.pontos} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Ranking;
