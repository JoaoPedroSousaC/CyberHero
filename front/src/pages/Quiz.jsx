import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const quizzes = [
  {
    id: "1",
    titulo: "Quiz de Empatia",
    tema: "Empatia Digital",
    duracao: "2-3 min",
    criadoEm: "01/05/2025",
    tempoLimite: "5 min",
    tentativas: "1",
    pontos: 50,
    descricao: "Teste seus conhecimentos sobre empatia no ambiente digital!",
    perguntas: [],
  },
  {
    id: "2",
    titulo: "Quiz de Segurança Online",
    tema: "Segurança Digital",
    duracao: "3-4 min",
    criadoEm: "02/05/2025",
    tempoLimite: "6 min",
    tentativas: "1",
    pontos: 60,
    descricao: "Aprenda como se proteger no mundo digital!",
    perguntas: [],
  },
];

const Quiz = () => {
  const [ativo, setAtivo] = useState(null);
  const [quizzesFeitos, setQuizzesFeitos] = useState([]);
  const [jogador, setJogador] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const feitos = JSON.parse(localStorage.getItem("quizzesFeitos") || "[]").map(String);
    setQuizzesFeitos(feitos);

    const j = JSON.parse(localStorage.getItem("jogador") || "{}");
    setJogador(j);
  }, []);

  const toggleDetalhes = (id) => {
    setAtivo(ativo === id ? null : id);
  };

  const renderQuizCard = (quiz, index) => {
    const jaFeito = quizzesFeitos.includes(quiz.id);

    return (
      <motion.div
        key={quiz.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
        className={`bg-white shadow-md rounded-2xl p-4 mb-4 hover:shadow-lg transition ${
          jaFeito ? "border-4 border-green-500 bg-green-50" : ""
        }`}
      >
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleDetalhes(quiz.id)}
        >
          <div>
            <h3 className="text-lg font-semibold text-[#558358] flex items-center gap-2">
              {quiz.titulo}
              {jaFeito && (
                <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  ✅ Concluído
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-600">🧩 Tema: {quiz.tema}</p>
            <p className="text-sm text-gray-600">⏱️ Duração mínima: {quiz.duracao}</p>
          </div>
          <span className="text-[#446746] text-sm font-medium">
            {ativo === quiz.id ? "▲ Menos" : "▼ Mais"}
          </span>
        </div>

        <AnimatePresence>
          {ativo === quiz.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-sm text-gray-700 border-t pt-3 overflow-hidden"
            >
              <p>
                <strong>📅 Criado em:</strong> {quiz.criadoEm}
              </p>
              <p>
                <strong>⏳ Tempo limite:</strong> {quiz.tempoLimite}
              </p>
              <p>
                <strong>🔁 Tentativas:</strong> {quiz.tentativas}
              </p>
              <p>
                <strong>🏆 Pontuação:</strong> {quiz.pontos} pontos
              </p>
              <p className="mt-2">
                <strong>🔎 Sobre:</strong> {quiz.descricao}
              </p>

              <motion.button
                whileHover={{ scale: jaFeito ? 1 : 1.05 }}
                whileTap={{ scale: jaFeito ? 1 : 0.95 }}
                className={`mt-4 px-4 py-2 rounded-full transition font-medium ${
                  jaFeito
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-[#558358] text-white hover:bg-[#446746]"
                }`}
                onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quiz } })}
                disabled={jaFeito}
              >
                {jaFeito ? "Quiz Respondido" : "Iniciar"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // Garantir tipos corretos
  const pontosTotais = parseInt(jogador.pontos, 10) || 0;
  const itensComprados = Array.isArray(jogador.itensComprados) ? jogador.itensComprados : [];

  const catalogo = [
    { nome: "🦸‍♂️ Herói Digital", preco: 100 },
    { nome: "🐱 Gato Hacker", preco: 90 },
    { nome: "🐉 Dragão Antibullying", preco: 100 },
    { nome: "Guardião da Rede", preco: 150 },
    { nome: "Aliado do Bem", preco: 90 },
    { nome: "Super Consciente", preco: 110 },
  ];

  const pontosGastos = itensComprados.reduce((total, nome) => {
    const item = catalogo.find((i) => i.nome === nome);
    return total + Number(item?.preco || 0);
  }, 0);

  const pontosDisponiveis = Math.max(0, pontosTotais - pontosGastos);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-[#446746]">🧠 Quizzes Disponíveis</h1>
      {quizzes.map((quiz, index) => renderQuizCard(quiz, index))}

      {jogador?.pontos != null && (
        <div className="text-sm text-gray-700 mt-6 space-y-1 text-right">
          <p>
            🎯 <strong>Pontos disponíveis:</strong>{" "}
            <span className="font-semibold text-[#446746]">{pontosDisponiveis}</span>
          </p>
          <p>💸 <strong>Pontos gastos:</strong> {pontosGastos}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
