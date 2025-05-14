import React, { useState } from 'react';

const StepResponsavel = ({ onNext }) => {
  const [data, setData] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: '',
  });

  const [confirmSenha, setConfirmSenha] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.nome || !data.email || !data.cpf || !data.senha || !confirmSenha) {
      setErroSenha('Preencha todos os campos.');
      return;
    }

    if (data.senha !== confirmSenha) {
      setErroSenha('As senhas não coincidem.');
      return;
    }

    setErroSenha('');
    onNext(data); // pode passar os dados para próxima etapa
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <h2 className="text-xl font-semibold">Dados do Responsável</h2>

      <input
        name="nome"
        placeholder="Nome"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="cpf"
        placeholder="CPF"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="senha"
        type="password"
        placeholder="Crie uma Senha"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Confirme a Senha"
        onChange={(e) => setConfirmSenha(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {erroSenha && <p className="text-red-500 text-sm">{erroSenha}</p>}

      <button
        type="submit"
        className="w-full p-2 text-white rounded"
        style={{ backgroundColor: '#558358' }}
      >
        Próximo
      </button>
    </form>
  );
};

export default StepResponsavel;
