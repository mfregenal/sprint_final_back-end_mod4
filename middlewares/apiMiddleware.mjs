import { body, validationResult } from 'express-validator';

export const validateProductFields = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 3 })
    .withMessage('El nombre debe tener al menos 3 caracteres'),

  body('precio')
    .isFloat({ gt: 0 })
    .withMessage('El precio debe ser un número mayor a cero'),

  body('categoria')
    .notEmpty()
    .withMessage('La categoría es obligatoria'),

  body('imagen')
  .notEmpty()
  .withMessage('Debes incluir una imagen para continuar con el registro'),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];

export const validateCategoryFields = [
  body('nombre')
  .notEmpty()
  .withMessage('El nombre es obligatorio')
  .isLength({ min: 3 })
  .withMessage('El nombre debe tener al menos 3 caracteres'),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];