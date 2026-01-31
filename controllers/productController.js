/** Controlador de productos: alta y consulta de productos. */
const pool = require('../config/db');

/** Registrar un nuevo producto (incluye cantidad y agregado_por si existen columnas). */
exports.registerProduct = (req, res) => {
  const { producto, cantidad, agregado_por } = req.body || {};

  if (!producto) {
    return res.status(400).send('Falta el nombre del producto');
  }

  const qty = cantidad ? Number(cantidad) : null;
  const addedBy = agregado_por || null;

  const insertFull = 'INSERT INTO T_PRODUCTOS (PRODUCTO, CANTIDAD, AGREGADO_POR) VALUES ($1, $2, $3)';
  const insertMinimal = 'INSERT INTO T_PRODUCTOS (PRODUCTO) VALUES ($1)';

  // Intentar insertar con columnas extendidas; si no existen, caer al esquema básico
  pool.query(insertFull, [producto, qty, addedBy], (err) => {
    if (err && err.code === '42703') {
      // Columna no existe, insertar solo producto
      return pool.query(insertMinimal, [producto], (err2) => {
        if (err2) {
          console.error(err2);
          return res.status(500).send('Error al registrar el producto');
        }
        return res.status(201).send('Producto registrado (sin columnas extra)');
      });
    }
    if (err) {
      console.error(err);
      return res.status(500).send('Error al registrar el producto');
    }
    res.status(201).send('Producto registrado');
  });
};

/** Obtener todos los productos. */
exports.getAllProducts = (req, res) => {
  pool.query('SELECT * FROM T_PRODUCTOS', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al obtener productos');
    }
    res.status(200).json(result.rows);
  });
};
