import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Participar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    instituicao: "",
    mensagem: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar lógica para envio real futuramente

    alert("Formulário enviado com sucesso!");
    navigate("/instituicao");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold text-[#558358] mb-4">🧩 Como Participar</h1>
      <p className="mb-4 text-gray-700">
        Se você é pai, mãe, responsável ou membro de uma instituição e deseja colaborar com a missão de promover uma internet mais segura e acolhedora para os jovens, preencha o formulário abaixo. Sua participação é fundamental!
      </p>
      <ul className="list-disc ml-6 mb-6 text-gray-700">
        <li>Receba materiais educativos e dicas para orientação digital.</li>
        <li>Contribua com ideias, sugestões ou feedbacks.</li>
        <li>Participe de encontros e campanhas sobre cidadania digital.</li>
      </ul>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome" className="block font-medium text-gray-700">Nome completo</label>
          <input
            type="text"
            id="nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#558358]"
            placeholder="Seu nome"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#558358]"
            placeholder="exemplo@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="instituicao" className="block font-medium text-gray-700">Instituição ou vínculo (opcional)</label>
          <input
            type="text"
            id="instituicao"
            value={formData.instituicao}
            onChange={handleChange}
            className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#558358]"
            placeholder="Nome da escola, ONG, etc."
          />
        </div>

        <div>
          <label htmlFor="mensagem" className="block font-medium text-gray-700">Como deseja contribuir?</label>
          <textarea
            id="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#558358]"
            rows="4"
            placeholder="Conte-nos como você gostaria de se envolver com o projeto."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#558358] text-white px-6 py-2 rounded-full font-medium hover:bg-[#446746] transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Participar;
