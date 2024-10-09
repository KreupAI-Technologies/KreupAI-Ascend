import express from "express";
import {
  createCity,
  deleteCity,
  getCities,
  getCitiesByStateId,
  getCityById,
  searchCities,
  updateCity,
} from "../controllers/cityController.js";

const router = express.Router();

// CREATE a new city
router.post("/cities", createCity);

// READ all cities
router.get("/cities", getCities);

// READ cities by state ID
router.get("/cities/state/:stateId", getCitiesByStateId);

// READ a city by ID
router.get("/cities/:id", getCityById);

// UPDATE a city
router.put("/cities/:id", updateCity);

// DELETE a city
router.delete("/cities/:id", deleteCity);

// SEARCH cities by name
router.get("/cities/search/:name", searchCities);

export default router;
