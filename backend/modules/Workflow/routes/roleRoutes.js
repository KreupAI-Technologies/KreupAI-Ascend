import express from "express";
import {
  createRole,
  getRole,
  updateRole,
  deleteRole,
  listRoles,
} from "../controllers/roleController.js";

const router = express.Router();

// Create a new role
router.post("/roles", createRole);

// Get a role by ID
router.get("/roles/:id", getRole);

// Update a role by ID
router.put("/roles/:id", updateRole);

// Delete a role by ID
router.delete("/roles/:id", deleteRole);

// List all roles
router.get("/roles", listRoles);

export default router;
