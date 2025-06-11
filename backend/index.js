const express = require('express');
const cors = require('cors');
const db = require('./db');
const fetch = require('node-fetch');
require('dotenv').config();

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

// Obtener entrevistas por persona
app.get('/api/personas/:id/entrevistas', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM entrevistas WHERE persona_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener entrevistas' });
    res.json(result);
  });
});

// Obtener multimedia por entrevista
app.get('/api/entrevistas/:id/multimedia', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM multimedia WHERE entrevista_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener multimedia' });
    res.json(result);
  });
});

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
        'Authorization': 'Bearer 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',
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


// Arrancar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});

const comidasRoutes = require('./comidas');
app.use('/api', comidasRoutes);

const chatRoutes = require('./chat');
app.use('/api', chatRoutes);
