//Khushi
//24-09-24

import express from 'express';
import { getAllLogs, createLog, getLogById } from '../controllers/auditLogController.js';

const router = express.Router();

router.get('/', getAllLogs);
router.post('/', createLog);
router.get('/:id', getLogById);

export default router;