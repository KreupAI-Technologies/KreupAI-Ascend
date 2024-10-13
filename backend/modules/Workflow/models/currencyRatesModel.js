import mongoose from "mongoose";

const CurrencyRatesSchema = new mongoose.Schema({
  baseCurrency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currencies",
    required: true,
  },
  linkedCurrency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currencies",
    required: true,
  },
  purchaseRate: {
    type: Number,
    required: true,
  },
  salesRate: {
    type: Number,
    required: true,
  },
  journalRate: {
    type: Number,
    required: true,
  },
  effectiveFrom: {
    type: Date,
    required: true,
  },
  effectiveTill: {
    type: Date,
  },
});

const CurrencyRates = mongoose.model("CurrencyRates", CurrencyRatesSchema);

export default CurrencyRates;
