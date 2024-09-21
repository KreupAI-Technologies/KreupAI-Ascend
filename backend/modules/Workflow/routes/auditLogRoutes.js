const express = require('express');
const router = express.Router();
const auditLogController = require('../controllers/auditLogController');

// Get all logs
router.get('/', auditLogController.getAllLogs);

// Create a new log
router.post('/', auditLogController.createLog);

// Get a log by ID
router.get('/:id', auditLogController.getLogById);

module.exports = router;