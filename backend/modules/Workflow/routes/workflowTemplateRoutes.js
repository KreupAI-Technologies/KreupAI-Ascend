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

router.get("/", getAllWorkflowTemplates);
router.get("/:id", getWorkflowTemplateById);
router.post("/", createWorkflowTemplate);
router.put("/:id", updateWorkflowTemplate);
router.delete("/:id", deleteWorkflowTemplate);

export default router;
