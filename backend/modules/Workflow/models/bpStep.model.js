import mongoose from "mongoose";

const bpStepSchema = new mongoose.Schema({
  step: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const BPStep = mongoose.model("BPStep", bpStepSchema);
