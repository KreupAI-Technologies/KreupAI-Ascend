import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
    validateCreateDeliveryTerm,
    validateUpdateDeliveryTerm,
} from "../../../utils/deliveryTermValidator.js";
import {
    createDeliveryTerm,
    deleteDeliveryTerm,
    getAllDeliveryTerms,
    getDeliveryTermById,
    updateDeliveryTerm,
} from "../controllers/deliveryTermController.js";

const router = express.Router();

// Create a new Delivery Term
router.post(
    "/delivery-terms",
    cookieAuthMiddleware,
    validateCreateDeliveryTerm,
    createDeliveryTerm
);

// Get all Delivery Terms
router.get("/delivery-terms", cookieAuthMiddleware, getAllDeliveryTerms);

// Get a Delivery Term by ID
router.get("/delivery-terms/:id", cookieAuthMiddleware, getDeliveryTermById);

// Update a Delivery Term
router.put(
    "/delivery-terms/:id",
    cookieAuthMiddleware,
    validateUpdateDeliveryTerm,
    updateDeliveryTerm
);

// Delete a Delivery Term
router.delete("/delivery-terms/:id", cookieAuthMiddleware, deleteDeliveryTerm);

export default router;
