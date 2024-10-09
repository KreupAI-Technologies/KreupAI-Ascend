// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: This file defines the schema for the addresses collection and creates the Address model.

import express from "express";
import cookieAuthMiddleware from "../middleware/cookieAuthMiddleware.js";
import {
  createAddress,
  deleteAddress,
  getAddressById,
  getAddresses,
  updateAddress,
} from "../controllers/addressController.js";

const router = express.Router();

// CREATE a new address
router.post("/addresses", cookieAuthMiddleware, createAddress);

// READ all addresses
router.get("/addresses", cookieAuthMiddleware, getAddresses);

// READ an address by ID
router.get("/addresses/:id", cookieAuthMiddleware, getAddressById);

// UPDATE an address
router.put("/addresses/:id", cookieAuthMiddleware, updateAddress);

// DELETE an address
router.delete("/addresses/:id", cookieAuthMiddleware, deleteAddress);

export default router;
