import { useState, useEffect } from 'react';
import axios from 'axios';
import './Cultura.css';

const API_BASE_URL = import.meta.env.VITE_API_URL;

function Cultura() {
  const [personas, setPersonas] = useState([]);
  const [fichas, setFichas] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [historiaIA, setHistoriaIA] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    // Traer PERSONAS
    axios.get(`${API_BASE_URL}/api/personas`)
      .then(res => setPersonas(res.data))
      .catch(err => console.error('❌ Error al cargar personas:', err));

    // Traer FICHAS CULTURALES
    axios.get(`${API_BASE_URL}/api/fichas?tipo=cultura`)
      .then(res => setFichas(res.data))
      .catch(err => console.error('❌ Error al cargar fichas:', err));
  }, []);

  const generarHistoriaIA = async () => {
    if (!seleccionado) return;
    setCargando(true);
    setHistoriaIA('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/generar-historia`, {
        parroquia: 'Chugchilán',
        tema: seleccionado.descripcion || 'sabiduría ancestral'
      });

      setHistoriaIA(response.data.historia);
    } catch (error) {
      setHistoriaIA('Error al generar historia.');
      console.error(error);
    }

    setCargando(false);
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="text-center text-danger mb-5 border-bottom pb-2">☀ Códice Cultural ☀</h2>

      {/* 📜 Sección de PERSONAS */}
      <h4 className="text-info">Personas y relatos IA</h4>
      <div className="row g-4 mb-5">
        {personas.map(p => (
          <div key={p.id} className="col-md-4">
            <div
              className="card bg-dark text-white h-100 shadow-lg border border-secondary"
              onClick={() => {
                setSeleccionado(p);
                setHistoriaIA('');
              }}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={`/images/${p.foto_url}`}
                className="card-img-top"
                alt={p.nombre}
                style={{ height: '230px', objectFit: 'cover' }}
              />

              <div className="card-body">
                <h5 className="card-title text-warning">{p.nombre}</h5>
                <p className="card-text fst-italic">{p.descripcion?.substring(0, 60)}...</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 📜 Sección de FICHAS CULTURALES */}
      <h4 className="text-info">Fichas culturales registradas</h4>
      <div className="row g-4">
        {fichas.length === 0 ? (
          <p>No hay fichas culturales aún.</p>
        ) : (
          fichas.map(f => (
            <div key={f.id} className="col-md-4">
              <div className="card bg-dark text-white h-100 shadow-lg border border-success">
                <img
                  src={`${API_BASE_URL}/${f.imagen_url}`}
                  className="card-img-top"
                  alt={f.titulo}
                  style={{ height: '230px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-success">{f.titulo}</h5>
                  <p className="card-text">{f.descripcion?.substring(0, 100)}...</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Persona + Historia IA */}
      {seleccionado && (
        <div className="modal-ficha">
          <div className="modal-content-ficha">
            <h4 className="text-danger">{seleccionado.nombre}</h4>
            <p><strong>Edad:</strong> {seleccionado.edad}</p>
            <p><strong>Comunidad:</strong> {seleccionado.comunidad}</p>
            <hr />
            <p><strong>Biografía:</strong></p>
            <p className="fst-italic">{seleccionado.descripcion}</p>

            <button className="btn btn-warning mt-3" onClick={generarHistoriaIA}>
              {cargando ? 'Generando...' : '🪶 Generar historia IA'}
            </button>

            {historiaIA && (
              <div className="mt-4 border-top pt-3">
                <h5 className="text-info">Relato generado por la IA:</h5>
                <p className="fst-italic">{historiaIA}</p>
              </div>
            )}

            <button className="btn btn-danger mt-4" onClick={() => setSeleccionado(null)}>Cerrar códice</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cultura;
