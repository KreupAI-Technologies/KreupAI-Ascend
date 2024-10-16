// backend/routes/accounts.routes.js

import express from "express";
import cookieAuthMiddleware from "../../../middleware/cookieAuthMiddleware.js";
import {
  validateCreateAccount,
  validateUpdateAccount,
} from "../../../utils/accountValidator.js";
import {
  createAccount,
  deleteAccount,
  getAccountById,
  getAccounts,
  updateAccount,
} from "../controllers/accountController.js";

const router = express.Router();

// Create a new Account
router.post(
  "/accounts",
  cookieAuthMiddleware,
  validateCreateAccount,
  createAccount
);

// Get all Accounts
router.get("/accounts", cookieAuthMiddleware, getAccounts);

// Get an Account by ID
router.get("/accounts/:id", cookieAuthMiddleware, getAccountById);

// Update an Account
router.put(
  "/accounts/:id",
  cookieAuthMiddleware,
  validateUpdateAccount,
  updateAccount
);

// Delete an Account
router.delete("/accounts/:id", cookieAuthMiddleware, deleteAccount);

export default router;
