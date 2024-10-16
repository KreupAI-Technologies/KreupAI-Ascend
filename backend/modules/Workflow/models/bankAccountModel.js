import mongoose from "mongoose";

const BankAccountSchema = new mongoose.Schema({
  AccountNo: { type: String, required: true },
  BankCode: { type: String, required: true },
  Currency: { type: String, required: true },
});

export default mongoose.model("BankAccount", BankAccountSchema);
