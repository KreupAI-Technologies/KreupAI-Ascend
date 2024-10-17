import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
  validateCreateCall,
  validateUpdateCall,
} from "../../../utils/callValidator.js";
import {
  createCall,
  getCallById,
  getCalls,
  updateCall,
  deleteCall,
} from "../controllers/callController.js";
const router = express.Router();

// Create a new Call
router.post("/calls", cookieAuthMiddleware, createCall, validateCreateCall);

// Get all Calls
router.get("/calls", cookieAuthMiddleware, getCalls);

// Get a Call by ID
router.get("/calls/:id", cookieAuthMiddleware, getCallById);

// Update a Call
router.put("/calls/:id", cookieAuthMiddleware, updateCall, validateUpdateCall);

// Delete a Call
router.delete("/calls/:id", cookieAuthMiddleware, deleteCall);

export default router;
