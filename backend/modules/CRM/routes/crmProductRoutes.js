// routes/productRoutes.js

import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/crmProductController.js';

const router = express.Router();

// Product routes
router.route('/')
  .post(createProduct)    // Create a new product
  .get(getProducts);      // Get all products

router.route('/:id')
  .get(getProductById)    // Get a product by ID
  .put(updateProduct)     // Update a product
  .delete(deleteProduct); // Delete a product

export default router;
