import express from "express";
import {
  getAllAssignments,
  createAssignment,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from "../controllers/assignmentController.js";

const router = express.Router();

router.route("/").get(getAllAssignments).post(createAssignment);

router
  .route("/:id")
  .get(getAssignmentById)
  .put(updateAssignment)
  .delete(deleteAssignment);

export default router;
