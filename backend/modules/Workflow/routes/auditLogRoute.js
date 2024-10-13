//Khushi
//24-09-24

import express from 'express';
import { getAllLogs, createLog, getLogById } from '../controllers/auditLogController.js';

const router = express.Router();

router.post('/', createLog);
router.get('/', getAllLogs);
router.get('/:id', getLogById);

export default router;