import mongoose from "mongoose";

const CashTypeSchema = new mongoose.Schema({
  Code: { type: String, required: true },
  Description: { type: String, required: true },
  Types: { type: String, required: true }, // Refers to Subledger Types
});

export default mongoose.model("CashType", CashTypeSchema);
