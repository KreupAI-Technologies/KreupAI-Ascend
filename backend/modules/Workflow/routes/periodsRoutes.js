import express from "express";
import {
  getPeriods,
  getPeriodById,
  createPeriod,
  updatePeriod,
  deletePeriod,
} from "../controllers/periodsController.js";

const router = express.Router();

// Route to get all periods
router.get("/periods/", getPeriods);

// Route to get a specific period by ID
router.get("/periods/:id", getPeriodById);

// Route to create a new period
router.post("/periods/", createPeriod);

// Route to update a period by ID
router.put("/periods/:id", updatePeriod);

// Route to delete a period by ID
router.delete("/periods/:id", deletePeriod);

export default router;