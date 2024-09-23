// routes/salesOrderRoutes.js

import express from 'express';
import {
  createSalesOrder,
  getSalesOrders,
  getSalesOrderById,
  updateSalesOrder,
  deleteSalesOrder,
} from '../controllers/crmSalesOrderController.js';

const router = express.Router();

// SalesOrder routes
router.route('/')
  .post(createSalesOrder)    // Create a new sales order
  .get(getSalesOrders);      // Get all sales orders

router.route('/:id')
  .get(getSalesOrderById)    // Get a sales order by ID
  .put(updateSalesOrder)     // Update a sales order
  .delete(deleteSalesOrder); // Delete a sales order

export default router;
