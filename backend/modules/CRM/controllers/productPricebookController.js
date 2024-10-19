import { validationResult } from "express-validator";
import ProductPriceBook from "../models/productPricebookModel.js";

// Create a new Product PriceBook
export const createProductPriceBook = async (req, res) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const data = req.body;
        data.createdBy = req.user.userId; // Assuming `authMiddleware` adds `userId` to `req.user`

        // Create a new ProductPriceBook instance
        const productPriceBook = new ProductPriceBook(data);
        await productPriceBook.save();

        res.status(201).json(productPriceBook);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'Serial Number must be unique within the same product and price book',
            });
        }
        res.status(400).json({ message: error.message });
    }
}

// Get all Product PriceBooks
export const getAllProductPriceBooks = async (req, res) => {
    try {
        const productPriceBooks = await ProductPriceBook.find()
            .populate('priceBookId', 'priceBookName')
            .populate('productId', 'productName')
            .populate('createdBy', 'firstName lastName username')
            .populate('modifiedBy', 'firstName lastName username')
            .sort({ priceBookId: 1, productId: 1, serialNo: 1 });
        res.json(productPriceBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get Product PriceBook By Id
export const getProductPriceBookById = async (req, res) => {
    try {
        const productPriceBook = await ProductPriceBook.findById(req.params.id)
            .populate('priceBookId', 'priceBookName')
            .populate('productId', 'productName')
            .populate('createdBy', 'firstName lastName username')
            .populate('modifiedBy', 'firstName lastName username');

        if (!productPriceBook) {
            return res.status(404).json({ message: 'Product Price Book entry not found' });
        }

        res.json(productPriceBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a Product Pricebook
export const updateProductPriceBook = async (req, res) => {
    try {
        // Fetch existing data
        const existingData = await ProductPriceBook.findById(req.params.id);
        if (!existingData) {
            return res.status(404).json({ message: 'Product Price Book entry not found' });
        }
        req.existingData = existingData;

        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const updates = req.body;
        updates.modifiedBy = req.user.userId;
        updates.modifiedAt = new Date();

        const productPriceBook = await ProductPriceBook.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                new: true,
                runValidators: true,
            }
        )
            .populate('priceBookId', 'priceBookName')
            .populate('productId', 'productName')
            .populate('createdBy', 'firstName lastName username')
            .populate('modifiedBy', 'firstName lastName username');

        res.json(productPriceBook);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'Serial Number must be unique within the same product and price book',
            });
        }
        res.status(400).json({ message: error.message });
    }
}

// Delete a Product Pricebook
export const deleteProductPriceBook = async (req, res) => {
    try {
        const productPriceBook = await ProductPriceBook.findByIdAndDelete(req.params.id);

        if (!productPriceBook) {
            return res.status(404).json({ message: 'Product Price Book entry not found' });
        }

        res.json({ message: 'Product Price Book entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}