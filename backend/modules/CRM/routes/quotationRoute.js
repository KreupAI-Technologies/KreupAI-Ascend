import express from "express";
import {
    createQuotation,
    deleteQuotation,
    getQuotationById,
    getQuotations,
    updateQuotation,
} from "../controllers/QuotationController.js";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";

const router = express.Router();

// Create a new Quotation
router.post("/quotations", cookieAuthMiddleware, createQuotation);

// Get all Leads
router.get("/quotations", cookieAuthMiddleware, getQuotations);

// Get a Quotation by ID
router.get("/quotations/:id", cookieAuthMiddleware, getQuotationById);

// Update a Quotation
router.put("/quotations/:id", cookieAuthMiddleware, updateQuotation);

// Delete a Quotation
router.delete("/quotations/:id", cookieAuthMiddleware, deleteQuotation);



export default router;