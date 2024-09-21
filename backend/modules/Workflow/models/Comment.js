const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  incident_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment_text: { type: String, required: true },
  created_date: { type: Date, default: Date.now }
},
{collection:"Comments"}
);

module.exports = mongoose.model('Comment', CommentSchema);


