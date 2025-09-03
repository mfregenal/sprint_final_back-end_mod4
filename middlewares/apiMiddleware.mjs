import { body, validationResult } from 'express-validator';

export const validateNewProductFields = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  body('precio')
    .toFloat()
    .isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor a cero'),

  body('categoria')
    .trim()
    .notEmpty().withMessage('La categoría es obligatoria'),

  body('imagen')
  .custom((value, { req }) => {
    return !!req.file; // Devuelve false si no hay archivo
  })
  .withMessage('Debes incluir una imagen para continuar con el registro'),

  (req, res, next) => {
    const errores = validationResult(req).array();

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    next();
  }
];

export const validateEditProductFields = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  body('precio')
    .toFloat()
    .isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor a cero'),

  body('categoria')
    .trim()
    .notEmpty().withMessage('La categoría es obligatoria'),

  (req, res, next) => {
    const errores = validationResult(req).array();

    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    next();
  }
];

export const validateCategoryFields = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];