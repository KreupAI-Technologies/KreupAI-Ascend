// Author : Bosco Sabu John
// Date : 18/09/2024
// Version : v1.0

import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
  validateCreateSalesOrder,
  validateUpdateSalesOrder,
} from "../../../utils/salesOrderValidator.js";
import {
  createSalesOrder,
  deleteSalesOrder,
  getAllSalesOrder,
  getSalesOrderById,
  updateSalesOrder,
} from "../controllers/salesOrderController.js";

const router = express.Router();

// Create a new Sales Order
router.post(
  "/sales-orders",
  cookieAuthMiddleware,
  validateCreateSalesOrder,
  createSalesOrder
);

// Get all Sales Orders
router.get("/sales-orders", cookieAuthMiddleware, getAllSalesOrder);

// Get a Sales Order by ID
router.get("/sales-orders/:id", cookieAuthMiddleware, getSalesOrderById);

// Update a Sales Order
router.put(
  "/sales-orders/:id",
  cookieAuthMiddleware,
  validateUpdateSalesOrder,
  updateSalesOrder
);

// Delete a Sales Order
router.delete("/sales-orders/:id", cookieAuthMiddleware, deleteSalesOrder);

export default router;
