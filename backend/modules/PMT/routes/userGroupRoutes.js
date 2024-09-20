import express from 'express';
import { createUserGroup, getUserGroups } from '../../controllers/PMT_controllers/userGroupController.js';


const router = express.Router();

router.post('/', createUserGroup);
router.get('/', getUserGroups);

export default router;
