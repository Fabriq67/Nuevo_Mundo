import React from 'react';
import '../App.css'; // asegúrate que exista y esté enlazado a Bootstrap

function Inicio() {
  const datos = [
    {
      titulo: '📜 Historia y legado',
      texto:
        'Fundada el 29 de septiembre de 1861, Chugchilán ha sido un eje cultural entre la Costa y la Sierra. Antes parte de Pujilí, se unió a Sigchos en 1992. Su historia refleja la fuerza de una parroquia resiliente, comercial y llena de tradiciones.',
      imagen: '/images/historia.jpg',
    },
    {
      titulo: '🎭 Cultura viva',
      texto:
        'La mayoría de la población es indígena Kichwa. Las tradiciones se manifiestan en su ropa, comida y festividades. La globalización y migración ponen en riesgo su preservación.',
      imagen: '/images/cultura.jpg',
    },
    {
      titulo: '🧭 Turismo y naturaleza',
      texto:
        'Rodeado de paisajes andinos, Chugchilán está cerca de la laguna de Quilotoa. A 2.860 msnm ofrece rutas ecológicas, miradores y experiencias auténticas.',
      imagen: '/images/turismo.jpg',
    },
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5 text-gradient">🌄 Bienvenido a Nuevo Mundo</h1>
       <p className="subtitle text-center">
  Descubre las raíces, cultura y realidad de <strong>Chugchilán</strong> a través de fichas vivas, imágenes reales y generación de contenido cultural.
</p>

      </div>

      <div className="row g-4">
        {datos.map((item, i) => (
          <div key={i} className="col-md-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden transition-card">
              <img
                src={item.imagen}
                alt={item.titulo}
                className="img-fluid object-fit-cover"
                style={{ height: '250px', width: '100%' }}
              />
              <div className="card-body bg-dark text-white">
                <h5 className="card-title fw-semibold">{item.titulo}</h5>
                <p className="card-text small">{item.texto}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

     <footer className="text-center text-light mt-5 pt-3 pb-4 small">
  Hecho con <span className="text-danger">❤️</span> para preservar la identidad de los pueblos.
</footer>
    </div>
  );
}

export default Inicio;
