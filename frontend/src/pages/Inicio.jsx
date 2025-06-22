import React, { useState } from 'react';
import '../App.css';
import imgHistoria from '../assets/images/historia.jpg';
import imgCultura from '../assets/images/cultura.jpg';
import imgTurismo from '../assets/images/turismo.jpg';

function Inicio() {
  const datos = [
    {
      titulo: 'Historia y Legado',
      texto:
        'Fundada el 29 de septiembre de 1861, Chugchilán ha sido un eje cultural entre la Costa y la Sierra. Antes parte de Pujilí, se unió a Sigchos en 1992. Su historia refleja la fuerza de una parroquia resiliente, comercial y llena de tradiciones.',
      imagen: imgHistoria,
    },
    {
      titulo: 'Cultura Viva',
      texto:
        'La mayoría de la población es indígena Kichwa. Las tradiciones se manifiestan en su ropa, comida y festividades. La globalización y migración ponen en riesgo su preservación.',
      imagen: imgCultura,
    },
    {
      titulo: 'Turismo y Naturaleza',
      texto:
        'Rodeado de paisajes andinos, Chugchilán está cerca de la laguna de Quilotoa. A 2.860 msnm ofrece rutas ecológicas, miradores y experiencias auténticas.',
      imagen: imgTurismo,
    },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="hero">
        <h1 className="main-title">Nuevo Mundo</h1>
        <p className="lead-sub">Redescubre la esencia de Chugchilán, su legado y su cultura viva.</p>
      </div>

      <div className="panels">
        {datos.map((item, i) => (
          <div
            key={i}
            className={`panel ${selected === i ? 'active' : ''}`}
            style={{ backgroundImage: `url(${item.imagen})` }}
            onClick={() => setSelected(i)}
          >
            <div className="overlay">{item.titulo}</div>
          </div>
        ))}
      </div>

      {selected !== null && (
        <div className="detail">
          <button onClick={() => setSelected(null)}>Cerrar</button>
          <h2>{datos[selected].titulo}</h2>
          <p>{datos[selected].texto}</p>
        </div>
      )}
    </>
  );
}

export default Inicio;
