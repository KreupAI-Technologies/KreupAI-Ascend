import express from "express";
import {
  createDivision,
  deleteDivision,
  getDivisions,
  getDivision,
  searchDivisions,
  updateDivision,
} from "../controllers/divisionController.js";

const router = express.Router();

// CREATE a new division
router.post("/divisions", createDivision);

// READ all divisions
router.get("/divisions", getDivisions);

// READ a division by ID
router.get("/divisions/:id", getDivision);

// UPDATE a division
router.put("/divisions/:id", updateDivision);

// DELETE a division
router.delete("/divisions/:id", deleteDivision);

// SEARCH divisions by code or name
router.get("/divisions/search", searchDivisions);

export default router;
