// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Nombre de usuario único y requerido
  password: { type: String, required: true }, // Contraseña requerida
});

//Hash de contraseña antes de guardar un usuario
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Hash de la contraseña
  }
  next();
});

export const User = mongoose.model('User', userSchema); // Modelo de usuario