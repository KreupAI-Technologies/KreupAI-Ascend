import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware";
import {
    validateCreatePriceBook,
    validateUpdatePriceBook,
} from "../../../utils/priceBookValidator.js";
import {
    createPriceBook,
    deletePriceBook,
    getAllPriceBook,
    getPriceBookById,
    updatePriceBook,
} from "../controllers/priceBookController.js";

const router = express.Router();

// Create a new Price Book
router.post(
    "/price-books",
    authMiddleware,
   validateCreatePriceBook,
   createPriceBook
    
  );

  // Get all Price Books
router.get("/price-books", cookieAuthMiddleware, getAllPriceBook);

  // Get a Price Book by ID
router.get("/price-books/:id", cookieAuthMiddleware, getPriceBookById);

  // Update a Price Book
router.put(
    "/price-books/:id",
    cookieAuthMiddleware,
    validateUpdatePriceBook,
    updatePriceBook
    
    
  );

  // Delete a Price Book
router.delete("/price-books/:id", cookieAuthMiddleware, deletePriceBook);

export default router;  