import mongoose from "mongoose";

const BLGroupSchema = new mongoose.Schema({
  BLCode: { type: String, required: true, unique: true },
  BLDescription: { type: String, required: true },
});

const BLGroup = mongoose.model("BLGroup", BLGroupSchema);
export default BLGroup;
