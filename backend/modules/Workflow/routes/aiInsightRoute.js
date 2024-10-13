//Debayan
//21.9.24

import express from "express";
import {
  getAllAIInsights,
  getAIInsightById,
  createAIInsight,
  updateAIInsight,
  deleteAIInsight,
} from "../controllers/aiInsightController.js";

const router = express.Router();

router.post("/", createAIInsight);
router.get("/", getAllAIInsights);
router.get("/:id", getAIInsightById);
router.put("/:id", updateAIInsight);
router.delete("/:id", deleteAIInsight);

export default router;
