import express from "express";
import {
  createDivision,
  deleteDivision,
  getAllDivision,
  getDivision,
  searchDivision,
  updateDivision,
} from "../controllers/crmDivisionController.js";

const router = express.Router();

// CREATE a new division
router.post("/divisions", createDivision);

// READ all divisions
router.get("/divisions", getAllDivision);

// READ a division by ID
router.get("/divisions/:id", getDivision);

// UPDATE a division
router.put("/divisions/:id", updateDivision);

// DELETE a division
router.delete("/divisions/:id", deleteDivision);

// SEARCH divisions by code or name
router.get("/divisions/search", searchDivision);

export default router;
