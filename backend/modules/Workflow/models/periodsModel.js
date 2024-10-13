// models/Periods.js
import mongoose from "mongoose";

const periodsSchema = new mongoose.Schema({
  Month: { type: String, required: true },
  Description: { type: String, required: true },
});

const Periods = mongoose.model("Periods", periodsSchema);
export default Periods;