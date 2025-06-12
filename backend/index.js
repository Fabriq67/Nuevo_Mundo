require('dotenv').config(); // Cargar variables desde .env
console.log("🔑 API KEY:", process.env.OPENROUTER_API_KEY); // Verifica que se esté leyendo

const express = require('express');
const cors = require('cors');
const db = require('./db');
const fetch = require('node-fetch');

const app = express();
app.use(cors({
  origin: 'https://cultura.vinculaciontaytachugchilan.org',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// RUTA: Obtener personas
app.get('/api/personas', (req, res) => {
  db.query('SELECT * FROM personas', (err, result) => {
    if (err) {
      console.error("❌ ERROR AL CONECTAR CON DB:", err); // 👈 Esto imprime el error real
      return res.status(500).json({ error: 'Error al obtener personas' });
    }
    res.json(result);
  });
});


// RUTA: Obtener entrevistas por persona
app.get('/api/personas/:id/entrevistas', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM entrevistas WHERE persona_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener entrevistas' });
    res.json(result);
  });
});

// RUTA: Obtener multimedia por entrevista
app.get('/api/entrevistas/:id/multimedia', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM multimedia WHERE entrevista_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener multimedia' });
    res.json(result);
  });
});

// RUTA: Generar historia IA
app.post('/api/generar-historia', async (req, res) => {
  const { parroquia, tema } = req.body;

  if (!parroquia || !tema) {
    return res.status(400).json({ error: 'Faltan datos.' });
  }

  const prompt = `Eres un sabio narrador andino. Escribe una historia corta, ancestral y poética inspirada en la parroquia de ${parroquia}, sobre el tema: "${tema}".`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          { role: 'system', content: 'Eres un narrador cultural andino que escribe relatos breves con sabiduría ancestral.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    const data = await response.json();
    const texto = data.choices?.[0]?.message?.content;

    if (!texto) {
      console.error('❌ La IA no devolvió texto:', data);
      return res.status(500).json({ historia: 'La IA no generó respuesta. Intenta nuevamente.' });
    }

    res.json({ historia: texto });

  } catch (error) {
    console.error('❌ Error con OpenRouter:', error);
    res.status(500).json({ historia: 'Fallo al generar historia con IA.' });
  }
});

// Importar rutas adicionales
const comidasRoutes = require('./comidas');
app.use('/api', comidasRoutes);

const chatRoutes = require('./chat');
app.use('/api', chatRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});

