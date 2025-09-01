import mongoose from 'mongoose';

const categoryModelsSchema = new mongoose.Schema(
  {
    nombre: String
  },
  {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
  }
);

export const CategoryModel = mongoose.model('Categoria', categoryModelsSchema);