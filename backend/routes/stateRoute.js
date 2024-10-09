// Author: Bosco Sabu John
// Date: 16/09/2024
// Version: v1.0
// Description: This file defines the routes for the states collection.

import express
 from "express";
import { createState, deleteState, getStateById, getStates, getStatesByCountryId, searchStates, updateState } from "../controllers/stateController.js";

const router = express.Router();

// CREATE a new state
router.post('/states', createState);

// READ all states
router.get('/states', getStates);

// READ states by country code
router.get('/states/country/:countryId', getStatesByCountryId);

// READ a state by ID
router.get('/states/:id', getStateById);

// UPDATE a state
router.put('/states/:id', updateState);

// DELETE a state
router.delete('/states/:id', deleteState);

// SEARCH states by code or name
router.get('/states/search', searchStates);

export default router;