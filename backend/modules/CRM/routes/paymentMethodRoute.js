import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import { validateCreatePaymentMethod } from "../../../utils/paymentMethodValidator.js";
import { createPaymentMethod, getAllPaymentMethods } from "../controllers/paymentMethodController.js";
const router = express.Router();

// Create a new Payment Method
router.post(
  "/payment-methods",
  cookieAuthMiddleware,
  validateCreatePaymentMethod,
  createPaymentMethod
);

//Get all Payment Methods
router.get("/payment-methods", cookieAuthMiddleware, getAllPaymentMethods);
export default router;
