import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Inicio from './pages/Inicio';
import Cultura from './pages/Cultura';
import Comidas from './pages/Comidas';
import Actividades from './pages/Actividades';
import Realidad from './pages/Realidad';



export default App;


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/cultura" element={<Cultura />} />
        <Route path="/comidas" element={<Comidas />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/realidad" element={<Realidad />} />
      </Routes>
    </>
  );
}
