import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";

import { 
    validateCreateSalesOrderLine,
    validateUpdateSalesOrderLine,
 } from "../../../utils/salesOrderLineValidator.js";
import { createSalesOrderLine,
    deleteSalesOrderLine,
    getAllSalesOrderLine,
    getSalesOrderById,
    updateSalesOrderLine,
 } from "../controllers/salesOrderLineController.js";

 const router = express.Router();

// Create a new Sales Order Line
router.post(
    "/sales-order-lines",
    cookieAuthMiddleware,
    validateCreateSalesOrderLine,
    createSalesOrderLine
  );

// Get all Sales Order Lines for a Sales Order
router.get("/sales-orders/:salesOrderId/lines", cookieAuthMiddleware, getAllSalesOrderLine);

// Get a Sales Order Line by ID
router.get("/sales-order-lines/:id", cookieAuthMiddleware, getSalesOrderById);

// Update a Sales Order Line
router.put(
    "/sales-order-lines/:id",
    cookieAuthMiddleware,
    validateUpdateSalesOrderLine,
    updateSalesOrderLine
  );

// Delete a Sales Order Line
router.delete("/sales-order-lines/:id", cookieAuthMiddleware, deleteSalesOrderLine);

  export default router;
  