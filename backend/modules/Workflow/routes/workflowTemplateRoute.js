//Debayan
//21.9.24

import express from "express";
import {
  getAllWorkflowTemplates,
  getWorkflowTemplateById,
  createWorkflowTemplate,
  updateWorkflowTemplate,
  deleteWorkflowTemplate,
} from "../controllers/workflowTemplateController.js";

const router = express.Router();

router.post("/workflowTemplate", createWorkflowTemplate);
router.get("/workflowTemplate", getAllWorkflowTemplates);
router.get("/workflowTemplate/:id", getWorkflowTemplateById);
router.put("/workflowTemplate/:id", updateWorkflowTemplate);
router.delete("/workflowTemplate/:id", deleteWorkflowTemplate);

export default router;
