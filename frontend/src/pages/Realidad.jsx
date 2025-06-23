import React from "react";
import "./Realidad.css";

// === DATA: línea de tiempo ===
const timelineData = [
  {
    year: "1861",
    title: "Fundación",
    text: "Chugchilán se consolida como caserío agrícola dependiente de grandes haciendas. La tierra pertenece a pocos terratenientes.",
    image: "/images/fundacion.png"   // 👈 usa ruta raíz para Vite o React
  },
  {
    year: "1900",
    title: "Huasipungo y explotación",
    text: "Campesinos indígenas trabajan bajo huasipungo: pequeña parcela, servidumbre disfrazada, abuso y deudas perpetuas.",
    image: "/images/1900.jpg"
  },
  {
    year: "1964",
    title: "Reforma Agraria",
    text: "La Reforma Agraria del Ecuador redistribuye tierras. En Chugchilán surgen disputas y resistencia, pero muchas familias logran titular sus terrenos.",
    image: "/images/1964.jpg"
  },
  {
    year: "1980",
    title: "Migración masiva",
    text: "Hombres migran a ciudades o extranjero, dejando a mujeres a cargo de la tierra y crianza de hijos.",
    image: "/images/1980.jpg"
  },
  {
    year: "2025",
    title: "Esperanza comunitaria",
    text: "Proyectos de turismo rural, rescate cultural y organización de mujeres impulsan desarrollo y preservación de la identidad.",
    image: "/images/2025.jpg"
  }
];

export default function Realidad() {
  return (
    <div className="timeline-container">
      <h1 className="timeline-title">REALIDAD DE CHUGCHILÁN</h1>

      <div className="timeline-line"></div> {/* La línea vertical */}

      <div className="timeline">
        {timelineData.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot"></div>

            <div className="timeline-content">
              <img
                src={item.image}
                alt={item.title}
                className="timeline-image"
              />

              <div className="timeline-text">
                <h3>{item.year}</h3>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
