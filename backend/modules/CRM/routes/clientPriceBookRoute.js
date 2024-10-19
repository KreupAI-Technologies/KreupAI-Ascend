import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
    validateCreateClientPriceBook,
    validateUpdateClientPriceBook,
} from "../../../utils/clientPriceBookValidator.js";
import {
    createClientPriceBook,
    deleteClientPriceBook,
    getClientPriceBooks,
    getClientPriceBookById,
    updateClientPriceBook,
} from "../controllers/clientPriceBookController.js";

const router = express.Router();

// Create a new Client Price Book
router.post(
    "/client-price-books",
    cookieAuthMiddleware,
    validateCreateClientPriceBook,
    createClientPriceBook
    
);

  // Get all Client Price Books
router.get("/client-price-books", cookieAuthMiddleware, getClientPriceBooks );

  // Get a Client Price Book by ID
router.get("/client-price-books/:id", cookieAuthMiddleware, getClientPriceBookById );

  // Update a Client Price Book
router.put(
    "/client-price-books/:id",
    cookieAuthMiddleware,
    validateUpdateClientPriceBook,
    updateClientPriceBook
   
    
  );

  // Delete a Client Price Book
router.delete("/client-price-books/:id", cookieAuthMiddleware, deleteClientPriceBook );

export default router;
  