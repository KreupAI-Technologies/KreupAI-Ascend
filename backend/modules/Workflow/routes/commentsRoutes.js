import express from 'express';
import { addComment, getComments, deleteComment } from '../controllers/commentsController.js';

const router = express.Router();

router.post('/:incident_id/comments', addComment);
router.get('/:incident_id/comments', getComments);
router.delete('/:incident_id/comments/:comment_id', deleteComment);

export default router;
