import mongoose from "mongoose";

const CurrenciesSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
});

const Currencies = mongoose.model("Currencies", CurrenciesSchema);

export default Currencies;
