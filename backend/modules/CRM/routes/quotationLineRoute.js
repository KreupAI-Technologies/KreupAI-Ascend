import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
    validateCreateQuotationLine,
    validateUpdateQuotationLine,
} from "../../../utils/quotationLineValidator.js";
import {
    createQuotationLine,
    deleteQuotationLine,
    getAllQuotationLines,
    getQuotationLineById,
    updateQuotationLine,
} from "../controllers/quotationLineController.js";

const router = express.Router();

// Create a new Quotation Line
router.post(
    "/quotation-lines",
    cookieAuthMiddleware,
    validateCreateQuotationLine,
    createQuotationLine,
   
  );

  // Get all Quotation Lines for a Quotation
router.get("/quotations/:quotationId/lines", cookieAuthMiddleware, getAllQuotationLines );

  // Get a Quotation Line by ID
router.get("/quotation-lines/:id", cookieAuthMiddleware, getQuotationLineById );

  // Update a Quotation Line
router.put(
    "/quotation-lines/:id",
    cookieAuthMiddleware,
    validateUpdateQuotationLine,
    updateQuotationLine,    
  );

  // Delete a Quotation Line
router.delete("/quotation-lines/:id", cookieAuthMiddleware, deleteQuotationLine );

 export default router;
  