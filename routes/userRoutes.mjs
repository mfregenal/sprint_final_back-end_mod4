import express from 'express';
import { getUserId, getUsers, deleteUser } from '../controllers/userController.mjs';
import { authenticateToken, verifyRole } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/:id', getUserId);
router.get('/', authenticateToken, verifyRole('Admin'), getUsers);
router.delete('/:id', authenticateToken, verifyRole('Admin'), deleteUser);

export default router;