require('dotenv').config();  // Esto cargará las variables del archivo .env



const { Pool } = require('pg');


// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123456789',
  port: 5433
});

module.exports = pool;
