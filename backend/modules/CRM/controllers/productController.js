import { validationResult } from "express-validator";
import Product from "../models/productModel.js";

// Create a new Product
export const createProduct = async (req, res) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const productData = req.body;
        productData.createdBy = req.user.userId; // Assuming `authMiddleware` adds `userId` to `req.user`

        // Create a new Product instance
        const product = new Product(productData);
        await product.save();

        res.status(201).json(product);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Product Code must be unique' });
        }
        res.status(400).json({ message: error.message });
    }
}

// Get all Products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('productCategoryId', 'name')
            .populate('vendorId', 'accountName')
            .populate('manufacturerId', 'accountName')
            .populate('handlerId', 'firstName lastName username')
            .populate('createdBy', 'firstName lastName username')
            .populate('modifiedBy', 'firstName lastName username');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Get a Product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('productCategoryId', 'name')
            .populate('vendorId', 'accountName')
            .populate('manufacturerId', 'accountName')
            .populate('handlerId', 'firstName lastName username')
            .populate('createdBy', 'firstName lastName username')
            .populate('modifiedBy', 'firstName lastName username');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Update a Product
export const updateProduct = async (req, res) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const updates = req.body;
        updates.modifiedBy = req.user.userId;
        updates.modifiedAt = new Date();

        const product = await Product.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        })
            .populate('productCategoryId', 'name')
            .populate('vendorId', 'accountName')
            .populate('manufacturerId', 'accountName')
            .populate('handlerId', 'firstName lastName username')
            .populate('createdBy', 'firstName lastName username')
            .populate('modifiedBy', 'firstName lastName username');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Product Code must be unique' });
        }
        res.status(400).json({ message: error.message });
    }
}

// Delete a Product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}