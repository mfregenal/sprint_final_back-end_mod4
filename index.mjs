import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productosRoutes from './routes/productRoutes.mjs';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables del archivo .env

const app = express();
app.use(cors()); // Permite acceder a la API de otros directorios como front-end
app.use(express.json()); // Para manejar las peticiones en formato JSON

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Conectado a tecnonar DB'))
  .catch(err => console.error('Error al conectar', err));

app.use('/api/products', productosRoutes);

app.listen(3000, () => console.log('API escuchando en http://localhost:3000'));