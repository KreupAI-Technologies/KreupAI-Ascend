// routes/salesOrderLineRoutes.js

import express from 'express';
import {
  createSalesOrderLine,
  getSalesOrderLines,
  getSalesOrderLineById,
  updateSalesOrderLine,
  deleteSalesOrderLine,
} from '../controllers/crmSalesOrderLineController.js';

const router = express.Router();

// SalesOrderLine routes
router.route('/')
  .post(createSalesOrderLine)    // Create a new sales order line
  .get(getSalesOrderLines);      // Get all sales order lines

router.route('/:id')
  .get(getSalesOrderLineById)    // Get a sales order line by ID
  .put(updateSalesOrderLine)     // Update a sales order line
  .delete(deleteSalesOrderLine); // Delete a sales order line

export default router;
