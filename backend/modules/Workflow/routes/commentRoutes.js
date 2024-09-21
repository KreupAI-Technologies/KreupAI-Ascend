const express = require('express');
const { addComment, getComments, deleteComment } = require('../controllers/commentController');

const router = express.Router();

// Add a comment to an incident
router.post('/:incident_id/comments', addComment);

// Get all comments for an incident
router.get('/:incident_id/comments', getComments);

// Delete a comment from an incident
router.delete('/:incident_id/comments/:comment_id', deleteComment);

module.exports = router;