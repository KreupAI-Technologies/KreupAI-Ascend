// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: This file defines the schema for the departments collection and creates the Department model.

import express from "express";
import {
  createDepartment,
  getAllDepartment,
  getDepartmentByDivisionId,
  getDepartment,
  updateDepartment,
  deleteDepartment,
  searchDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

// CREATE a new department
router.post("/departments", createDepartment);

// READ all departments
router.get("/departments", getAllDepartment);

// READ departments by Division ID
router.get("/departments/division/:divisionId", getDepartmentByDivisionId);

// READ a department by ID
router.get("/departments/:id", getDepartment);

// UPDATE a department
router.put("/departments/:id", updateDepartment);

// DELETE a department
router.delete("/departments/:id", deleteDepartment);

// SEARCH departments by name
router.get("/departments/search", searchDepartment);

export default router;
