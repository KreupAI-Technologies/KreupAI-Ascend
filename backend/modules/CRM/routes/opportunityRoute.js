// backend/routes/opportunities.routes.js

import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
    validateCreateOpportunity,
    validateUpdateOpportunity,
} from "../../../utils/opportunityValidator.js";
import {
    createOpportunity,
    deleteOpportunity,
    getOpportunityById,
    getOpportunity,
    updateOpportunity,
} from "../controllers/opportunityController.js";

const router = express.Router();

// Create a new Opportunity
router.post(
    "/opportunities",
    cookieAuthMiddleware,
    validateCreateOpportunity,
    createOpportunity
);

// Get all Opportunites
router.get("/opportunities", cookieAuthMiddleware, getOpportunity);

// Get an Opportunity by ID
router.get("/opportunities/:id", cookieAuthMiddleware, getOpportunityById);

// Update an Opportunity
router.put(
    "/opportunities/:id",
    cookieAuthMiddleware,
    validateUpdateOpportunity,
    updateOpportunity
);

// Delete an Opportunity
router.delete("/opportunities/:id", cookieAuthMiddleware, deleteOpportunity);

export default router;
