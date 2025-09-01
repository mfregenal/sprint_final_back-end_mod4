import { CategoryModel } from '../models/categoryModel.mjs';

class CategoryService {

  // Obtener todas las categorías
  async getCategories () {
    return await CategoryModel.find();
  }

  // Agregar una nueva categoría
  async addCategory (nombre) {
    
    const existeCategoria = await CategoryModel.findOne({ nombre });

    if ( existeCategoria ) {
      return { status: 409, message: 'Ya existe una categoría con ese nombre' }
    }

    const newCategory = new CategoryModel( { nombre } ); // Crea una nueva categoría usando el nombre obtenido

    await newCategory.save(); // Guardamos la nueva categoría en la base de datos

    return { status: 200, message: 'Categoría creada exitosamente' };
  }

  // Editar una categoría
  async editCategory (_id, nombre) {

    const existeCategoria = await CategoryModel.findOne({ nombre });

    if ( existeCategoria ) {
      return { status: 409, message: 'Ya existe una categoría con ese nombre' }
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      _id,
      { nombre }
    )

    if (!updatedCategory) {
      return { status: 404, message: 'Categoría no encontrada' }
    }

    return { status: 200, message: 'Categoría actualizada exitosamente' }
  }

  // Eliminar un categoría
  async deleteCategory (_id) {
    const deleted = await CategoryModel.findByIdAndDelete(_id); // Eliminamos el elemento y lo guardamos

    if ( !deleted ) { // Corroboramos que al eliminar el elemento no haya sucedido un error
      return { status: 404, message: 'Categoría no encontrada' };
    }

    return { status: 200, message: 'Categoría eliminada correctamente' };
  }
}

export default new CategoryService;