import mongoose from "mongoose";

const bankLedgerSchema = new mongoose.Schema({
  bankCode: { type: String, required: true },
  bpMethod: { type: String, required: true },
  transactionType: { type: String, required: true },
  bpStep: { type: String, required: true },
  sequence: { type: Number, required: true },
  ledgerCode: { type: String, required: true },
  dim1: { type: String, required: false },
  dim2: { type: String, required: false },
  dim3: { type: String, required: false },
  dim4: { type: String, required: false },
  dim5: { type: String, required: false },
  debitCredit: { type: String, required: true },
});

export const BankLedger = mongoose.model("BankLedger", bankLedgerSchema);
