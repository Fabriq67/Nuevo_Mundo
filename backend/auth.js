// routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');

// REGISTRO
router.post('/register', async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  if (!correo.endsWith('@puce.edu.ec')) {
    return res.status(400).json({ error: 'El correo debe ser institucional (@puce.edu.ec)' });
  }

  const hash = await bcrypt.hash(contrasena, 10);

  db.query(
    'INSERT INTO usuarios (correo, contrasena) VALUES (?, ?)',
    [correo, hash],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'El correo ya está registrado' });
        }
        console.error(err);
        return res.status(500).json({ error: 'Error al registrar usuario' });
      }
      res.json({ message: 'Usuario registrado correctamente', id: result.insertId });
    }
  );
});

// LOGIN
router.post('/login', (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en la base de datos' });
    if (results.length === 0) return res.status(401).json({ error: 'Correo no registrado' });

    const user = results[0];
    const match = await bcrypt.compare(contrasena, user.contrasena);

    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

    res.json({
      message: 'Login correcto',
      user: {
        id: user.id,
        correo: user.correo
      }
    });
  });
});

module.exports = router;
