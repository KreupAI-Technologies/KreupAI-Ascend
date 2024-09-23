

import express from 'express';
import {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
} from '../controllers/crmAccountController.js';

const router = express.Router();

// Account routes
router.route('/')
  .post(createAccount)    // Create a new account
  .get(getAccounts);      // Get all accounts

router.route('/:id')
  .get(getAccountById)    // Get an account by ID
  .put(updateAccount)     // Update an account
  .delete(deleteAccount); // Delete an account

export default router;
