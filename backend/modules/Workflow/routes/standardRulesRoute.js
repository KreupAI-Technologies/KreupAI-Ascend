import express from 'express';
import { 
  createStandardRule, 
  getStandardRules, 
  getStandardRuleById, 
  updateStandardRule, 
  deleteStandardRule 
} from '../controllers/standardRulesController.js';

const router = express.Router();

// Create a new Standard Rule
router.post('/standardRules', createStandardRule);

// Get all Standard Rules
router.get('/standardRules', getStandardRules);

// Get a single Standard Rule by ID
router.get('/standardRules/:id', getStandardRuleById);

// Update a Standard Rule
router.put('/standardRules/:id', updateStandardRule);

// Delete a Standard Rule
router.delete('/standardRules/:id', deleteStandardRule);

export default router;
