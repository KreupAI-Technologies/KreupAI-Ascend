// Author: Thejeshwar
// Date: 23/09/2024
// Version: v1.0

import express from 'express';
import {
  createCountry,
  getCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
} from '../controllers/crmCountryController.js';



const router = express.Router();



router.route('/')
  .post(createCountry)    // Create a new country
  .get(getCountries);    

router.route('/:id')
  .get(getCountryById)    // Get a country by ID
  .put(updateCountry)     // Update a country
  .delete(deleteCountry); // Delete a country

export default router;
