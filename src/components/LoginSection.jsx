import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSection = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (matricula && senha) {
      // Aqui você validaria os dados de login
      navigate('/home');
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
      <h2 className="text-xl font-semibold">Login</h2>
      <input
        type="text"
        placeholder="Matrícula do Aluno"
        className="w-full p-2 border rounded"
        onChange={(e) => setMatricula(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha do Responsável"
        className="w-full p-2 border rounded"
        onChange={(e) => setSenha(e.target.value)}
      />
      <button type="submit" className="w-full p-2 text-white rounded" style={{ backgroundColor: '#558358' }}>
        Entrar
      </button>
      <p className="text-sm text-center text-blue-600 cursor-pointer hover:underline">Esqueci minha senha</p>
    </form>
  );
};

export default LoginSection;
