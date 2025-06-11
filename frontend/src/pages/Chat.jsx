import { useState } from 'react';
import axios from 'axios';

function Chat() {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const manejarPregunta = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/chatbot', { pregunta });
      setRespuesta(res.data.respuesta);
    } catch (error) {
      setRespuesta('Error al conectar con el servidor 😕');
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
        <button className="btn btn-success" onClick={manejarPregunta}>Preguntar</button>
        {respuesta && (
          <div className="alert alert-info mt-3">{respuesta}</div>
        )}
      </div>
    </div>
  );
}

export default Chat;
