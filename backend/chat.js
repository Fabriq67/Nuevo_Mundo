const express = require('express');
const router = express.Router();

const respuestas = [
  {
    palabrasClave: ["dónde", "ubicación", "lugar", "localización", "sitio", "ubicado"],
    respuesta: "Chugchilán está en la provincia de Cotopaxi, en el cantón Sigchos.",
  },
  {
    palabrasClave: ["cómo llegar", "llegar", "ruta", "camino", "transporte", "viajar"],
    respuesta: "Puedes llegar desde Latacunga o desde Quito vía Zumbahua o Sigchos.",
  },
  {
    palabrasClave: ["tiempo", "duración", "cuánto tarda", "horas", "hora", "distancia"],
    respuesta: "Aproximadamente 4 a 5 horas en bus desde Quito.",
  },
  {
    palabrasClave: ["idioma", "lengua", "hablan", "idiomas"],
    respuesta: "Principalmente se habla español y kichwa en algunas comunidades.",
  },
  {
    palabrasClave: ["comida", "gastronomía", "platos típicos", "dónde comer"],
    respuesta: "La gastronomía local incluye mote, cuy, papas y quesillo, además de comida típica andina.",
  },
  {
    palabrasClave: ["altura", "altitud", "metros sobre el nivel del mar"],
    respuesta: "Chugchilán está a aproximadamente 3,100 metros sobre el nivel del mar.",
  },
  {
    palabrasClave: ["historia", "origen", "fundación", "antecedentes"],
    respuesta: "Chugchilán tiene una rica historia relacionada con las culturas indígenas andinas.",
  },
  {
    palabrasClave: ["turismo", "lugares", "visitar", "atracciones"],
    respuesta: "Puedes visitar la Laguna de Quilotoa, miradores, rutas ecológicas y comunidades locales.",
  }
  // Puedes seguir agregando más...
];

router.post('/chatbot', (req, res) => {
  const pregunta = req.body.pregunta?.toLowerCase();

  if (!pregunta) return res.status(400).json({ respuesta: "Pregunta vacía" });

  const encontrada = respuestas.find(r =>
    r.palabrasClave.some(p => pregunta.includes(p))
  );

  res.json({
    respuesta: encontrada?.respuesta || "No tengo una respuesta para esa pregunta 😕"
  });
});

module.exports = router;
