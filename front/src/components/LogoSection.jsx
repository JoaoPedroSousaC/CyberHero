import React from 'react';
import logo from '../assets/logo.png'; // caminho para sua imagem

const LogoSection = () => (
  <div
    className="w-[450px] h-full flex items-center justify-center"
    style={{ backgroundColor: '#558358' }}
  >
    <img src={logo} alt="Logo" className="w-80 h-auto" />
  </div>
);

export default LogoSection;
