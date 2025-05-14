import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const fluxoMensagens = {
  inicio: {
    mensagem: "Oi! 😊 Estou aqui se você quiser conversar. Como você está se sentindo hoje?",
    opcoes: [
      { texto: "Estou triste", proximo: "triste" },
      { texto: "Passei por algo ruim", proximo: "problema" },
      { texto: "Estou bem 😊", proximo: "feliz" },
    ],
  },
  triste: {
    mensagem: "Sinto muito por isso. Você quer conversar sobre o que aconteceu?",
    opcoes: [
      { texto: "Sim, quero falar sobre isso", proximo: "apoio" },
      { texto: "Prefiro ver dicas", proximo: "dicas" },
    ],
  },
  problema: {
    mensagem: "Você não está sozinho(a). Isso é mais comum do que parece. Quer saber como agir?",
    opcoes: [
      { texto: "Sim, por favor", proximo: "dicas" },
      { texto: "Quero só desabafar", proximo: "apoio" },
    ],
  },
  feliz: {
    mensagem: "Que bom! 😊 Continue espalhando gentileza e respeito online!",
    opcoes: [
      { texto: "Ok!", proximo: null },
    ],
  },
  apoio: {
    mensagem: "Você pode conversar com um adulto de confiança. Falar é importante. E estou aqui também. 💛",
    opcoes: [
      { texto: "Obrigado pelo apoio", proximo: null },
    ],
  },
  dicas: {
    mensagem: "Se algo ruim acontecer, tire print, não responda com raiva e fale com alguém confiável.",
    opcoes: [
      { texto: "Entendi! Vou lembrar disso", proximo: null },
    ],
  },
};

const depoimentosSimulados = [
  {
    nome: "Lucas, 14 anos",
    historia: "Comecei a receber mensagens ruins num grupo da escola. Fiquei triste, mas falei com a coordenadora. Hoje me sinto mais seguro e o grupo melhorou muito.",
  },
  {
    nome: "Ana, 13 anos",
    historia: "Eu achava que ninguém ia entender, mas contei para minha mãe. Ela me ajudou e fui ouvida na escola. As coisas mudaram pra melhor!",
  },
  {
    nome: "Rafael, 15 anos",
    historia: "Depois de contar para meu professor, criamos juntos um projeto de empatia na turma. Agora me sinto forte por dentro.",
  },
];

const Conselheiro = () => {
  const [mensagens, setMensagens] = useState([
    { autor: "conselheiro", texto: fluxoMensagens.inicio.mensagem },
  ]);
  const [etapaAtual, setEtapaAtual] = useState("inicio");
  const [mostrarDepoimentos, setMostrarDepoimentos] = useState(false);
  const mensagensRef = useRef(null);

  useEffect(() => {
    mensagensRef.current?.scrollTo(0, mensagensRef.current.scrollHeight);
  }, [mensagens]);

  const escolherOpcao = (opcao) => {
    const novaMensagemUsuario = { autor: "usuario", texto: opcao.texto };
    setMensagens((prev) => [...prev, novaMensagemUsuario]);

    if (opcao.proximo && fluxoMensagens[opcao.proximo]) {
      const respostaConselheiro = fluxoMensagens[opcao.proximo].mensagem;
      setTimeout(() => {
        setMensagens((prev) => [
          ...prev,
          { autor: "conselheiro", texto: respostaConselheiro },
        ]);
        setEtapaAtual(opcao.proximo);
      }, 600);
    } else {
      setEtapaAtual(null);
    }
  };

  const opcoes = etapaAtual ? fluxoMensagens[etapaAtual].opcoes : [];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-6"
    >
      <h2 className="text-2xl font-bold text-[#558358] mb-4 flex items-center gap-2">
        Conselheiro Virtual 💬
        <button
          onClick={() => setMostrarDepoimentos(!mostrarDepoimentos)}
          className="ml-auto flex items-center gap-1 text-sm text-[#558358] hover:underline"
        >
          <Users size={16} />
          {mostrarDepoimentos ? "Ocultar histórias" : "Ver histórias de outros jovens"}
        </button>
      </h2>

      <div
        ref={mensagensRef}
        className="h-96 overflow-y-auto bg-gray-100 p-4 rounded-xl space-y-3"
      >
        {mensagens.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] px-4 py-2 rounded-xl ${
              msg.autor === "usuario"
                ? "bg-[#558358] text-white self-end ml-auto"
                : "bg-white border text-gray-800"
            }`}
          >
            {msg.texto}
          </div>
        ))}

        {mostrarDepoimentos && (
          <div className="space-y-3 mt-4">
            {depoimentosSimulados.map((dep, i) => (
              <div
                key={i}
                className="bg-white border-l-4 border-[#558358] p-3 rounded-md text-sm text-gray-700"
              >
                <p className="font-semibold mb-1">{dep.nome}</p>
                <p>{dep.historia}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {opcoes.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {opcoes.map((opcao, i) => (
            <button
              key={i}
              onClick={() => escolherOpcao(opcao)}
              className="bg-[#558358] text-white px-4 py-2 rounded-lg hover:opacity-90 text-left"
            >
              {opcao.texto}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Conselheiro;
