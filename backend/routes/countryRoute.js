// Author   : Bosco Sabu John
// Date   : 16/09/2024
// Version  : v1.0
// Description : This file defines the routes for the countries collection.

import express from "express";
import { createCountry, deleteCountry, getCountries, getCountryById, searchCountries, updateCountry } from "../controllers/countryController.js";

const router = express.Router();

// CREATE a new country
router.post("/Countries", createCountry);

// READ all countries
router.get("/Countries", getCountries);

// READ a country by ID
router.get("/Countries/:id", getCountryById);

// UPDATE a country
router.put("/Countries/:id", updateCountry);

// DELETE a country
router.delete("/Countries/:id", deleteCountry);

// SEARCH countries by code or name
router.get("/countries/search", searchCountries);

export default router;
