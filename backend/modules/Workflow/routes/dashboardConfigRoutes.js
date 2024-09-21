const express = require('express');
const router = express.Router();
const dashboardConfigController = require('../controllers/dashboardConfigController');

// Routes for dashboard configurations
router.get('/user/:userId', dashboardConfigController.getDashboardConfigsByUser);
router.post('/', dashboardConfigController.createDashboardConfig);
router.put('/:id', dashboardConfigController.updateDashboardConfig);
router.delete('/:id', dashboardConfigController.deleteDashboardConfig);

module.exports = router;
