//Khushi
//24-09-24

import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    incident_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment_text: { type: String, required: true },
    created_date: { type: Date, default: Date.now }
  },
  { collection: "Comments" }
);

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
