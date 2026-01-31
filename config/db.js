/** Configuracion de la conexion a la base de datos Postgres. */
require('dotenv').config(); // Carga las variables desde .env

const { Pool } = require('pg');

/** Pool de conexiones reutilizable para las consultas. */
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123456789',
  port: 5433
});

module.exports = pool;
