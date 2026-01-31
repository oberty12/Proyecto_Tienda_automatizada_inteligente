const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const inspectionRoutes = require('./routes/inspectionRoutes');
const salesRoutes = require('./routes/salesRoutes');
const reportsRoutes = require('./routes/reportsRoutes');
const path = require('path');


const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Servir archivos estaticos (CSS/JS) si se usan
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal (renderiza el login para evitar "Cannot GET /")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Login.html'));
});

// Menú principal estatico
app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'menu.html'));
});

// Vista de gestión de ventas
app.get('/ventas', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'ventas.html'));
});

// Vista de gestión de inventarios
app.get('/inventarios', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'inventarios.html'));
});

// Vista de reportes
app.get('/reportes', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'reportes.html'));
});

// Vista de gestion de usuarios (solo admin en frontend)
app.get('/usuarios', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'usuarios.html'));
});

// Usar las rutas definidas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inspections', inspectionRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/reports', reportsRoutes);

// Arrancar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
