const express = require('express');
const router = express.Router();
const db = require('./db');
const fetch = require('node-fetch');

// Obtener comidas
router.get('/comidas', (req, res) => {
  db.query('SELECT * FROM comidas', (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener comidas' });
    res.json(result);
  });
});

// Generar leyenda con IA
router.post('/comidas/leyenda', async (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Faltan datos del plato.' });
  }

  const prompt = `Escribe una leyenda mística y cultural sobre el plato tradicional ecuatoriano llamado "${nombre}". Basado en la siguiente descripción: "${descripcion}". Utiliza un tono ancestral, como un relato oral contado por un abuelo indígena.`;

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
          { role: 'system', content: 'Eres un narrador de leyendas gastronómicas andinas.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    const data = await response.json();
    const leyenda = data.choices?.[0]?.message?.content;

    if (!leyenda) return res.status(500).json({ leyenda: 'La IA no generó respuesta.' });

    res.json({ leyenda });
  } catch (error) {
    console.error('❌ Error al generar leyenda:', error);
    res.status(500).json({ leyenda: 'Error al usar la IA' });
  }
});

module.exports = router;
