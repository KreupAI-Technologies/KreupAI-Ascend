import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: { type: String, required: true, trim: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  created_date: { type: Date, default: Date.now },
  last_modified_date: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  this.last_modified_date = Date.now();
  next();
});

const User2 = mongoose.model("WorkflowUser", userSchema);

export default User2;
