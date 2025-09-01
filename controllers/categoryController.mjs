import CategoryService from "../services/categoryServices.mjs";

// Obtener todas las categorías
export const getCategories = async (req, res) => {
  try {
    const response = await CategoryService.getCategories();
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías', error })
  }
}

// Agregar una nueva categoría
export const addCategory = async (req, res) => {
  const { nombre } = req.body; // Obtenemos el nombre desde los datos enviados

  try {
    const response = await CategoryService.addCategory(nombre);
    res.status(response.status).json( response.message );
  } catch (error) {
    res.status(500).json({ message: 'Error al crear nueva categoría', error});
  }
}

// Editar una categoría
export const editCategory = async (req, res) => {
  const { _id, nombre } = req.body; // Obtenemos el id y nombre de los datos enviados

  try {
    const response = await CategoryService.editCategory(_id, nombre);

    res.status(response.status).json( response.message );
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar categoría', error });
  }
}

// Eliminar una categoría
export const deleteCategory = async (req, res) => {
  const { _id } = req.params; // Obtenemos el id del elemento a eliminar desde los parámetros

  try {
    const response = await CategoryService.deleteCategory(_id);

    res.status(response.status).json( response.message );
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoría', error });
  }
}