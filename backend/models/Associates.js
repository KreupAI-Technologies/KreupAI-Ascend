import mongoose from 'mongoose';

const AssociatesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  associate_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// Prevent associating a user with themselves
AssociatesSchema.pre('save', function (next) {
  if (this.user_id.equals(this.associate_id)) {
    next(new Error('A user cannot associate with themselves.'));
  } else {
    next();
  }
});

// Prevent duplicate associations
AssociatesSchema.index({ user_id: 1, associate_id: 1 }, { unique: true });

const Associates = mongoose.model('Associates', AssociatesSchema);
export default Associates;


