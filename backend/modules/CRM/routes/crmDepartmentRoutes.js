// routes/departmentRoutes.js

import express from 'express';
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from '../controllers/crmDepartmentController.js';

const router = express.Router();

// Department routes
router.route('/')
  .post(createDepartment)    // Create a new department
  .get(getDepartments);      // Get all departments

router.route('/:id')
  .get(getDepartmentById)    // Get a department by ID
  .put(updateDepartment)     // Update a department
  .delete(deleteDepartment); // Delete a department

export default router;
