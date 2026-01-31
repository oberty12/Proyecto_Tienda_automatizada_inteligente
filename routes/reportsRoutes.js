const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');

router.get('/sales', reportsController.getSales);
router.get('/products', reportsController.getProductIncome);

module.exports = router;
