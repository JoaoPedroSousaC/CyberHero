import React, { useState } from 'react';

const InfoCard = ({ titulo, descricao, detalhes, icone: Icone }) => {
  const [mostrarMais, setMostrarMais] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex-1 min-w-[250px] max-w-[350px]">
      <div className="flex items-center space-x-3 mb-2">
        <Icone className="text-[#558358]" size={28} />
        <h3 className="text-lg font-semibold text-gray-800">{titulo}</h3>
      </div>
      <p className="text-gray-600 text-sm">
        {mostrarMais ? detalhes : descricao}
      </p>
      <button
        onClick={() => setMostrarMais(!mostrarMais)}
        className="mt-3 text-sm font-medium text-[#558358] hover:underline"
      >
        {mostrarMais ? 'Mostrar menos' : 'Saber mais'}
      </button>
    </div>
  );
};

export default InfoCard;
