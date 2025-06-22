import React, { useState, useEffect } from "react";
import "./Chatsito.css"; // 👈 Usa el nombre real de tu archivo CSS
import { respuestas } from "./dataChugchilan";

const frasesIntro = [
  "¿Sabías que...?",
  "Este dato te interesará:",
  "Curiosidad:",
  "Tip para tu viaje:",
  "Dato curioso:"
];

export default function ChatBot() {
  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [saludoMostrado, setSaludoMostrado] = useState(true);

  useEffect(() => {
    // Mostrar saludo apenas carga la página
    setMensaje("¡Hola! Soy Carlitos, tu compañero de viaje. Hazme click y te daré tips y datos interesantes de Chugchilán.");
  }, []);

  const toggleChat = () => {
    setVisible(!visible);
    // Si abre la caja, genera un dato real y oculta saludo de intro
    if (!visible) {
      nuevoDato();
      setSaludoMostrado(false);
    }
  };

  const nuevoDato = () => {
    const randomDato = respuestas[Math.floor(Math.random() * respuestas.length)];
    const randomIntro = frasesIntro[Math.floor(Math.random() * frasesIntro.length)];
    setMensaje(`${randomIntro} ${randomDato.respuesta}`);
  };

  return (
    <>
      <div
        className="chat-boton"
        onClick={toggleChat}
        onMouseEnter={() => {
          if (saludoMostrado) {
            setMensaje("¡Hola! Soy Carlitos, tu compañero de viaje. Hazme click para tips y curiosidades de Chugchilán.");
          }
        }}
        title="¡Soy Carlitos! Haz click 😁"
      >
        😊
      </div>

      {visible && (
        <div className="chat-caja">
          <div className="chat-header">✨ Carlitos te cuenta...</div>
          <div className="chat-mensaje">{mensaje}</div>
          <button className="chat-nuevo" onClick={nuevoDato}>
            Dame otro dato
          </button>
        </div>
      )}

      {/* Globito de saludo solo si no has abierto todavía */}
      {saludoMostrado && (
        <div className="chat-globito">
          👋 ¡Hola! Soy Carlitos. Hazme click para tips y datos de Chugchilán.
        </div>
      )}
    </>
  );
}
