import mongoose from "mongoose";

const ledgerSummarySchema = new mongoose.Schema(
  {
    // Reference to COAccount collection
    ledger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "COAccount",
      required: true,
    },

    // Reference to Periods collection
    year_period: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Periods",
      required: true,
    },

    // Reference to Currencies collection
    currency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Currencies",
      required: true,
    },

    FC_Amount_Debit: { type: Number, required: true },
    FC_Amount_Credit: { type: Number, required: true },
    FC_Amount_Balance: { type: Number, required: true },
    HC_Amount_Debit: { type: Number, required: true },
    HC_Amount_Credit: { type: Number, required: true },
    HC_Amount_Balance: { type: Number, required: true },
  },
  { timestamps: true }
);

const LedgerSummary = mongoose.model("LedgerSummary", ledgerSummarySchema);

export default LedgerSummary;
