// Author: Thejeshwar
// Date: 23/09/2024
// Version: v1.0

import express from 'express';
import {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from '../controllers/crmAddressController.js';


const router = express.Router();


router.route('/')
  .post(createAddress)    // Create a new address
  .get(getAddresses);     // Get all addresses

router.route('/:id')
  .get(getAddressById)    // Get an address by ID
  .put(updateAddress)     // Update an address
  .delete(deleteAddress); // Delete an address

export default router;
