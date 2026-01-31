const pool = require('../config/db');

// Registrar un usuario (incluye rol, por defecto vendedor)
exports.registerUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send('Cuerpo de peticion vacio');
  }
  const { username, password, nombre, apellido, telefono, role } = req.body;
  const assignedRole = role || 'vendedor';
  
  pool.query(
    'INSERT INTO T_USUARIOS (ID_USUARIO, PASSWORD, NOMBRE, APELLIDO, TELEFONO, ROLE) VALUES ($1, $2, $3, $4, $5, $6)',
    [username, password, nombre, apellido, telefono, assignedRole],
    (err) => {
      if (err) {
        if (err.code === '42703') {
          return res.status(500).send('Agrega la columna ROLE en T_USUARIOS');
        }
        console.error(err);
        return res.status(500).send('Error en la base de datos');
      }
      res.status(201).send('Usuario registrado');
    }
  );
};

// Login de usuario (retorna rol)
exports.loginUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send('Cuerpo de peticion vacio');
  }
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Faltan credenciales');
  }

  pool.query(
    'SELECT ID_USUARIO, NOMBRE, APELLIDO, TELEFONO, ROLE FROM T_USUARIOS WHERE ID_USUARIO = $1 AND PASSWORD = $2',
    [username, password],
    (err, result) => {
      if (err) {
        if (err.code === '42703') {
          return res.status(500).send('Agrega la columna ROLE en T_USUARIOS');
        }
        console.error(err);
        return res.status(500).send('Error en la base de datos');
      }
      if (result.rows.length === 0) {
        return res.status(401).send('Credenciales invalidas');
      }
      const user = result.rows[0];
      res.status(200).json({
        message: 'Login exitoso',
        role: user.role || 'vendedor',
        username: user.id_usuario
      });
    }
  );
};

// Listar usuarios
exports.getUsers = (req, res) => {
  pool.query('SELECT ID_USUARIO, NOMBRE, APELLIDO, TELEFONO, ROLE FROM T_USUARIOS ORDER BY ID_USUARIO ASC', (err, result) => {
    if (err) {
      if (err.code === '42703') {
        return res.status(500).send('Agrega la columna ROLE en T_USUARIOS');
      }
      console.error(err);
      return res.status(500).send('Error al obtener usuarios');
    }
    res.json(result.rows || []);
  });
};

// Actualizar rol
exports.updateUserRole = (req, res) => {
  const { id } = req.params;
  const { role } = req.body || {};
  if (!role) {
    return res.status(400).send('Falta el rol');
  }

  pool.query(
    'UPDATE T_USUARIOS SET ROLE = $1 WHERE ID_USUARIO = $2',
    [role, id],
    (err, result) => {
      if (err) {
        if (err.code === '42703') {
          return res.status(500).send('Agrega la columna ROLE en T_USUARIOS');
        }
        console.error(err);
        return res.status(500).send('Error al actualizar rol');
      }
      if (result.rowCount === 0) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.status(200).send('Rol actualizado');
    }
  );
};
