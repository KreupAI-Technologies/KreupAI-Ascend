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
router.post('/', createStandardRule);

// Get all Standard Rules
router.get('/', getStandardRules);

// Get a single Standard Rule by ID
router.get('/:id', getStandardRuleById);

// Update a Standard Rule
router.put('/:id', updateStandardRule);

// Delete a Standard Rule
router.delete('/:id', deleteStandardRule);

export default router;
