import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs'
import cookieParser from 'cookie-parser';

dotenv.config(); // Carga las variables del archivo .env

const app = express();
const PORT = process.env.PORT || 3000;

// Permite acceder al backend desde otros directorios como front-end
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://tecnonar.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(cookieParser());

app.use(express.json()); // Para manejar las peticiones en formato JSON
app.use('/uploads', express.static('uploads'));

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

try {
  await mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Conectado a tecnonar DB'))
    .catch(err => console.error('Error al conectar', err));

  app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
} catch (error) {
  console.error('Error al iniciar el servidor:', error);
}
