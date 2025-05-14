import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const perguntasRespostas = [
  {
    pergunta: "O que é cyberbullying?",
    resposta:
      "É qualquer tipo de agressão, humilhação ou ameaça feita por meios digitais, como redes sociais, jogos ou mensagens.",
  },
  {
    pergunta: "O que devo fazer se sofrer cyberbullying?",
    resposta:
      "Não responda à provocação. Salve as evidências, bloqueie a pessoa e denuncie o caso a um adulto ou responsável.",
  },
  {
    pergunta: "Como posso ajudar um amigo que está sendo atacado online?",
    resposta:
      "Mostre apoio, incentive a denúncia e nunca compartilhe o conteúdo ofensivo.",
  },
  {
    pergunta: "Por que é importante pensar antes de postar?",
    resposta:
      "Porque tudo que você publica pode afetar outras pessoas e até você mesmo no futuro. Respeito também é digital!",
  },
];

const Faq = () => {
  const [aberta, setAberta] = useState(null);

  const togglePergunta = (index) => {
    setAberta((prev) => (prev === index ? null : index));
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 px-4 py-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-[#558358] mb-8 text-center">
          ❓ Perguntas Frequentes (FAQ)
        </h2>

        <div className="space-y-4">
          {perguntasRespostas.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 cursor-pointer transition-all"
              onClick={() => togglePergunta(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#558358]">
                  {item.pergunta}
                </h3>
                {aberta === index ? (
                  <ChevronUp className="text-[#558358]" />
                ) : (
                  <ChevronDown className="text-[#558358]" />
                )}
              </div>

              <AnimatePresence initial={false}>
                {aberta === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-4 text-gray-700 text-sm"
                  >
                    {item.resposta}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Faq;
