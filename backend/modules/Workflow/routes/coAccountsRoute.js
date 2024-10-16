// routes/coAccountsRoutes.js
import express from 'express';
import { createCOAccount } from '../controllers/coAccountsController.js'; // Assuming you have a controller set up

const router = express.Router();

// Define the POST route for creating a new COAccount
router.post('/coAccounts', createCOAccount);

export default router;
