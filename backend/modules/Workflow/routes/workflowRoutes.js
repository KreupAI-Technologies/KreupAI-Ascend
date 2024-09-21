import express from "express";
import {
  createWorkflow,
  getWorkflows,
  getWorkflowById,
  updateWorkflow,
  deleteWorkflow,
} from "../controllers/workflowController.js";

const router = express.Router();

router.post("/workflows", createWorkflow);
router.get("/workflows", getWorkflows);
router.get("/workflows/:id", getWorkflowById);
router.put("/workflows/:id", updateWorkflow);
router.delete("/workflows/:id", deleteWorkflow);

export default router;
