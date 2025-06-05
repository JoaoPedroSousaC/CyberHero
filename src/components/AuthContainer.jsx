import React from "react";
import { useNavigate } from "react-router-dom";
import LogoSection from "./LogoSection";
import StepResponsavel from "./StepResponsavel";

const AuthContainer = () => {
  const navigate = useNavigate();

  const handleCadastroConcluido = () => {
    navigate("/login"); // Redireciona para a tela de login após cadastro
  };

  return (
    <div className="relative w-[900px] h-[550px] overflow-hidden rounded-2xl shadow-2xl bg-white flex">
      <LogoSection />
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <StepResponsavel onNext={handleCadastroConcluido} />
        <p className="mt-4 text-sm">
          Já tem uma conta?{" "}
          <button
            className="text-blue-600 underline"
            onClick={() => navigate("/login")}
          >
            Ir para login
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthContainer;
