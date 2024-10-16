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

router.post('/glOpening', createGLOpening);
router.get('/glOpening', getGLOpenings);
router.get('/glOpening/:id', getGLOpeningById);
router.put('/glOpening/:id', updateGLOpening);
router.delete('/glOpening/:id', deleteGLOpening);

export default router;
