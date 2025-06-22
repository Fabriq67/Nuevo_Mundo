import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Inicio from './pages/Inicio';
import Cultura from './pages/Cultura';
import Comidas from './pages/Comidas';
import Realidad from './pages/Realidad';
import Chat from './pages/Chat'; // Página de chat manual, si la usas
import ChatBot from './pages/ChatBot'; // ✅ El flotante siempre visible

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/cultura" element={<Cultura />} />
        <Route path="/comidas" element={<Comidas />} />
        <Route path="/realidad" element={<Realidad />} />
        <Route path="/chat" element={<Chat />} /> {/* Si es una página específica */}
      </Routes>

      <ChatBot /> {/* ✅ SIEMPRE VISIBLE EN TODAS LAS PESTAÑAS */}
    </>
  );
}

export default App;
