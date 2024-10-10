import mongoose from "mongoose";

const DimensionSchema = new mongoose.Schema({
  dimType: {
    type: String,
    required: true,
  },
  dimCode: {
    type: String,
    required: true,
  },
  dimension: {
    type: String,
    required: true,
  },
  parentDim: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dimension",
  },
  subLevel: {
    type: Number,
  },
});

const Dimension = mongoose.model("Dimension", DimensionSchema);

export default Dimension;
