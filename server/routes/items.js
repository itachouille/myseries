import express from 'express';
import {
	createItem,
	updateItem,
	deleteItem,
	getCurrentUserItems
} from '../controllers/item.js';

const router = express.Router();

router.post('/', createItem);
router.put('/:itemId', updateItem);
router.delete('/:itemId', deleteItem);
router.get('/myItems', getCurrentUserItems);


export default router;