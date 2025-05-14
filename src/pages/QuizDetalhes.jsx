// QuizDetalhes.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const quizzes = [
  {
    id: "1",
    titulo: "Empatia Online",
    pontos: 50,
    perguntas: [
      {
        pergunta: "O que significa ter empatia na internet?",
        alternativas: [
          "Ignorar mensagens negativas",
          "Se colocar no lugar do outro antes de comentar",
          "Evitar redes sociais",
          "Denunciar todo mundo",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual é uma atitude empática?",
        alternativas: [
          "Responder agressivamente",
          "Compartilhar fake news",
          "Oferecer ajuda a alguém triste online",
          "Ignorar comentários",
        ],
        correta: 2,
      },
      {
        pergunta: "Empatia online ajuda a:",
        alternativas: [
          "Criar mais brigas",
          "Fortalecer amizades virtuais",
          "Ignorar as pessoas",
          "Evitar o uso da internet",
        ],
        correta: 1,
      },
      {
        pergunta: "Uma forma de praticar empatia é:",
        alternativas: [
          "Comentar qualquer coisa sem pensar",
          "Ouvir e respeitar opiniões diferentes",
          "Impor sua opinião",
          "Responder com ironia",
        ],
        correta: 1,
      },
      {
        pergunta: "Quando alguém erra online, você deve:",
        alternativas: [
          "Cancelar a pessoa",
          "Xingar no privado",
          "Conversar com respeito",
          "Postar expondo o erro",
        ],
        correta: 2,
      },
    ],
  },
  {
    id: "2",
    titulo: "Segurança na Rede",
    pontos: 60,
    perguntas: [
      {
        pergunta: "Qual é uma senha segura?",
        alternativas: ["123456", "meunome123", "Ab!9dE2@", "senha123"],
        correta: 2,
      },
      {
        pergunta: "O que fazer ao receber um link suspeito?",
        alternativas: [
          "Clicar para ver o que é",
          "Ignorar e compartilhar com amigos",
          "Verificar o remetente e não clicar",
          "Postar nas redes",
        ],
        correta: 2,
      },
      {
        pergunta: "Como manter seu perfil seguro?",
        alternativas: [
          "Usar a mesma senha em tudo",
          "Evitar logar em locais públicos",
          "Compartilhar a senha com amigos",
          "Deixar o perfil sempre público",
        ],
        correta: 1,
      },
      {
        pergunta: "Qual atitude é segura online?",
        alternativas: [
          "Publicar dados pessoais",
          "Clicar em todo anúncio",
          "Verificar a fonte de links",
          "Aceitar solicitações de desconhecidos",
        ],
        correta: 2,
      },
      {
        pergunta: "O que é phishing?",
        alternativas: [
          "Técnica de segurança",
          "Tipo de vírus de computador",
          "Enganação para roubar dados",
          "Software confiável",
        ],
        correta: 2,
      },
    ],
  },
];

const QuizDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quiz = quizzes.find((q) => q.id === id);
  const [indicePergunta, setIndicePergunta] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [respondido, setRespondido] = useState(false);
  const [concluido, setConcluido] = useState(false);
  const [jaFeito, setJaFeito] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [pontosGanhos, setPontosGanhos] = useState(0);

  useEffect(() => {
    const quizzesFeitos = JSON.parse(localStorage.getItem("quizzesFeitos") || "[]");
    if (quizzesFeitos.includes(quiz.id)) {
      setJaFeito(true);
    }
  }, [quiz.id]);

  const perguntaAtual = quiz.perguntas[indicePergunta];

  const selecionarResposta = (indice) => {
    if (respondido) return;
    setRespondido(true);

    const novasRespostas = [...respostas, indice];
    setRespostas(novasRespostas);

    setTimeout(() => {
      if (indicePergunta + 1 < quiz.perguntas.length) {
        setIndicePergunta(indicePergunta + 1);
      } else {
        finalizarQuiz(novasRespostas);
      }
      setRespondido(false);
    }, 800);
  };

  const finalizarQuiz = (respostasUsuario) => {
    const totalPerguntas = quiz.perguntas.length;
    const acertos = respostasUsuario.filter(
      (resposta, i) => resposta === quiz.perguntas[i].correta
    ).length;

    const pontosPorAcerto = quiz.pontos / totalPerguntas;
    const pontosGanhos = Math.round(acertos * pontosPorAcerto);

    setAcertos(acertos);
    setPontosGanhos(pontosGanhos);

    const quizzesFeitos = JSON.parse(localStorage.getItem("quizzesFeitos") || "[]");
    if (!quizzesFeitos.includes(quiz.id)) {
      const jogador = JSON.parse(localStorage.getItem("jogador")) || {};
      const pontosAtuais = Number(jogador.pontos) || 0;
      const novosPontos = pontosAtuais + pontosGanhos;

      jogador.pontos = novosPontos;
      jogador.nivel = Math.floor(novosPontos / 100) + 1;

      localStorage.setItem("jogador", JSON.stringify(jogador));
      localStorage.setItem("quizzesFeitos", JSON.stringify([...quizzesFeitos, quiz.id]));
    }

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }, i * 300);
    }

    setConcluido(true);
    setTimeout(() => {
      navigate("/quiz");
    }, 4000);
  };

  if (jaFeito) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 text-center bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold text-[#558358] mb-4">Quiz já realizado</h2>
        <p className="text-gray-600">Você já completou esse quiz. Redirecionando...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {!concluido ? (
        <>
          <h2 className="text-xl font-bold text-[#558358] mb-4">{quiz.titulo}</h2>
          <p className="text-gray-700 mb-2 font-medium">
            Pergunta {indicePergunta + 1} de {quiz.perguntas.length}
          </p>
          <p className="mb-6 font-semibold">{perguntaAtual.pergunta}</p>
          <div className="space-y-3">
            {perguntaAtual.alternativas.map((alternativa, index) => {
              const correta = index === perguntaAtual.correta;
              const selecionada = respondido && index === respostas[respostas.length - 1];
              const classe = respondido
                ? correta
                  ? "bg-green-200 border-green-400"
                  : selecionada
                  ? "bg-red-200 border-red-400"
                  : "bg-gray-100"
                : "hover:bg-gray-100";

              return (
                <button
                  key={index}
                  onClick={() => selecionarResposta(index)}
                  className={`block w-full text-left px-4 py-2 border rounded-lg transition ${classe}`}
                >
                  {alternativa}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-[#558358] mb-4">Quiz Concluído!</h2>
          <p className="text-gray-700 mb-2">Você acertou <strong>{acertos}</strong> de {quiz.perguntas.length} perguntas.</p>
          <p className="text-gray-700 mb-2">Pontuação obtida: <strong>{pontosGanhos} pontos</strong>.</p>
          <p className="text-gray-500 mt-2">Você será redirecionado em instantes...</p>
        </div>
      )}
    </motion.div>
  );
};

export default QuizDetalhes;
