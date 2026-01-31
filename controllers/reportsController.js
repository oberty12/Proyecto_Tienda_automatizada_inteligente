/** Controlador de reportes: ventas detalladas y totales por producto. */
const pool = require('../config/db');

/** Reporte detallado de ventas. */
exports.getSales = (req, res) => {
  const { from, to } = req.query;
  const params = [];
  let where = '';

  if (from) {
    params.push(from);
    where += params.length === 1 ? 'WHERE v.fecha_venta >= $1' : ` AND v.fecha_venta >= $${params.length}`;
  }
  if (to) {
    params.push(to);
    where += params.length === 1 ? 'WHERE v.fecha_venta <= $1' : ` AND v.fecha_venta <= $${params.length}`;
  }

  const query = `
    SELECT v.id_venta, v.id_producto, p.producto, v.cantidad, v.cliente, v.fecha_venta, v.notas
    FROM T_VENTAS v
    LEFT JOIN T_PRODUCTOS p ON p.id_producto = v.id_producto
    ${where}
    ORDER BY v.fecha_venta DESC NULLS LAST, v.id_venta DESC
  `;

  pool.query(query, params, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al generar reporte de ventas (verifique T_VENTAS)');
    }
    res.json(result.rows || []);
  });
};

/** Reporte de ingresos (unidades vendidas) por producto. */
exports.getProductIncome = (req, res) => {
  const { from, to } = req.query;
  const params = [];
  let where = '';

  if (from) {
    params.push(from);
    where += params.length === 1 ? 'WHERE v.fecha_venta >= $1' : ` AND v.fecha_venta >= $${params.length}`;
  }
  if (to) {
    params.push(to);
    where += params.length === 1 ? 'WHERE v.fecha_venta <= $1' : ` AND v.fecha_venta <= $${params.length}`;
  }

  const query = `
    SELECT v.id_producto, COALESCE(p.producto, 'Producto') AS producto,
           SUM(v.cantidad) AS total_unidades,
           COUNT(*) AS total_ventas
    FROM T_VENTAS v
    LEFT JOIN T_PRODUCTOS p ON p.id_producto = v.id_producto
    ${where}
    GROUP BY v.id_producto, p.producto
    ORDER BY total_unidades DESC NULLS LAST
  `;

  pool.query(query, params, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al generar reporte de productos (verifique T_VENTAS)');
    }
    res.json(result.rows || []);
  });
};
