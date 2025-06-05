// src/pages/Cultura.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function Cultura() {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parroquia, setParroquia] = useState('');
  const [tema, setTema] = useState('');
  const [historia, setHistoria] = useState('');
  const [generando, setGenerando] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/api/personas')
      .then(res => {
        setPersonas(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar personas:', err);
        setLoading(false);
      });
  }, []);

  const generarHistoria = () => {
    if (!parroquia || !tema) return;

    setGenerando(true);
    axios.post('http://localhost:3001/api/generar-historia', { parroquia, tema })
      .then(res => {
        setHistoria(res.data.historia);
        setGenerando(false);
      })
      .catch(err => {
        console.error('Error generando historia:', err);
        setGenerando(false);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-danger mb-4 border-bottom pb-2">
        ☠ CÓDICE DE CHUGCHILÁN ☠
      </h1>

      <div className="card bg-dark text-light mb-5 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-danger text-center">Generar historia cultural</h2>
          <div className="row g-2">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control bg-secondary text-white"
                placeholder="Parroquia..."
                value={parroquia}
                onChange={e => setParroquia(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control bg-secondary text-white"
                placeholder="Tema cultural..."
                value={tema}
                onChange={e => setTema(e.target.value)}
              />
            </div>
          </div>
          <div className="text-center mt-3">
            <button
              className="btn btn-danger px-4"
              onClick={generarHistoria}
              disabled={generando}
            >
              {generando ? 'Generando...' : 'Crear Historia'}
            </button>
          </div>

          {historia && (
            <div className="mt-4 p-3 border-start border-danger border-3 bg-black rounded text-light">
              <p className="fst-italic m-0">{historia}</p>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <p className="text-center text-muted">Cargando códice ancestral...</p>
      ) : (
        <div className="row">
          {personas.map(p => (
            <div className="col-md-4 mb-4" key={p.id}>
              <div className="card h-100 bg-dark text-light border-secondary shadow-sm">
                <img
                  src={p.foto_url}
                  className="card-img-top"
                  alt={p.nombre}
                  style={{ height: '220px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-warning">{p.nombre}</h5>
                  <p className="card-text"><em>Edad:</em> {p.edad} · <em>Comunidad:</em> {p.comunidad}</p>
                  <p className="card-text small">{p.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cultura;
