import express from 'express';
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
const router = express.Router();


// Create a new Payment Method
router.post( '/payment-methods',cookieAuthMiddleware,validateCreatePaymentMethod, createPaymentMethod );
export default router;