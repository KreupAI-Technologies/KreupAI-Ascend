//Khushi
//24-09-24

import express from 'express';
import { getAllLogs, createLog, getLogById } from '../controllers/auditLogController.js';

const router = express.Router();

router.post('/auditLog', createLog);
router.get('/auditLog', getAllLogs);
router.get('/auditLog/:id', getLogById);

export default router;