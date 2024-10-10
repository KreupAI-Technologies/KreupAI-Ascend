import express from "express";
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "../controllers/workflowRoleController.js";

const router = express.Router();

// Create a new role
router.post("/roles", createRole);

// List all roles
router.get("/roles", getAllRoles);

// Get a role by ID
router.get("/roles/:id", getRoleById);

// Update a role by ID
router.put("/roles/:id", updateRole);

// Delete a role by ID
router.delete("/roles/:id", deleteRole);

export default router;
