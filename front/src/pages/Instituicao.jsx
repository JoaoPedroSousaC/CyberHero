import React from "react";
import { motion } from "framer-motion";

const Instituicao = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800">
      {/* Título principal */}
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-[#558358] mb-2">
          Famílias & Instituições
        </h1>
        <p className="text-lg text-gray-600">
          Juntos, podemos formar uma geração consciente, ética e segura no mundo
          digital.
        </p>
      </div>

      {/* Seções em cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Propósito */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-[#558358] mb-2">
            📘 Por que criamos isso?
          </h2>
          <p>
            Para ajudar jovens a navegarem com responsabilidade na internet, e
            incentivar o diálogo entre escola, família e aluno.
          </p>
        </motion.div>

        {/* O que seu filho aprende */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-[#558358] mb-2">
            🧠 O que seu filho vai aprender
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Como se proteger online</li>
            <li>Respeitar os outros e praticar empatia</li>
            <li>Agir diante de cyberbullying</li>
            <li>Pensar antes de postar</li>
          </ul>
        </motion.div>

        {/* Como a escola pode agir */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white shadow rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-[#558358] mb-2">
            🏫 Como a escola pode usar
          </h2>
          <p className="text-sm text-gray-700 mb-3">
            Professores podem usar o conteúdo como ferramenta educativa:
          </p>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Complementar aulas de cidadania digital</li>
            <li>Iniciar debates e rodas de conversa</li>
            <li>Aplicar em oficinas de tecnologia</li>
          </ul>
        </motion.div>

        {/* Como os pais podem se envolver */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-[#558358] mb-2">
            👨‍👩‍👧‍👦 Como os pais podem se envolver
          </h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Converse com seu filho após ele jogar</li>
            <li>Peça que ele explique o que aprendeu</li>
            <li>Reforce atitudes seguras e respeitosas online</li>
            <li>Denuncie conteúdos impróprios ou ofensivos</li>
          </ul>
        </motion.div>

        {/* Chamada para ação */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="bg-[#558358] text-white shadow rounded-2xl p-6 col-span-1 md:col-span-2 text-center"
        >
          <h2 className="text-2xl font-bold mb-3">📣 Vamos agir juntos?</h2>
          <p className="mb-4">
            Se você é pai, mãe ou educador, sua participação é essencial.
          </p>
          <a
            href="/participar"
            className="bg-white text-[#558358] font-semibold px-6 py-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            Quero Participar
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Instituicao;
