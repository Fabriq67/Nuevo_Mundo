import React from 'react';
import '../App.css';
import imgHistoria from '../assets/images/historia.jpg';
import imgCultura from '../assets/images/cultura.jpg';
import imgTurismo from '../assets/images/turismo.jpg';
import { Link } from 'react-router-dom';


function Inicio() {
  const datos = [
    {
      titulo: '📜 Historia y legado',
      texto:
        'Fundada el 29 de septiembre de 1861, Chugchilán ha sido un eje cultural entre la Costa y la Sierra. Antes parte de Pujilí, se unió a Sigchos en 1992. Su historia refleja la fuerza de una parroquia resiliente, comercial y llena de tradiciones.',
      imagen: imgHistoria,
    },
    {
      titulo: '🎭 Cultura viva',
      texto:
        'La mayoría de la población es indígena Kichwa. Las tradiciones se manifiestan en su ropa, comida y festividades. La globalización y migración ponen en riesgo su preservación.',
      imagen: imgCultura,
    },
    {
      titulo: '🧭 Turismo y naturaleza',
      texto:
        'Rodeado de paisajes andinos, Chugchilán está cerca de la laguna de Quilotoa. A 2.860 msnm ofrece rutas ecológicas, miradores y experiencias auténticas.',
      imagen: imgTurismo,
    },
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-4 text-success mb-3">
          🌄 Bienvenido a <span className="text-underline">Nuevo Mundo</span>
        </h1>
        <p className="lead text-light">
          Un espacio para redescubrir las raíces de <strong>Chugchilán</strong>, sus enseñanzas, paisajes y memorias vivas.
        </p>
              <Link to="/chat" className="btn btn-success btn-lg mt-3 px-4 shadow-sm">
        🤖 Chat Cultural
      </Link>
      </div>

      <div className="row g-4" id="cultura">
        {datos.map((item, i) => (
          <div key={i} className="col-md-4">
            <div className="card h-100 custom-card text-white">
              <img
                src={item.imagen}
                alt={item.titulo}
                className="card-img-top"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body bg-dark">
                <h5 className="card-title fw-bold">{item.titulo}</h5>
                <p className="card-text">{item.texto}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="text-center mt-5 pt-4 pb-3">
        <small>Hecho con <span className="text-danger">❤️</span> para preservar la identidad de los pueblos.</small>
      </footer>
    </div>
  );
}

export default Inicio;
