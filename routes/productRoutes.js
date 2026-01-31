const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas para gestionar productos
router.post('/register', productController.registerProduct);
router.get('/', productController.getAllProducts);

module.exports = router;
