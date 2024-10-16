import express from "express";
import {
  createIntegrationProcess,
  deleteIntegrationProcess,
  getIntegrationProcessById,
  getIntegrationProcesses,
  updateIntegrationProcess,
} from "../controllers/integrationProcessController.js";

const router = express.Router();

// Create a new integration process
router.post("/integration-processes", createIntegrationProcess);

// Get all integration processes
router.get("/integration-processes", getIntegrationProcesses);

// Get a single integration process by ID
router.get("/integration-processes/:id", getIntegrationProcessById);

// Update an integration process by ID
router.put("/integration-processes/:id", updateIntegrationProcess);

// Delete an integration process by ID
router.delete("/integration-processes/:id", deleteIntegrationProcess);

export default router;
