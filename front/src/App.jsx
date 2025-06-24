import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import LayoutComSidebar from './components/LayoutComSidebar';
import Home from './pages/Home';
import Jogo from './pages/Jogo';
import Quiz from './pages/Quiz';
import Loja from './pages/Loja';
import Instituicao from './pages/Instituicao';
import Faq from './pages/Faq';
import Ranking from './pages/Ranking';
import Participar from './pages/Participar';
import QuizDetalhes from "./pages/QuizDetalhes";
import Conselheiro from "./pages/Conselheiro"; 

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route element={<LayoutComSidebar />}>
          <Route path="/home" element={<Home />} />
          <Route path="/jogo" element={<Jogo />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/loja" element={<Loja />} />
          <Route path="/instituicao" element={<Instituicao />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/participar" element={<Participar />} /> 
          <Route path="/quiz/:id" element={<QuizDetalhes />} />
          <Route path="/conselheiro" element={<Conselheiro />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
