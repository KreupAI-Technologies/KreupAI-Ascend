import mongoose from "mongoose";

const { Schema } = mongoose;

const roleSchema = new Schema({
  role_name: {
    type: String,
    required: true,
  },
  role_description: {
    type: String,
  },
  permissions: {
    type: [String],
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  last_modified_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  last_modified_date: {
    type: Date,
    default: Date.now,
  },
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
