import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import { validateCreateProductCategory, validateUpdateProductCategory } from "../../../utils/productCategoryValidator.js";
import {
    createProductCategory,
    getProductCategories,
    getProductCategoryById,
    updateProductCategory,
    deleteProductCategory,
} from "../controllers/productCategoryController.js";

const router = express.Router();

// Create a new Product Category
router.post(
    "/product-categories",
    cookieAuthMiddleware,
    validateCreateProductCategory,
    createProductCategory
);

// Get all Product Categories
router.get("/product-categories", cookieAuthMiddleware, getProductCategories);

// Get a Product Category by ID
router.get("/product-categories/:id", cookieAuthMiddleware, getProductCategoryById);

// Update a Product Category
router.put(
    "/product-categories/:id",
    cookieAuthMiddleware,
    validateUpdateProductCategory,
    updateProductCategory
);

// Delete a Product Category
router.delete("/product-categories/:id", cookieAuthMiddleware, deleteProductCategory);

export default router;
