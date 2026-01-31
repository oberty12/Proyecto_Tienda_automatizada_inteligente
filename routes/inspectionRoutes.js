const express = require('express');
const router = express.Router();
const inspectionController = require('../controllers/inspectionController');

// Rutas para planificar inspección y registrar resultados
router.post('/plan', inspectionController.planInspection);
router.post('/result', inspectionController.registerInspectionResults);

module.exports = router;
