const pool = require('../config/db');

// Registrar una venta
exports.registerSale = (req, res) => {
  const { producto_id, cantidad, cliente, notas } = req.body || {};

  if (!producto_id || !cantidad || !cliente) {
    return res.status(400).send('Faltan datos de la venta');
  }

  const query = `
    INSERT INTO T_VENTAS (ID_PRODUCTO, CANTIDAD, CLIENTE, NOTAS, FECHA_VENTA)
    VALUES ($1, $2, $3, $4, NOW())
    RETURNING ID_VENTA
  `;

  pool.query(query, [producto_id, cantidad, cliente, notas || null], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al registrar la venta (verifique la tabla T_VENTAS)');
    }
    res.status(201).send('Venta registrada');
  });
};
