import React, { useState } from 'react';

const StepAluno = ({ onNext }) => {
  const [data, setData] = useState({ nome: '', email: '', matricula: '' });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.nome && data.email && data.matricula) {
      alert('Cadastro concluído!');
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <h2 className="text-xl font-semibold">Dados do Estudante</h2>
      <input name="nome" onChange={handleChange} placeholder="Nome" className="w-full p-2 border rounded" />
      <input name="email" onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" />
      <input name="matricula" onChange={handleChange} placeholder="Matrícula" className="w-full p-2 border rounded" />
      <button type="submit" className="w-full p-2 text-white rounded" style={{ backgroundColor: '#558358' }}>
        Finalizar cadastro
      </button>
    </form>
  );
};

export default StepAluno;
