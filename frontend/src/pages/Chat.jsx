import { useState } from 'react';
import axios from 'axios';

function Chat() {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const API = import.meta.env.VITE_API_URL; // ✅ Usamos la URL de producción

  const manejarPregunta = async () => {
    try {
      const res = await axios.post(`${API}/api/chatbot`, { pregunta });
      setRespuesta(res.data.respuesta);
    } catch (error) {
      setRespuesta('Error al conectar con el servidor 😕');
      console.error('❌ Error en la petición al backend:', error);
    }
  };

  return (
    <div className="container text-light py-5">
      <h2 className="text-center text-info mb-4">🤖 Chat Cultural de Chugchilán</h2>
      <div className="card bg-dark p-4 shadow-lg">
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Escribe tu pregunta..."
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
        />
        <button className="btn btn-success" onClick={manejarPregunta}>
          Preguntar
        </button>
        {respuesta && (
          <div className="alert alert-info mt-3">{respuesta}</div>
        )}
      </div>
    </div>
  );
}

export default Chat;
