// Author: Thejeshwar
// Date: 23/09/2024
// Version: v1.0

import express from 'express';
import {
  createCity,
  getCities,
  getCityById,
  updateCity,
  deleteCity,
} from '../controllers/crmCityController.js';



const router = express.Router();


router.route('/')
  .post(createCity)    // Create a new city
  .get(getCities);     // Get all cities

router.route('/:id')
  .get(getCityById)    // Get a city by ID
  .put(updateCity)     // Update a city
  .delete(deleteCity); // Delete a city

export default router;
