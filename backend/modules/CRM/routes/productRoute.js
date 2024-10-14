import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
    validateCreateProduct,
    validateUpdateProduct,
} from "../../../utils/productValidator.js";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Create a new Product
router.post(
    "/products",
    cookieAuthMiddleware,
    validateCreateProduct,
    createProduct
);

// Get all Products
router.get("/products", cookieAuthMiddleware, getAllProducts);

// Get a Product by ID
router.get("/products/:id", cookieAuthMiddleware, getProductById);

// Update a Product
router.put(
    "/products/:id",
    cookieAuthMiddleware,
    validateUpdateProduct,
    updateProduct
);

// Delete a Product
router.delete("/products/:id", cookieAuthMiddleware, deleteProduct);

export default router;
