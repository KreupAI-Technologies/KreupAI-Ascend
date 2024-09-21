// routes/integrationRoutes.js
const express = require('express');
const router = express.Router();
const integrationController = require('../controllers/integrationController');

// Create integration
router.post('/', integrationController.createIntegration);

// Get all integrations
router.get('/', integrationController.getIntegrations);

// Get a single integration by ID
router.get('/:id', integrationController.getIntegrationById);

// Update an integration by ID
router.put('/:id', integrationController.updateIntegration);

// Delete an integration by ID
router.delete('/:id', integrationController.deleteIntegration);

module.exports = router;
