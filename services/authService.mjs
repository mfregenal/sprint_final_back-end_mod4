import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.mjs';
import { RoleModel } from '../models/roleModel.mjs';

class AuthService {

  // Método para registrar un nuevo usuario
  async register(userData) {

    // Verificamos si ya existe un usuario con el mismo email o username
    const existingUser = await UserModel.findOne({ 
      $or: [
        { email: userData.email },
        { username: userData.username }
      ]
    });

    // Si existe lanzamos un error
    if (existingUser) {
      throw new Error('Usuario o email ya existe');
    }

    // Encriptamos la contraseña antes de crear el usuario usando bcrypt
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Buscamos el rol por defecto
    const defaultRole = await RoleModel.findOne({ name: 'Usuario' });

    // Creamos una nueva instancia del modelo User con los datos recibidos
    const user = new UserModel({
      ...userData,
      password: hashedPassword,
      role: defaultRole._id
    });

    // Guardamos el usuario en la base de datos
    await user.save();

    // Convertimos el documento mongoose a un objeto plano
    const userResponse = user.toObject();

    // Eliminamos la contraseña por seguridad
    delete userResponse.password;

    // Generamos un token JWT para el usuario
    const token = this.generateToken(user);

    // Retornamos el usuario (sin password) y su token
    return { user: userResponse, token};
  }



  // Método para iniciar sesión
  async login(username, password) {

    // Buscamos el usuario por email
    const user = await UserModel.findOne({ username }).populate('role');
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Verificamos si la contraseña es correcta
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Correo o contraseña incorrectos');
    }

    // Convertimos el usuario a objeto plano y eliminamos la contraseña
    const userResponse = user.toObject();
    delete userResponse.password;

    // Generamos un nuevo token y retornamos la respuesta
    const token = this.generateToken(user);

    return { user: userResponse, token };
  }



  // Método para checkear el Login
  async check (token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }



  // Método auxiliar para generar tokens JWT
  generateToken(user) {

    // Creamos un token que incluye el id, rol y permisos del usuario
    return jwt.sign(
      { 
        id: user._id,
        role: user.role
      },

      // Usamos la clave secreta del .env
      process.env.JWT_SECRET,

      // El token expira en 2 horas
      { expiresIn: '2h' }
    );
  }
}

export default new AuthService;