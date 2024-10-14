import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
    validateCreateProductPriceBook,
    validateUpdateProductPriceBook,
} from "../../../utils/productPricebookValidator.js";
import {
    createProductPriceBook,
    getAllProductPriceBooks,
    getProductPriceBookById,
    updateProductPriceBook,
    deleteProductPriceBook,
} from "../controllers/productPricebookController.js";

const router = express.Router();

// Create a new Product
router.post(
    "/product-price-books",
    cookieAuthMiddleware,
    validateCreateProductPriceBook,
    createProductPriceBook
);

// Get all Products
router.get("/product-price-books", cookieAuthMiddleware, getAllProductPriceBooks);

// Get a Product by ID
router.get("/product-price-books/:id", cookieAuthMiddleware, getProductPriceBookById);

// Update a Product
router.put(
    "/product-price-books/:id",
    cookieAuthMiddleware,
    validateUpdateProductPriceBook,
    updateProductPriceBook
);

// Delete a Product
router.delete("/product-price-books/:id", cookieAuthMiddleware, deleteProductPriceBook);

export default router;
