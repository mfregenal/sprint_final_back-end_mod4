import express from 'express';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.mjs';
import { authenticateToken, verifyRole } from '../middlewares/authMiddleware.mjs';
import { validateCategoryFields, validateEditProductFields, validateNewProductFields } from '../middlewares/apiMiddleware.mjs';
import { addProduct, deleteProduct, editProduct, getProducts } from '../controllers/productController.mjs';
import { addCategory, deleteCategory, editCategory, getCategories } from '../controllers/categoryController.mjs';

const router = express.Router();

// OBTENER TODOS LOS PRODUCTOS O PRODUCTOS ESPECÍFICOS
router.get('/products', getProducts);

// AGREGAR NUEVO PRODUCTO
router.post('/products/create', authenticateToken, verifyRole('Admin'), uploadMiddleware.single('imagen'), validateNewProductFields, addProduct);

// EDITAR UN PRODUCTO
router.put('/products/edit', authenticateToken, verifyRole('Admin'), uploadMiddleware.single('imagen'), validateEditProductFields, editProduct);

// ELIMINAR UN PRODUCTO
router.delete('/products/:_id', authenticateToken, verifyRole('Admin'), deleteProduct)



// OBTENER TODAS LAS CATEGORÍAS
router.get('/categories', getCategories);

// AGREGAR UNA NUEVA CATEGORÍA
router.post('/categories/create', authenticateToken, verifyRole('Admin'), validateCategoryFields, addCategory);

// EDITAR UNA CATEGORÍA
router.put('/categories/edit', authenticateToken, verifyRole('Admin'), validateCategoryFields, editCategory);

// ELIMINAR UNA CATEGORÍA
router.delete('/categories/:_id', authenticateToken, verifyRole('Admin'), deleteCategory);



export default router;