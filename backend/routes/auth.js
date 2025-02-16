const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body; // Obtiene el nombre de usuario y la contraseña 
    const user = new User({ username, password }); // Crea una nueva instancia del usuario con los datos proporcionados
    await user.save(); // Guarda el nuevo usuario en la base de datos
    res.status(201).send('Usuario registrado'); // Responde con un mensaje de que funciona
  } catch (error) {
    res.status(400).send(error.message); // Responde con un mensaje de que algo falla
  }
});

// Ruta para iniciar sesión de un usuario
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body; // Obtiene el nombre de usuario y la contraseña
    const user = await User.findOne({ username }); // Busca en la base de datos un usuario con el nombre de usuario proporcionado
    if (!user || !(await bcrypt.compare(password, user.password))) { // Compara la contraseña ingresada con la contraseña almacenada
      return res.status(400).send('Credenciales inválidas'); // Si las credenciales son incorrectas, responde con un mensaje de error
    }
    const token = jwt.sign({ userId: user._id }, 'tu_secreto_jwt'); // Si las credenciales son correctas, genera un token JWT
    res.send({ token }); // Responde con el token generado, lo mismo que el primer, ¿podria explicarme lo del token? 
  } catch (error) {
    res.status(400).send(error.message); // Responde con un mensaje de que algo falla
  }
});

module.exports = router; // Exporta el router para utilizarlo 
