import { useEffect, useState } from 'react';
import axios from 'axios';
import './Comidas.css';

function Comidas() {
  const [platos, setPlatos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [leyenda, setLeyenda] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/api/comidas')
      .then(res => setPlatos(res.data))
      .catch(err => console.error('❌ Error al cargar comidas:', err));
  }, []);

  const generarLeyenda = async () => {
    if (!seleccionado) return;

    setCargando(true);
    setLeyenda('');

    try {
      const res = await axios.post('http://localhost:3001/api/comidas/leyenda', {
        nombre: seleccionado.nombre,
        descripcion: seleccionado.descripcion
      });
      setLeyenda(res.data.leyenda);
    } catch (err) {
      console.error(err);
      setLeyenda('Error al generar leyenda.');
    }

    setCargando(false);
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="text-center text-success mb-5 border-bottom pb-2">🍲 Gastronomía de Chugchilán</h2>

      <div className="row g-4">
        {platos.map(p => (
          <div key={p.id} className="col-md-4">
            <div className="card bg-dark text-white h-100 shadow border border-secondary" onClick={() => {
              setSeleccionado(p);
              setLeyenda('');
            }} style={{ cursor: 'pointer' }}>
              <img src={p.foto_url} className="card-img-top" alt={p.nombre} style={{ height: '230px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title text-warning">{p.nombre}</h5>
                <p className="card-text">{p.descripcion.slice(0, 100)}...</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalle */}
      {seleccionado && (
        <div className="modal-ficha">
          <div className="modal-content-ficha">
            <h4 className="text-success">{seleccionado.nombre}</h4>
            <p><strong>Descripción:</strong> {seleccionado.descripcion}</p>

            <button className="btn btn-warning mt-3" onClick={generarLeyenda}>
              {cargando ? 'Generando...' : '🌽 Generar leyenda ancestral'}
            </button>

            {leyenda && (
              <div className="mt-4 border-top pt-3">
                <h5 className="text-info">Leyenda de la IA:</h5>
                <p className="fst-italic">{leyenda}</p>
              </div>
            )}

            <button className="btn btn-danger mt-4" onClick={() => setSeleccionado(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comidas;
