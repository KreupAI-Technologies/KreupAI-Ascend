// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
//  Description: This file defines the schema for the roles collection and creates the Role model.

import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import { addRole, deleteRole, getRole, getRoleById, searchRole, updateRole } from "../controllers/roleController.js";
const router = express.Router();

// Create a new role (admin only)
router.post("/roles", cookieAuthMiddleware, addRole);

// Get all roles (admin only)
router.get("/roles", cookieAuthMiddleware, getRole);

// Get a role by ID (admin only)
router.get("/roles/:id", cookieAuthMiddleware, getRoleById);

// Update a role (admin only)
router.put("/roles/:id", cookieAuthMiddleware, updateRole);

// Delete a role (admin only)
router.delete("/roles/:id", cookieAuthMiddleware, deleteRole);

// Search roles by name or description
router.get("/roles/search", cookieAuthMiddleware, searchRole);

export default router;
