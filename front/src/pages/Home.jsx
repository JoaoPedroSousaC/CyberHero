import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Brain,
  Network,
  MessageCircleHeart,
  Info,
  Star,
} from "lucide-react";
import InfoCard from "../components/InfoCard";

const frases = [
  "Seja uma inspiração na internet.",
  "Espalhe empatia, não ódio.",
  "Palavras importam. Use-as com sabedoria.",
  "Seja o exemplo de respeito online.",
  "Na dúvida, seja gentil.",
  "A sua atitude online constrói o futuro digital.",
  "Transforme a rede em um lugar seguro para todos.",
];

const iconesLucide = {
  Star,
  ShieldCheck,
  MessageCircleHeart,
  Brain,
};

const avataresIniciais = ["😀"];
const titulosIniciais = ["Explorador Digital"];
const avataresLoja = ["🦸‍♂️ Herói Digital", "🐱 Gato Hacker", "🐉 Dragão Antibullying"];
const titulosLoja = ["Guardião da Rede", "Aliado do Bem", "Super Consciente"];

const Home = () => {
  const [frase, setFrase] = useState("");
  const nomeAluno = "Lucas Oliveira";

  const jogadorDefault = {
    avatar: "😀",
    badge: "Explorador Digital",
    icone: "Star",
    pontos: 0,
    pontosTotais: 0,
    pontosUsados: 0,
    itensComprados: [],
  };

  const [jogador, setJogador] = useState(jogadorDefault);
  const [editandoAvatar, setEditandoAvatar] = useState(false);
  const [editandoTitulo, setEditandoTitulo] = useState(false);

  useEffect(() => {
    const carregarJogador = () => {
      const dadosSalvos = JSON.parse(localStorage.getItem("jogador"));
      if (dadosSalvos) {
        setJogador((prev) => ({ ...prev, ...dadosSalvos }));
      }
    };

    carregarJogador();
    window.addEventListener("focus", carregarJogador);
    return () => window.removeEventListener("focus", carregarJogador);
  }, []);

  useEffect(() => {
    const random = Math.floor(Math.random() * frases.length);
    setFrase(frases[random]);
  }, []);

  const {
    avatar,
    badge,
    pontosTotais = 0,
    pontos = 0,
    pontosUsados = 0,
    itensComprados = [],
  } = jogador;

  const pontosFaltando = 100 - (pontosTotais % 100);
  const progressoPercentual = ((pontosTotais % 100) / 100) * 100;
  const IconeSelecionado = iconesLucide[jogador.icone] || Star;

  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const salvarAlteracao = (campo, valor) => {
    const atualizado = { ...jogador, [campo]: valor };
    setJogador(atualizado);
    localStorage.setItem("jogador", JSON.stringify(atualizado));
  };

  const avataresDisponiveis = [
    ...avataresIniciais,
    ...avataresLoja
      .filter((item) => itensComprados.includes(item))
      .map((item) => item.split(" ")[0]),
  ];

  const titulosDisponiveis = [
    ...titulosIniciais,
    ...titulosLoja.filter((titulo) => itensComprados.includes(titulo)),
  ];

  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-[#558358] shadow-md p-6 rounded-2xl flex items-center justify-between mb-8 min-h-[150px] text-white">
        <div>
          <h2 className="text-2xl font-bold">Olá, {nomeAluno} 👋</h2>
          <p className="text-sm">{dataAtual}</p>
          <p className="mt-2 font-medium">{frase}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2 text-[#558358]">📈 Seu Progresso</h3>

          {editandoAvatar ? (
            <div className="flex flex-wrap gap-2 mb-2">
              {avataresDisponiveis.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    salvarAlteracao("avatar", a);
                    setEditandoAvatar(false);
                  }}
                  className="text-2xl hover:scale-125 transition"
                >
                  {a}
                </button>
              ))}
            </div>
          ) : (
            <div
              className="text-4xl mb-2 cursor-pointer hover:opacity-80 transition"
              onClick={() => setEditandoAvatar(true)}
              title="Clique para trocar o avatar"
            >
              {avatar}
            </div>
          )}

          <p>
            Pontos disponíveis: <span className="font-bold">{pontos}</span>
          </p>
          <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
            <div
              className="bg-[#558358] h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressoPercentual}%` }}
            />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <IconeSelecionado className="text-yellow-500" size={20} />
            {editandoTitulo ? (
              <select
                value={badge}
                onChange={(e) => {
                  salvarAlteracao("badge", e.target.value);
                  setEditandoTitulo(false);
                }}
                className="text-sm rounded px-2 py-1 border"
              >
                {titulosDisponiveis.map((titulo) => (
                  <option key={titulo} value={titulo}>
                    {titulo}
                  </option>
                ))}
              </select>
            ) : (
              <span
                className="text-sm cursor-pointer underline"
                onClick={() => setEditandoTitulo(true)}
                title="Clique para trocar o título"
              >
                Título: {badge}
              </span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#558358]">🎮 Jogue e Aprenda!</h3>
            <p className="text-base text-gray-700 mb-4 leading-relaxed">
              Entre em uma jornada interativa onde cada desafio ensina como agir com respeito,
              segurança e empatia no mundo digital. Torne-se um verdadeiro herói da internet
              enfrentando situações reais e tomando decisões que fazem a diferença!
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-[#558358]">🏆 Ranking Geral</h3>
          <ul className="space-y-3">
            {[
              { nome: "João Vitor", pontos: 950, avatar: "🦸‍♂️" },
              { nome: "Ana Silva", pontos: 900, avatar: "🐱" },
              { nome: "Lucas Melo", pontos: 870, avatar: "🐉" },
              { nome: "Carla Lima", pontos: 860, avatar: "😀" },
              { nome: "Bruno Reis", pontos: 850, avatar: "🐱" },
            ]
              .sort((a, b) => b.pontos - a.pontos)
              .map((user, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-600 w-6">{index + 1}º</span>
                    <span className="text-2xl">{user.avatar}</span>
                    <span className="font-medium">{user.nome}</span>
                  </div>
                  <span className="font-semibold text-[#558358]">{user.pontos} pts</span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard
          titulo="Segurança"
          descricao="Proteja seus dados e sua identidade online para uma navegação segura."
          detalhes="Use senhas fortes, evite clicar em links suspeitos e nunca compartilhe informações pessoais sem necessidade."
          icone={ShieldCheck}
        />
        <InfoCard
          titulo="Respeito"
          descricao="Promova empatia e convivência saudável em todas as suas interações digitais."
          detalhes="Seja gentil nos comentários, evite discursos ofensivos e respeite opiniões diferentes das suas."
          icone={Users}
        />
        <InfoCard
          titulo="Pensamento Crítico"
          descricao="Aprenda a analisar, verificar e interpretar o conteúdo da internet de forma consciente."
          detalhes="Questione fontes, identifique fake news e desenvolva seu senso crítico diante do excesso de informações."
          icone={Brain}
        />
        <InfoCard
          titulo="Conexão Positiva"
          descricao="Construa relacionamentos digitais que tragam crescimento e apoio mútuo."
          detalhes="Compartilhe conteúdos úteis, incentive boas práticas e ajude a construir comunidades mais saudáveis."
          icone={Network}
        />
        <InfoCard
          titulo="Comunicação Empática"
          descricao="Pratique uma comunicação que considere os sentimentos e pontos de vista dos outros."
          detalhes="Ao escrever mensagens, pense em como elas serão recebidas. A empatia é a chave para um ambiente online acolhedor."
          icone={MessageCircleHeart}
        />
        <InfoCard
          titulo="Informação Consciente"
          descricao="Consuma, compartilhe e produza informações com responsabilidade e ética."
          detalhes="Verifique a veracidade antes de compartilhar algo, cite fontes confiáveis e evite disseminar desinformação."
          icone={Info}
        />
      </div>
    </motion.div>
  );
};

export default Home;
