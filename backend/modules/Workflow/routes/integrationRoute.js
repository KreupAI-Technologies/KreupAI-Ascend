import express from "express";
import {
  createIntegration,
  getIntegrations,
  getIntegrationById,
  updateIntegration,
  deleteIntegration,
} from "../controllers/integrationController.js";

const router = express.Router();

// Create a new integration
router.post("/integrations", createIntegration);

// Get all integrations
router.get("/integrations", getIntegrations);

// Get a single integration by ID
router.get("/integrations/:id", getIntegrationById);

// Update an integration by ID
router.put("/integrations/:id", updateIntegration);

// Delete an integration by ID
router.delete("/integrations/:id", deleteIntegration);

export default router;
