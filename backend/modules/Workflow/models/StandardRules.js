import mongoose from 'mongoose';
import User from './User.js'; 
import Status from './Status.js'; 
import Division from './Division.js'; // Assuming you have a Division model


const StandardRulesSchema = new mongoose.Schema({
  RuleID: {
    type: String,
    required: true,
    trim: true,
  },
  Sequence: {
    type: Number,
    required: true,
    min: 0,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  Division: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Division',
    required: true,
  },
  monthly_limit: {
    type: Number,
    required: true,
    min: 0,
  },
  permission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
    required: true,
  },
  amount_from: {
    type: Number,
    required: true,
    min: 0,
  },
  amount_to: {
    type: Number,
    required: true,
    min: 0,
  },
  effective_from: {
    type: Date,
    required: true,
  },
  effective_till: {
    type: Date,
    required: true,
  },
  Reminder1_duration: {
    type: Number,
    required: true,
    min: 0,
  },
  Reminder2_duration: {
    type: Number,
    required: true,
    min: 0,
  },
  Escalation_duration: {
    type: Number,
    required: true,
    min: 0,
  },
}, { collection: "StandardRules" });

// Use pre-validation hook to check the amount_to and effective_till values
StandardRulesSchema.pre('validate', function (next) {
  // Ensure amount_to is greater than or equal to amount_from
  if (this.amount_to < this.amount_from) {
    return next(new Error('amount_to must be greater than or equal to amount_from.'));
  }

  // Ensure effective_till is greater than or equal to effective_from
  if (this.effective_till < this.effective_from) {
    return next(new Error('effective_till must be greater than or equal to effective_from.'));
  }

  next();
});

export default mongoose.model('StandardRules', StandardRulesSchema);
