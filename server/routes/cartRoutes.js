const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addToCart);
router.delete('/', authMiddleware, removeFromCart);

module.exports = router;
