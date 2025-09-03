import { check, login, logout, register } from '../controllers/authController.mjs';
import express from 'express';
import { validateRegisterFields } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.post('/register', validateRegisterFields, register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check', check)

export default router;