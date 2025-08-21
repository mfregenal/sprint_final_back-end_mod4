import mongoose from 'mongoose';

const productModelsSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  categoria: String,
  imagen: String
});

export const ProductModel = mongoose.model('Producto', productModelsSchema);