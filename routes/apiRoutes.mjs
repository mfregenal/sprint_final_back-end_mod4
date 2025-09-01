import express from 'express';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.mjs';
import { authenticateToken } from '../middlewares/authMiddleware.mjs';
import { validateCategoryFields, validateProductFields } from '../middlewares/apiMiddleware.mjs';
import { addProduct, deleteProduct, editProduct, getProducts } from '../controllers/productController.mjs';
import { addCategory, deleteCategory, editCategory, getCategories } from '../controllers/categoryController.mjs';

const router = express.Router();

// OBTENER TODOS LOS PRODUCTOS O PRODUCTOS ESPECÍFICOS
router.get('/products', getProducts);

// AGREGAR NUEVO PRODUCTO
router.post('/products/create', authenticateToken, uploadMiddleware.single('imagen'), validateProductFields, addProduct);

// EDITAR UN PRODUCTO
router.put('/products/edit', authenticateToken, uploadMiddleware.single('imagen'), validateProductFields, editProduct);

// ELIMINAR UN PRODUCTO
router.delete('/products/:_id', authenticateToken, deleteProduct)



// OBTENER TODAS LAS CATEGORÍAS
router.get('/categories', getCategories);

// AGREGAR UNA NUEVA CATEGORÍA
router.post('/categories/create', authenticateToken, validateCategoryFields, addCategory);

// EDITAR UNA CATEGORÍA
router.put('/categories/edit', authenticateToken, validateCategoryFields, editCategory);

// ELIMINAR UNA CATEGORÍA
router.delete('/categories/:_id', authenticateToken, deleteCategory);



export default router;