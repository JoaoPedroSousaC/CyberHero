import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Gamepad2, HelpCircle, Store, Users, Trophy } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#558358] text-white p-6 rounded-tr-3xl rounded-br-3xl flex flex-col justify-between">
      <div>
        {/* Logo */}
        <img src="src/assets/logo.png" alt="Logo" className="w-32 mb-10" />

        {/* Navegação */}
        <nav className="space-y-4">
          <Link to="/home" className="block hover:underline">
            <Home className="inline mr-2" /> Início
          </Link>
          <Link to="/jogo" className="block hover:underline">
            <Gamepad2 className="inline mr-2" /> Jogar agora!
          </Link>
          <Link to="/quiz" className="block hover:underline">
            <HelpCircle className="inline mr-2" /> Quiz & Desafios
          </Link>
          <Link to="/loja" className="block hover:underline">
            <Store className="inline mr-2" /> Loja
          </Link>
          <Link to="/instituicao" className="block hover:underline">
            <Users className="inline mr-2" /> Responsáveis/Instituição
          </Link>
          <Link to="/faq" className="block hover:underline">
            <HelpCircle className="inline mr-2" /> FAQ
          </Link>
          <Link to="/ranking" className="block hover:underline">
            <Trophy className="inline mr-2" /> Ranking
          </Link>
          
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
