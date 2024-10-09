// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: This file defines the schema for the user roles collection and creates the UserRole model.

import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
  assignRole,
  getRolesForUser,
  getUsersForRole,
  removeRoleFromUser,
} from "../controllers/userRoleController.js";

const router = express.Router();
// Assign a role to a user (admin only)
router.post("/user-roles", cookieAuthMiddleware, assignRole);

// Get roles for a user
router.get("/user-roles/user/:userId", cookieAuthMiddleware, getRolesForUser);

// Get users for a role
router.get("/user-roles/role/:roleId", cookieAuthMiddleware, getUsersForRole);

// Remove a role from a user (admin only)
router.delete("/user-roles", cookieAuthMiddleware, removeRoleFromUser);

export default router;
