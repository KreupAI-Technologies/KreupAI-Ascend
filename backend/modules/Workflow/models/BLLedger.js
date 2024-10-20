import mongoose from "mongoose";

const BLLedgerSchema = new mongoose.Schema({
  Ledger: { type: String, required: true },
  BL_Code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BLGroup",
    required: true,
  },
  COAccountType: { type: String, required: true },
  From_Dim1: { type: String },
  To_Dim1: { type: String },
  From_Dim2: { type: String },
  To_Dim2: { type: String },
  From_Dim3: { type: String },
  To_Dim3: { type: String },
  From_Dim4: { type: String },
  To_Dim4: { type: String },
  From_Dim5: { type: String },
  To_Dim5: { type: String },
});

const BLLedger = mongoose.model("BLLedger", BLLedgerSchema);
export default BLLedger;
