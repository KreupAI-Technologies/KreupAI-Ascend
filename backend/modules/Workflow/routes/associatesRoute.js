import express from 'express';
import {
  createAssociate,
  getAssociates,
  getAssociateById,
  deleteAssociate
} from '../controllers/associatesController.js';

const router = express.Router();

// Create a new Association
router.post('/associates', createAssociate);

// Get all Associations (optionally by user_id)
router.get('/associates', getAssociates);

// Get a single Association by ID
router.get('/associates/:id', getAssociateById);

// Delete an Association
router.delete('/associates/:id', deleteAssociate);

export default router;

