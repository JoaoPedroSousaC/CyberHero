import React, { useState } from "react";

const FormSection = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    nomeAluno: "",
    emailResponsavel: "",
    senhaResponsavel: "",
  });

  const [confirmSenha, setConfirmSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erroApi, setErroApi] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nomeAluno, emailResponsavel, senhaResponsavel } = formData;

    if (!nomeAluno || !emailResponsavel || !senhaResponsavel || !confirmSenha) {
      setErroSenha("Preencha todos os campos.");
      return;
    }

    if (senhaResponsavel !== confirmSenha) {
      setErroSenha("As senhas não coincidem.");
      return;
    }

    setErroSenha("");
    setErroApi("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3333/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nomeAluno,
          email: emailResponsavel,
          password: senhaResponsavel,
          points: 0,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao cadastrar");
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess(); // vai para login
      }, 1000);
    } catch (error) {
      setErroApi(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[450px] h-full flex items-center justify-center p-8 overflow-y-auto">
      <form onSubmit={handleSubmit} className="w-full space-y-3">
        <h2 className="text-2xl font-semibold mb-4 text-center">Cadastro</h2>

        <input
          type="text"
          name="nomeAluno"
          placeholder="Nome do aluno"
          value={formData.nomeAluno}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={loading}
        />
        <input
          type="email"
          name="emailResponsavel"
          placeholder="Email do responsável"
          value={formData.emailResponsavel}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={loading}
        />
        <input
          type="password"
          name="senhaResponsavel"
          placeholder="Senha do responsável"
          value={formData.senhaResponsavel}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Confirme a senha"
          value={confirmSenha}
          onChange={(e) => setConfirmSenha(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={loading}
        />

        {erroSenha && <p className="text-red-500 text-sm">{erroSenha}</p>}
        {erroApi && <p className="text-red-500 text-sm">{erroApi}</p>}

        <button
          type="submit"
          className="w-full p-2 text-white rounded"
          style={{ backgroundColor: "#558358" }}
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        {success && (
          <p className="text-green-600 text-center mt-2">
            Cadastro realizado com sucesso!
          </p>
        )}
      </form>
    </div>
  );
};

export default FormSection;
