const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { upload } = require('../config/multer');

// Route to add a new product
router.post('/add', upload.array('images', 5), productController.addProduct);

// Route to fetch all products
router.get('/', productController.getAllProducts);

// Route to fetch a single product by ID
router.get('/:id', productController.getProductById);

// Route to update a product by ID
router.put('/:id', upload.array('images', 5), productController.updateProduct);

// Route to delete a product by ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;