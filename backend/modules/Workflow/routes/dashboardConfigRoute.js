//Khushi
//24-09-24
// routes/dashboardConfigRoutes.js

import express from 'express';
import { getDashboardConfigsByUser, createDashboardConfig, updateDashboardConfig, deleteDashboardConfig } from '../controllers/dashboardConfigController.js';

const router = express.Router();

router.post('/dashboardConfig', createDashboardConfig);
router.get('/dashboardConfig/user/:userId', getDashboardConfigsByUser);
router.put('/dashboardConfig/:id', updateDashboardConfig);
router.delete('/dashboardConfig/:id', deleteDashboardConfig);

export default router;
