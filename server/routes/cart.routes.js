import express from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { addToCart, getCart, updateQuantity, removeFromCart } from '../controllers/cart.controllers.js';

const router = express.Router();

router.post('/:productId', isAuthenticated, addToCart);
router.get('/', isAuthenticated, getCart);
router.patch('/:productId', isAuthenticated, updateQuantity);
router.delete('/:productId', isAuthenticated, removeFromCart);

export default router;
