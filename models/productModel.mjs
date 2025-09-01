import mongoose from 'mongoose';

const productModelsSchema = new mongoose.Schema(
  {
    nombre: String,
    precio: Number,
    categoria: String,
    imagen: String
  },
  {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
  }
);

export const ProductModel = mongoose.model('Producto', productModelsSchema);