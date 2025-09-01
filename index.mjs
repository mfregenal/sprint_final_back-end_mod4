import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/APIRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';

dotenv.config(); // Carga las variables del archivo .env

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Permite acceder al backend desde otros directorios como front-end
app.use(express.json()); // Para manejar las peticiones en formato JSON
app.use('/uploads', express.static('uploads'));

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

try {
  await mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Conectado a tecnonar DB'))
    .catch(err => console.error('Error al conectar', err));

  app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
} catch (error) {
  console.error('Error al iniciar el servidor:', error);
}