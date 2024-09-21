const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  title: String,
  description: String,
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},
{collection:"Incident"});

module.exports = mongoose.model('Incident', IncidentSchema);
