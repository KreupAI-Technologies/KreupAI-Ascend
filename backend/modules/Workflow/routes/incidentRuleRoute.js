import express from "express";
import {
  getAllIncidentRules,
  createIncidentRule,
  getIncidentRuleById,
  updateIncidentRule,
  deleteIncidentRule,
} from "../controllers/incidentRuleController.js";

const router = express.Router();

router.route("/").get(getAllIncidentRules).post(createIncidentRule);

router
  .route("/:id")
  .get(getIncidentRuleById)
  .put(updateIncidentRule)
  .delete(deleteIncidentRule);

export default router;