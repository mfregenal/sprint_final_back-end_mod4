import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'uploads/', // Nombre de la carpeta destino
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}${ext}`;
    cb(null, uniqueName); // Indica que no hubo errores y cual sera el nombre del archivo
  }
});

export const uploadMiddleware = multer({ storage }); // Inicializo multer con una configuración personalizada