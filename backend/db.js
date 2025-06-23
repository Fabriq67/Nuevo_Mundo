const mysql = require('mysql2');
// require('dotenv').config(); // Opcional: no usar .env si quieres forzar local

const db = mysql.createPool({
  host: 'localhost',      // 👉 Forzado a local
  user: 'root',
  password: 'root',
  database: 'enciclopedia_chugchilan',
  port: 3306
});

module.exports = db;
