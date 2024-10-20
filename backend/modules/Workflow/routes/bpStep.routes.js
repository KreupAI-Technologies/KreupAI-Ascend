import express from "express";
import {
  getAllBPSteps,
  createBPStep,
  updateBPStep,
  deleteBPStep,
} from "../controllers/bpStep.controller.js";

const router = express.Router();

// Get all BP Steps
router.get("/", getAllBPSteps);

// Create a new BP Step
router.post("/", createBPStep);

// Update a BP Step
router.put("/:id", updateBPStep);

// Delete a BP Step
router.delete("/:id", deleteBPStep);

export default router;
