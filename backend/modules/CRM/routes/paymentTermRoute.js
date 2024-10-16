import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
  validateCreatePaymentTerm,
  validateUpdatePaymentTerm,
} from "../../../utils/paymentTermValidator.js";
import {
  createPaymentTerm,
  deletePaymentTerm,
  getAllPaymentTerms,
  getPaymentTermById,
  updatePaymentTerm,
} from "../controllers/paymentTermController.js";

const router = express.Router();

// Create a new Payment Term
router.post(
  "/payment-terms",
  cookieAuthMiddleware,
  validateCreatePaymentTerm,
  createPaymentTerm
);

// Get all Payment Terms
router.get("/payment-terms", cookieAuthMiddleware, getAllPaymentTerms);

// Get a Payment Term by ID
router.get("/payment-terms/:id", cookieAuthMiddleware, getPaymentTermById);

// Update a Payment Term
router.put(
  "/payment-terms/:id",
  cookieAuthMiddleware,
  validateUpdatePaymentTerm,
  updatePaymentTerm
);

// Delete a Payment Term
router.delete("/payment-terms/:id", cookieAuthMiddleware, deletePaymentTerm);

export default router;
