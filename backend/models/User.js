const mongoose = require('mongoose');

// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Nombre de usuario único y requerido
  password: { type: String, required: true }, // Contraseña requerida
});

// Hash de contraseña antes de guardar un usuario, igual, ¿podria explicarnos como funciona bien esta parte de el hash? o si es realmente necesario? 
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) { // Verifica si la contraseña ha sido modificada
    this.password = await bcrypt.hash(this.password, 10); // Hashea la contraseña
  }
  next();
});

const User = mongoose.model('User', userSchema); // Modelo de usuario basado en el esquema
module.exports = User; // Exporta el modelo de usuario 
