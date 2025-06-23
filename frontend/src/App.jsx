import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Inicio from './pages/Inicio';
import Cultura from './pages/Cultura';
import Comidas from './pages/Comidas';
import Realidad from './pages/Realidad';
import Chat from './pages/Chat';
import ChatBot from './pages/Chatbot';
import Footer from "./pages/Footer";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/cultura" element={<Cultura />} />
        <Route path="/comidas" element={<Comidas />} />
        <Route path="/realidad" element={<Realidad />} />
        <Route path="/chat" element={<Chat />} />


      </Routes>

      <Footer />
      <ChatBot />
    </>
  );
}

export default App;
