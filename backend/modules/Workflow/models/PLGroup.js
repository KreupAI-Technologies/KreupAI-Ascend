import mongoose from "mongoose";

const PLGroupSchema = new mongoose.Schema({
  PLCode: { type: String, required: true, unique: true },
  PLDescription: { type: String, required: true },
});

const PLGroup = mongoose.model("PLGroup", PLGroupSchema);
export default PLGroup;
