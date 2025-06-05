// === BACKEND (server.js o index.js) ===
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// Obtener personas
app.get('/api/personas', (req, res) => {
  db.query('SELECT * FROM personas', (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener personas' });
    res.json(result);
  });
});

// Obtener entrevistas
app.get('/api/personas/:id/entrevistas', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM entrevistas WHERE persona_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener entrevistas' });
    res.json(result);
  });
});

// Obtener multimedia
app.get('/api/entrevistas/:id/multimedia', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM multimedia WHERE entrevista_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener multimedia' });
    res.json(result);
  });
});

// Generar historia compleja y procedural
app.post('/api/generar-historia', (req, res) => {
  const { parroquia, tema } = req.body;
  console.log('👉 Recibido:', parroquia, tema);

  if (!parroquia || !tema || parroquia.trim() === '' || tema.trim() === '') {
    return res.status(400).json({ error: 'Parroquia y tema son requeridos.' });
  }

  const generarHistoriaCompleja = (parroquia, tema) => {
    const inicios = [
      `En la mítica tierra de ${parroquia}, donde las montañas hablan y los ríos cantan,`,
      `Desde los albores del tiempo en ${parroquia}, las estrellas susurraban sobre ${tema}.`,
      `Cuentan los abuelos que en ${parroquia}, el alma del pueblo se tejía con ${tema}.`,
    ];

    const conflictos = [
      `${tema} fue casi olvidado cuando la modernidad tocó las puertas de la comunidad.`,
      `Durante la colonización, ${tema} fue prohibido, pero sobrevivió en secreto.`,
      `${tema} fue desafiado por nuevas generaciones que no comprendían su valor.`,
    ];

    const acciones = [
      `Los sabios lo escondieron en canciones, bordados y rituales ancestrales.`,
      `Se transmitió a través de leyendas contadas bajo la luna llena.`,
      `Fue rescatado en una fiesta en honor a la tierra, donde el pueblo se unió una vez más.`,
    ];

    const finales = [
      `Hoy, ${tema} resurge con fuerza en las voces y pasos de las nuevas generaciones.`,
      `El códice de ${parroquia} lo guarda con celo, para nunca volver a perderlo.`,
      `Y así, ${tema} sigue vivo en cada gesto, cada palabra, cada mirada.`,
    ];

    const rand = arr => arr[Math.floor(Math.random() * arr.length)];
    return `${rand(inicios)} ${rand(conflictos)} ${rand(acciones)} ${rand(finales)}`;
  };

  const historia = generarHistoriaCompleja(parroquia, tema);
  res.json({ historia });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
