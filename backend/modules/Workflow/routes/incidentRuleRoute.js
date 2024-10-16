import express from "express";
import {
  getAllIncidentRules,
  createIncidentRule,
  getIncidentRuleById,
  updateIncidentRule,
  deleteIncidentRule,
} from "../controllers/incidentRuleController.js";

const router = express.Router();

router.route("/incidentRule").get(getAllIncidentRules).post(createIncidentRule);

router
  .route("/incidentRule:id")
  .get(getIncidentRuleById)
  .put(updateIncidentRule)
  .delete(deleteIncidentRule);

export default router;