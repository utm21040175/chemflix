import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors"; 
import {User} from './models/User.js';

const app = express.Router();

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
    const { username, password } = req.body;

    // Cifrar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).send({ success: true, message: 'Usuario registrado' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: error.message });
  }
});


// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
  try {
    const { username } = req.body; //Obtener username y password 
    const user = await User.findOne({ username }); // Buscar el usuario en la base de datos
    console.log(user)
    if (!user) {
      return res.status(400).send({ success: false, message: 'El usuario no existe' });
    }
    //const validPassword = await bcrypt.compare(password, user.password);
    //console.log(validPassword)
    //if (!validPassword) {
      //return res.status(400).send({ success: false, message: 'Contraseña incorrecta' });
    //}
    
    const token = jwt.sign({ userId: user._id }, 'tu_secreto_jwt'); // Generando token JWT, cuando consultamos se agrego, 
    // pero podria esxplicarme un poco como funciona? 
    res.status(200).send({ token }); // Enviando token como respuesta
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message); // Respuesta de error
  }
});

// Ruta para obtener el perfil del usuario
app.get('/perfil', async (req, res) => {
  try {
    const userId = req.user.id; // Obtén el ID del usuario desde el token o sesión (asegúrate de usar autenticación)
    const user = await User.findById(userId); // Busca al usuario en MongoDB por su ID

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Devuelve los datos del usuario
    res.json({
      name: user.name,
      email: user.email,
      avatar: user.avatar, // Asegúrate de que el modelo tenga un campo de avatar
    });
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

export default app;


// Iniciar el servidor
const port = process.env.PORT || 4000; // Definir el puerto
app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`)); // Mensaje de que funciona
