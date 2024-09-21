const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dashboardConfigSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  widget_type: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  filter_settings: { type: Object, required: false },
},{collection:"Dashboard Config"});

module.exports = mongoose.model('DashboardConfig', dashboardConfigSchema);