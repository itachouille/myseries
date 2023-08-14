import express from 'express';
import { search } from '../controllers/search.js';

const router = express.Router();

router.post('/search', search);

export default router;