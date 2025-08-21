import mongoose from 'mongoose';

const categoryModelsSchema = new mongoose.Schema({
  nombre: String
});

export const CategoryModel = mongoose.model('Categoria', categoryModelsSchema);