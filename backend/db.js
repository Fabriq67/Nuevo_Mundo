const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
  } else {
    console.log('✅ Conexión exitosa a la base de datos.');
  }
});

module.exports = db;
