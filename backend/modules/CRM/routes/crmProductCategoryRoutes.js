

import express from 'express';
import {
  createProductCategory,
  getProductCategories,
  getProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
} from '../controllers/crmProductCategoryController.js';

const router = express.Router();

// ProductCategory routes
router.route('/')
  .post(createProductCategory)    // Create a new product category
  .get(getProductCategories);      // Get all product categories

router.route('/:id')
  .get(getProductCategoryById)    // Get a product category by ID
  .put(updateProductCategory)     // Update a product category
  .delete(deleteProductCategory); // Delete a product category

export default router;
