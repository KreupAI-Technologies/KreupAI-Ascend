import express from 'express';
import {
  createAssociate,
  getAssociates,
  getAssociateById,
  deleteAssociate
} from '../../../controllers/associatesController.js';

const router = express.Router();

// Create a new Association
router.post('/', createAssociate);

// Get all Associations (optionally by user_id)
router.get('/', getAssociates);

// Get a single Association by ID
router.get('/:id', getAssociateById);

// Delete an Association
router.delete('/:id', deleteAssociate);

export default router;

