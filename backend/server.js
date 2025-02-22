import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors"; 
import {User} from '../../backend/models/User.js';

const app = express();

// Analizar el cuerpo de las solicitudes y habilitar CORS
app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB 
mongoose.connect('mongodb://localhost:27017/chemflix', { useNewUrlParser: true, useUnifiedTopology: true }) //aqui me gustaria que me explicara un poco 
  .then(() => console.log('Conectado a MongoDB')) // Mensaje de éxito
  .catch(err => console.log('Error al conectar a MongoDB:', err)); // Mensaje de error

// Ruta de registro
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body; // Obtener username y password 
    const user = new User({ username, password }); // Creando un nuevo usuario
    await user.save(); // Guardando el usuario en la base de datos
    res.status(201).send('Usuario registrado'); // Respuesta de éxito
  } catch (error) {
    res.status(400).send(error.message); // Respuesta de error
  }
});

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body; //Obtener username y password 
    const user = await User.findOne({ username }); // Buscar el usuario en la base de datos
    if (!user || !(await bcrypt.compare(password, user.password))) { // Verificar credenciales
      return res.status(400).send('Credenciales inválidas'); // Respuesta de error
    }
    const token = jwt.sign({ userId: user._id }, 'tu_secreto_jwt'); // Generando token JWT, cuando consultamos se agrego, 
    // pero podria esxplicarme un poco como funciona? 
    res.send({ token }); // Enviando token como respuesta
  } catch (error) {
    res.status(400).send(error.message); // Respuesta de error
  }
});

// Iniciar el servidor
const port = process.env.PORT || 4000; // Definir el puerto
app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`)); // Mensaje de que funciona 
