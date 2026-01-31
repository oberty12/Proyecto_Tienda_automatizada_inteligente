const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas para registrar y loguear usuarios
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getUsers);
router.put('/:id/role', userController.updateUserRole);

module.exports = router;
