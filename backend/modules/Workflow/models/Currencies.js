import mongoose from "mongoose";

const { Schema } = mongoose;

const CurrenciesSchema = new Schema({
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
