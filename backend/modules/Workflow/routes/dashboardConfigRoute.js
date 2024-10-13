//Khushi
//24-09-24
// routes/dashboardConfigRoutes.js

import express from 'express';
import { getDashboardConfigsByUser, createDashboardConfig, updateDashboardConfig, deleteDashboardConfig } from '../controllers/dashboardConfigController.js';

const router = express.Router();

router.post('/', createDashboardConfig);
router.get('/user/:userId', getDashboardConfigsByUser);
router.put('/:id', updateDashboardConfig);
router.delete('/:id', deleteDashboardConfig);

export default router;
