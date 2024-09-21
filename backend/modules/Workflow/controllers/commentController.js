const Comment = require('../models/Comment');
const Incident = require('../models/Incident');
const User = require('../models/User');

// Add comment to an incident
exports.addComment = async (req, res, next) => {
  const { incident_id } = req.params;
  const { user_id, comment_text } = req.body;

  try {
    const incident = await Incident.findById(incident_id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    const comment = new Comment({
      incident_id,
      user_id,
      comment_text,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

// Get comments for an incident
exports.getComments = async (req, res, next) => {
  const { incident_id } = req.params;

  try {
    const comments = await Comment.find({ incident_id }).populate('user_id', 'name role');
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// Delete a comment
exports.deleteComment = async (req, res, next) => {
  const { incident_id, comment_id } = req.params;
  const { user_id } = req.body; // User making the delete request

  try {
    // Find the incident
    const incident = await Incident.findById(incident_id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    // Find the comment
    const comment = await Comment.findById(comment_id);
    if (!comment || comment.incident_id.toString() !== incident_id) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Find the user making the request
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Authorization check: only incident owner or users with 'manager' role can delete comments
    const isIncidentOwner = incident.owner_id.toString() === user_id;  // Check if the user is the owner of the incident
    const isManager = user.role === 'manager';                        // Check if the user is a manager

    // If the user is neither the owner nor a manager, deny the request
    if (!isIncidentOwner && !isManager) {
      return res.status(403).json({ message: 'Permission denied: You are not authorized to delete this comment' });
    }

    // Delete the comment using findByIdAndDelete
    await Comment.findByIdAndDelete(comment_id);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
  }
};
