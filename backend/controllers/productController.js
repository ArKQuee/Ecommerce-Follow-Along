const Product = require('../models/productModel'); // Assuming a Product model exists

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const images = req.files.map(file => file.path); // Assuming multer stores file paths

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            images,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Product added successfully!', product: savedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product', error: error.message });
    }
};

// Fetch all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

// Fetch a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product', error: error.message });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const images = req.files.map(file => file.path); // Assuming multer stores file paths

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, images },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully!', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
};