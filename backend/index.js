require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// 👇 Las rutas SIN carpeta routes
const authRoutes = require('./auth');
const comidasRoutes = require('./comidas');
const fichasRoutes = require('./cultura'); // o ./cultura si cambias el nombre

app.use('/api', authRoutes);
app.use('/api', comidasRoutes);
app.use('/api', fichasRoutes); // o culturaRoutes

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
