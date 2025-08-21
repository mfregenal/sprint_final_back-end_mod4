import express from 'express';
import { ProductModel } from '../models/productModel.mjs';
import { CategoryModel } from '../models/categoryModel.mjs';

const router = express.Router();

// OBTENER TODOS LOS PRODUCTOS
router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
});

// OBTENER PRODUCTOS QUE COINCIDAN CON LA BÚSQUEDA
router.get('/search', async (req, res) => {
  const { value = '' } = req.query;

  try {
    const products = await ProductModel.find({
      nombre: { $regex: value, $options: 'i' }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
});

// OBTENER TODAS LAS CATEGORÍAS
router.get('/categories', async (req, res) => {
  try {
    const category = await CategoryModel.find(); // Devuelve todas las categorías de la colección categorías de la DB
    res.json(category); // Devuelve lo obtenido en formato json
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías', error })
  }
});

// OBTENER PRODUCTOS DE CIERTA CATEGORÍA
router.get('/:categoria', async(req, res) => {
  try {
    const { categoria } = req.params;
    const products = await ProductModel.find({categoria});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
});

// AGREGAR NUEVO PRODUCTO
router.post('/', async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body); // Crea un nuevo producto usando los datos enviados (instancia)
    await newProduct.save(); // Guardamos el nuevo producto en la base de datos
    res.status(200).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    res.status(500).json({  message: 'Error al agregar nuevo producto', error });
  }
  // res.json(newProduct); Devuelve el producto que fue recién agregado
});

// AGREGAR UNA NUEVA CATEGORÍA
router.post('/categories/create', async (req, res) => {
  const { nombre } = req.body; // Obtenemos el nombre desde los datos enviados

  if (!nombre || nombre.length < 3) { // Corrobora que el nombre sea valido
    return res.status(400).json({ error: 'Nombre inválido' });
  }

  try {
    const newCategory = new CategoryModel( { nombre }); // Crea una nueva categoría usando el nombre obtenido
    await newCategory.save(); // Guardamos la nueva categoría en la base de datos
    res.status(200).json({ message: 'Categoría creada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear nueva categoría', error});
  }
});

// EDITAR UNA CATEGORÍA
router.put('/categories/edit', async (req, res) => {
  const { _id, nombre } = req.body; // Obtenemos el id y nombre de los datos enviados

  if (!nombre || nombre.length < 3 ) { // Corrobora que el nuevo nombre sea valido
    return res.status(400).json({ error: 'Nombre inválido' })
  }

  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      _id,
      { nombre }
    )

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Categoría no encontrada' })
    }

    res.status(200).json({ message: 'Categoría actualizada exitosamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar categoría', error })
  }
})

// ELIMINAR UNA CATEGORÍA
router.delete('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params; //Obtenemos el id del elemento a eliminar desde los parámetros
    const deleted = await CategoryModel.findByIdAndDelete(id); // Eliminamos el elemento y lo guardamos

    if (!deleted) { // Corroboramos que al eliminar el elemento no haya sucedido un error
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.status(200).json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoría', error });
  }
})

export default router;