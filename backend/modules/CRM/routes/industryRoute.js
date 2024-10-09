import express from "express";
import {
  createIndustry,
  deleteIndustry,
  getIndustries,
  getIndustryById,
  searchIndustries,
  updateIndustry,
} from "../controllers/industryController.js";

const router = express.Router();

// CREATE a new industry
router.post("/industries", createIndustry);

// READ all industries
router.get("/industries", getIndustries);

// READ an industry by ID
router.get("/industries/:id", getIndustryById);

// UPDATE an industry
router.put("/industries/:id", updateIndustry);

// DELETE an industry
router.delete("/industries/:id", deleteIndustry);

// SEARCH for industries by name / Code

router.get("/industries/search/:searchText", searchIndustries);

export default router;
