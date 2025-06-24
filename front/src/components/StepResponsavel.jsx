import React, { useState } from "react";

const StepResponsavel = ({ onNext }) => {
  const [data, setData] = useState({
    nome: "",    // nome do aluno
    email: "",   // email do responsável
    senha: "",   // senha do responsável
  });

  const [confirmSenha, setConfirmSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroApi, setErroApi] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica dos campos
    if (!data.nome.trim() || !data.email.trim() || !data.senha || !confirmSenha) {
      setErroSenha("Preencha todos os campos.");
      return;
    }

    // Validação de email básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setErroSenha("Digite um email válido.");
      return;
    }

    if (data.senha !== confirmSenha) {
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
          name: data.nome.trim(),
          email: data.email.trim(),
          password: data.senha,
          points: 0,
        }),
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.error || "Erro ao cadastrar");
      }

      onNext();
    } catch (err) {
      setErroApi(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <h2 className="text-xl font-semibold">Cadastro</h2>

      <input
        name="nome"
        placeholder="Nome do aluno"
        value={data.nome}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        disabled={loading}
        autoComplete="off"
      />
      <input
        name="email"
        type="email"
        placeholder="Email do responsável"
        value={data.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        disabled={loading}
        autoComplete="off"
      />
      <input
        name="senha"
        type="password"
        placeholder="Crie uma senha"
        value={data.senha}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        disabled={loading}
        autoComplete="new-password"
      />
      <input
        type="password"
        placeholder="Confirme a senha"
        value={confirmSenha}
        onChange={(e) => setConfirmSenha(e.target.value)}
        className="w-full p-2 border rounded"
        disabled={loading}
        autoComplete="new-password"
      />

      {erroSenha && <p className="text-red-500 text-sm">{erroSenha}</p>}
      {erroApi && <p className="text-red-500 text-sm">{erroApi}</p>}

      <button
        type="submit"
        className="w-full p-2 text-white rounded disabled:opacity-60"
        style={{ backgroundColor: "#558358" }}
        disabled={loading}
      >
        {loading ? "Cadastrando..." : "Finalizar cadastro"}
      </button>
    </form>
  );
};

export default StepResponsavel;
