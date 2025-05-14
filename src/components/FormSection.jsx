import React, { useState } from 'react';

const FormSection = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    filho: '',
    emailEstudante: '',
    emailResponsavel: '',
    matricula: '',
    cpfResponsavel: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nome, email, filho, emailEstudante, emailResponsavel, matricula, cpfResponsavel } = formData;

    if (nome && email && filho && emailEstudante && emailResponsavel && matricula && cpfResponsavel) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
      }, 1000);
    }
  };

  return (
    <div className="w-[450px] h-full flex items-center justify-center p-8 overflow-y-auto">
      <form onSubmit={handleSubmit} className="w-full space-y-3">
        <h2 className="text-2xl font-semibold mb-4 text-center">Cadastro</h2>

        <input
          type="text"
          name="nome"
          placeholder="Nome do responsável"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email do responsável"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="cpfResponsavel"
          placeholder="CPF do responsável"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="filho"
          placeholder="Nome do estudante"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="emailEstudante"
          placeholder="Email do estudante"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="matricula"
          placeholder="Matrícula do estudante"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full p-2 text-white rounded"
          style={{ backgroundColor: '#558358' }}
        >
          Cadastrar
        </button>

        {success && <p className="text-green-600 text-center mt-2">Cadastro realizado com sucesso!</p>}
      </form>
    </div>
  );
};

export default FormSection;
