import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
    validateCreateProductCategories,
    validateUpdateProductCategories,
} from "../../../utils/productCategoriesValidator.js";
import {
    createProductCategories,
    getAllProductCategories,
    getProductCategoriesById,
    updateProductCategories,
    deleteProductCategories,
} from "../controllers/productCategoriesController.js";

const router = express.Router();

// Create a new Product Category
router.post(
    "/product-categories",
    cookieAuthMiddleware,
    validateCreateProductCategories,
    createProductCategories
);

// Get all Product Categories
router.get("/product-categories", cookieAuthMiddleware, getAllProductCategories);

// Get a Product Category by ID
router.get("/product-categories/:id", cookieAuthMiddleware, getProductCategoriesById);

// Update a Product Category
router.put(
    "/product-categories/:id",
    cookieAuthMiddleware,
    validateUpdateProductCategories,
    updateProductCategories
);

// Delete a Product Category
router.delete("/product-categories/:id", cookieAuthMiddleware, deleteProductCategories);

export default router;
