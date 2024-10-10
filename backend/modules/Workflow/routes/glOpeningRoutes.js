// routes/glOpeningRoutes.js
import express from 'express';
import {
  createGLOpening,
  getGLOpenings,
  getGLOpeningById,
  updateGLOpening,
  deleteGLOpening,
} from '../controllers/glOpeningController.js';

const router = express.Router();

router.post('/', createGLOpening);
router.get('/', getGLOpenings);
router.get('/:id', getGLOpeningById);
router.put('/:id', updateGLOpening);
router.delete('/:id', deleteGLOpening);

export default router;
