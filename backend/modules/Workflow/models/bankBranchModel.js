import mongoose from "mongoose";

const BankBranchSchema = new mongoose.Schema({
  BankCode: { type: String, required: true },
  BankDescription: { type: String, required: true },
  BankAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
  },
});

export default mongoose.model("BankBranch", BankBranchSchema);
