//Khushi
//24-09-24
import Comment from '../models/Comments.js';
import Incident from '../models/Incident.js';
//user 
import User2 from '../models/User2.js';

export const addComment = async (req, res, next) => {
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

export const getComments = async (req, res, next) => {
  const { incident_id } = req.params;

  try {
    const comments = await Comment.find({ incident_id }).populate('user_id', 'name role');
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const { incident_id, comment_id } = req.params;
  const { user_id } = req.body;

  try {
    const incident = await Incident.findById(incident_id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    const comment = await Comment.findById(comment_id);
    if (!comment || comment.incident_id.toString() !== incident_id) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const user = await User2.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isIncidentOwner = incident.owner_id.toString() === user_id;
    const isManager = user.role === 'manager';

    if (!isIncidentOwner && !isManager) {
      return res.status(403).json({ message: 'Permission denied: You are not authorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(comment_id);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
  }
};
