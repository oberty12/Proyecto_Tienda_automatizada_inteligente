/** Controlador de inspecciones: planificacion y registro de resultados. */
const pool = require('../config/db');

/** Planificar una nueva inspeccion. */
exports.planInspection = (req, res) => {
  const { fecha_prog, id_recurso, id_producto, id_caracteristica, id_instrumento, hora } = req.body;

  pool.query(
    'INSERT INTO T_PLANIF_INSPE (FECHA_PROG, ID_RECURSO, ID_PRODUCTO, ID_CARACTERISTICA, ID_INSTRUMENTO, HORA) VALUES ($1, $2, $3, $4, $5, $6)',
    [fecha_prog, id_recurso, id_producto, id_caracteristica, id_instrumento, hora],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al programar la inspeccion');
      }
      res.status(201).send('Inspeccion programada');
    }
  );
};

/** Registrar los resultados de la inspeccion. */
exports.registerInspectionResults = (req, res) => {
  const { fecha_result, hora_result, id_producto, id_caracteristica, id_recurso, resultado } = req.body;

  pool.query(
    'INSERT INTO T_REG_RESULT (FECHA_RESULT, HORA_RESULT, ID_PRODUCTO, ID_CARACTERISTICA, ID_RECURSO, RESULTADO) VALUES ($1, $2, $3, $4, $5, $6)',
    [fecha_result, hora_result, id_producto, id_caracteristica, id_recurso, resultado],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al registrar los resultados');
      }
      res.status(201).send('Resultados registrados');
    }
  );
};
