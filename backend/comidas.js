// comidas.js
const express = require('express');
const router = express.Router();
const db = require('./db');
const multer = require('multer');

// 📂 Multer para subir foto de plato
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

/**
 * ✅ POST /api/comidas
 * Crea una ficha de comida con imagen
 */
router.post('/comidas', upload.single('foto'), (req, res) => {
  const { nombre, descripcion } = req.body;
  const foto_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const sql = `
    INSERT INTO fichas_comida (nombre, descripcion, foto_url)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [nombre, descripcion, foto_url], (err, result) => {
    if (err) {
      console.error('❌ Error al crear ficha comida:', err);
      return res.status(500).json({ error: 'Error al crear ficha comida' });
    }
    res.json({ message: 'Ficha comida creada correctamente', id: result.insertId });
  });
});

/**
 * ✅ GET /api/comidas
 * Devuelve todas las fichas de comida
 */
router.get('/comidas', (req, res) => {
  db.query('SELECT * FROM fichas_comida', (err, result) => {
    if (err) {
      console.error('❌ Error al obtener fichas comida:', err);
      return res.status(500).json({ error: 'Error al obtener fichas comida' });
    }
    res.json(result);
  });
});

module.exports = router;
