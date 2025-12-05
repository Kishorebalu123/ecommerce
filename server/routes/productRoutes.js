const express = require('express');
const { getProducts, getProductById } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getProducts);
router.get('/:id', authMiddleware, getProductById);

module.exports = router;
