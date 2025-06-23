// routes/cultura.js
const express = require('express');
const router = express.Router();
const db = require('./db');
const multer = require('multer');

// 📂 Configuración de Multer para guardar imágenes en /uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

/**
 * ✅ POST /api/cultura
 * Crea una ficha de cultura con imagen
 */
router.post('/cultura', upload.single('foto'), (req, res) => {
  const { titulo, autor, tipo, contenido } = req.body;
  const foto_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!titulo || !autor || !tipo || !contenido) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const sql = `
    INSERT INTO fichas_cultura (titulo, autor, tipo, contenido, foto_url)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [titulo, autor, tipo, contenido, foto_url], (err, result) => {
    if (err) {
      console.error('❌ Error al crear ficha cultura:', err);
      return res.status(500).json({ error: 'Error al crear ficha cultura' });
    }
    res.json({ message: 'Ficha cultura creada correctamente', id: result.insertId });
  });
});

/**
 * ✅ GET /api/cultura
 * Devuelve todas las fichas o filtra por tipo si se pasa query ?tipo=
 */
router.get('/cultura', (req, res) => {
  const { tipo } = req.query;

  let sql = 'SELECT * FROM fichas_cultura';
  const params = [];

  if (tipo) {
    sql += ' WHERE tipo = ?';
    params.push(tipo);
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error('❌ Error al obtener fichas cultura:', err);
      return res.status(500).json({ error: 'Error al obtener fichas cultura' });
    }
    res.json(result);
  });
});

module.exports = router;
