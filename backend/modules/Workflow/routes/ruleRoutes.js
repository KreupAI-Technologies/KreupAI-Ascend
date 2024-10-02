import express from "express";
import {
  createRule,
  getRules,
  getRuleById,
  updateRule,
  deleteRule,
} from "../controllers/ruleController.js";

const router = express.Router();

// Create a new rule (POST /api/rules)
router.post("/rules", createRule);

// Get all rules (GET /api/rules)
router.get("/rules", getRules);

// Get a rule by ID (GET /api/rules/:id)
router.get("/rules/:id", getRuleById);

// Update a rule by ID (PUT /api/rules/:id)
router.put("/rules/:id", updateRule);

// Delete a rule by ID (DELETE /api/rules/:id)
router.delete("/rules/:id", deleteRule);

export default router;
