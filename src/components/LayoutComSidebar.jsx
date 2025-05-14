import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Home,
  Gamepad2,
  Brain,
  Store,
  School,
  HelpCircle,
  Trophy,
  Menu,
  X,
  MessageCircleHeart,
} from "lucide-react";

const LayoutComSidebar = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => setMenuAberto(!menuAberto);

  const links = [
    { to: "/home", label: "Início", icon: <Home size={18} /> },
    { to: "/jogo", label: "Jogar agora!", icon: <Gamepad2 size={18} /> },
    { to: "/quiz", label: "Quiz & Desafios", icon: <Brain size={18} /> },
    { to: "/loja", label: "Loja", icon: <Store size={18} /> },
    { to: "/instituicao", label: "Responsáveis/Instituições", icon: <School size={18} /> },
    { to: "/ranking", label: "Ranking", icon: <Trophy size={18} /> },
    { to: "/faq", label: "FAQ", icon: <HelpCircle size={18} /> },
    { to: "/conselheiro", label: "Conselheiro", icon: <MessageCircleHeart size={18} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Menu Mobile */}
      <div className="bg-[#558358] text-white md:hidden p-4 flex justify-between items-center">
        <img src="/src/assets/logo.png" alt="Logo" className="w-10 h-10" />
        <button onClick={toggleMenu}>{menuAberto ? <X /> : <Menu />}</button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-[#558358] text-white w-64 p-6 rounded-r-2xl flex flex-col justify-between
        ${menuAberto ? "block" : "hidden"} md:block`}
      >
        <div>
          <div className="flex justify-center mb-8">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="w-24 h-24 object-contain"
            />
          </div>
          <nav className="space-y-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 hover:underline"
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Conteúdo dinâmico */}
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutComSidebar;
