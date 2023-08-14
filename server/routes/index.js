import express from 'express';
import checkAuth from '../utils/checkAuth.js';
import authRoutes from './auth.js';
import usersRoutes from './users.js';
import itemsRoutes from './items.js';
import searchRoutes from './search.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', checkAuth, usersRoutes);
router.use('/items', checkAuth, itemsRoutes);
router.use('/search', checkAuth, searchRoutes);

export default router;