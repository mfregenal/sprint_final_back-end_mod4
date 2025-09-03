import mongoose from 'mongoose';

const productModelsSchema = new mongoose.Schema(
  {
    nombre: String,
    precio: Number,
    categoria: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Categoria'
        },
    imagen: String
  },
  {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
  }
);

export const ProductModel = mongoose.model('Producto', productModelsSchema);