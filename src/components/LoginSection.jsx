import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoSection from "../components/LogoSection"; // ajuste o caminho se necessário

const LoginSection = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroLogin, setErroLogin] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setErroLogin("Preencha email e senha.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3333/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro no login");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/home");
    } catch (err) {
      setErroLogin(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-[900px] h-[550px] overflow-hidden rounded-2xl shadow-2xl bg-white flex">
        <LogoSection />

        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
            <h2 className="text-2xl font-semibold text-center">Login</h2>

            <input
              type="email"
              placeholder="Email do responsável"
              className="w-full p-3 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha do responsável"
              className="w-full p-3 border border-gray-300 rounded"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            {erroLogin && <p className="text-red-500 text-sm">{erroLogin}</p>}

            <button
              type="submit"
              className="w-full p-3 text-white rounded"
              style={{ backgroundColor: "#558358" }}
            >
              Entrar
            </button>
          </form>

          <p className="mt-4 text-sm">
            Ainda não tem uma conta?{" "}
            <button
              className="text-blue-600 underline"
              onClick={() => navigate("/")}
            >
              Criar agora
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
