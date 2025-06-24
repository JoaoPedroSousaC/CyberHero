import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Loja = () => {
  const [jogador, setJogador] = useState({
    pontos: 0,
    pontosTotais: 0,
    pontosUsados: 0,
    badge: "Explorador Digital",
    avatar: "😀",
    itensComprados: [],
  });

  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("jogador")) || {
      pontos: 0,
      pontosTotais: 0,
      pontosUsados: 0,
      badge: "Explorador Digital",
      avatar: "😀",
      itensComprados: [],
    };
    setJogador(dadosSalvos);
  }, []);

  const atualizarJogador = (novosDados) => {
    const atualizado = { ...jogador, ...novosDados };
    setJogador(atualizado);
    localStorage.setItem("jogador", JSON.stringify(atualizado));
    if (novosDados.avatar !== undefined) {
      localStorage.setItem("avatar", novosDados.avatar);
    }
    if (novosDados.badge !== undefined) {
      localStorage.setItem("titulo", novosDados.badge);
    }
  };

  const handleCompra = (item, tipo) => {
    if (jogador.itensComprados?.includes(item.nome)) {
      alert("Você já comprou este item!");
      return;
    }

    if (jogador.pontos < item.preco) {
      alert("Você não tem pontos suficientes para comprar este item.");
      return;
    }

    const pontosRestantes = jogador.pontos - item.preco;
    const novosItens = [...(jogador.itensComprados || []), item.nome];
    const novosPontosUsados = (jogador.pontosUsados || 0) + item.preco;

    const novosDados = {
      pontos: pontosRestantes,
      pontosUsados: novosPontosUsados,
      pontosTotais: jogador.pontosTotais || 0, // não muda aqui
      itensComprados: novosItens,
    };

    if (tipo === "titulo") {
      novosDados.badge = item.nome;
    }

    if (tipo === "icone") {
      novosDados.avatar = item.emoji;
      novosDados.badge = jogador.badge; // mantém o título atual
    }

    atualizarJogador(novosDados);
    alert(`Você comprou: ${item.nome}!`);
  };

  const icones = [
    { id: 1, nome: "🦸‍♂️ Herói Digital", emoji: "🦸‍♂️", preco: 100, descricao: "Protege a internet com coragem." },
    { id: 2, nome: "🐱 Gato Hacker", emoji: "🐱", preco: 90, descricao: "Astuto e estiloso." },
    { id: 3, nome: "🐉 Dragão Antibullying", emoji: "🐉", preco: 100, descricao: "Combate o cyberbullying!" },
  ];

  const titulos = [
    { id: 1, nome: "Guardião da Rede", preco: 150, descricao: "Nobre defensor da cidadania digital." },
    { id: 2, nome: "Aliado do Bem", preco: 90, descricao: "Espalha positividade online." },
    { id: 3, nome: "Super Consciente", preco: 110, descricao: "Pensa antes de postar." },
  ];

  const itemJaComprado = (nome) => jogador.itensComprados?.includes(nome);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto p-6 mt-10"
    >
      <h1 className="text-3xl font-bold text-[#558358] text-center mb-6">🛒 Loja de Itens</h1>

      <p className="text-center text-lg font-medium mb-8">
        Você tem <span className="font-bold text-[#446746]">{jogador.pontos}</span> moedas
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#446746] mb-4">✨ Ícones</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {icones.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md p-4">
              <h3 className="text-xl font-bold text-[#558358]">{item.nome}</h3>
              <p className="text-3xl mb-2">{item.emoji}</p>
              <p className="text-gray-700 mb-2">{item.descricao}</p>
              <p className="text-sm text-gray-600 mb-4">💰 {item.preco} moedas</p>
              <button
                disabled={itemJaComprado(item.nome)}
                onClick={() => handleCompra(item, "icone")}
                className={`px-4 py-2 rounded-full transition ${
                  itemJaComprado(item.nome)
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#558358] text-white hover:bg-[#446746]"
                }`}
              >
                {itemJaComprado(item.nome) ? "Comprado" : "Comprar"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[#446746] mb-4">🏷️ Títulos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {titulos.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md p-4">
              <h3 className="text-xl font-bold text-[#558358]">{item.nome}</h3>
              <p className="text-gray-700 mb-2">{item.descricao}</p>
              <p className="text-sm text-gray-600 mb-4">💰 {item.preco} moedas</p>
              <button
                disabled={itemJaComprado(item.nome)}
                onClick={() => handleCompra(item, "titulo")}
                className={`px-4 py-2 rounded-full transition ${
                  itemJaComprado(item.nome)
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#558358] text-white hover:bg-[#446746]"
                }`}
              >
                {itemJaComprado(item.nome) ? "Comprado" : "Comprar"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Loja;
