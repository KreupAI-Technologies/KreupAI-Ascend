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

router.post("/aiInsight", createAIInsight);
router.get("/aiInsight", getAllAIInsights);
router.get("/aiInsight/:id", getAIInsightById);
router.put("/aiInsight/:id", updateAIInsight);
router.delete("/aiInsight/:id", deleteAIInsight);

export default router;
