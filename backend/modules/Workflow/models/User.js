const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  role: { type: String, enum: ['user', 'manager', 'admin'], required: true }, // Roles for authorization
},
{collection:"User"});

module.exports = mongoose.model('User', UserSchema);
