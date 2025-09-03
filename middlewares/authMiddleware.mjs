import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.mjs';
import { body, validationResult } from 'express-validator';

// Middleware para verificar el token de autenticación
export const authenticateToken = (req, res, next) => {

  const token = req.cookies.token;

  // Si no hay token, devolvemos error 401 (No autorizado)
  if (!token) {
    return res.status(401).json({ message: 'No autenticado' });
  }

  try {
    // Verificamos el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos la información del usuario decodificada en el objeto request
    req.user = decoded;

    // Continuamos con la siguiente función middleware
    next();
  } catch (error) {
    // Si el token es inválido, devolvemos error 403 (Prohibido)
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

// Middleware para verificar el role del usuario
export const verifyRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'No autenticado' }); // Verificamos que el usuario haya pasado por el control de autenticación
      }

      // Obtener usuario con rol
      const user = await UserModel.findById(req.user.id).populate('role');

      const hasRequiredRole = user.role.name === requiredRole;

      if (!hasRequiredRole ) {
        return res.status(403).json({ 
          message: 'No tienes permiso para realizar esta acción' 
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};


export const validateRegisterFields = [
  body('username')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  body('password')
    .trim()
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe contener mínimo 6 dígitos'),

  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Formato de email inválido'),

  (req, res, next) => {
    const errores = validationResult(req).array();

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    next();
  }
];