import CurrencyRates from "../models/CurrencyRates.js";

// Create new currency rate
export const createCurrencyRate = async (req, res) => {
  try {
    const newRate = new CurrencyRates(req.body);
    await newRate.save();
    res.status(201).json(newRate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all currency rates
export const getCurrencyRates = async (req, res) => {
  try {
    const rates = await CurrencyRates.find().populate(
      "baseCurrency linkedCurrency"
    );
    res.status(200).json(rates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single currency rate by ID
export const getCurrencyRateById = async (req, res) => {
  try {
    const rate = await CurrencyRates.findById(req.params.id).populate(
      "baseCurrency linkedCurrency"
    );
    if (!rate) return res.status(404).json({ message: "Rate not found" });
    res.status(200).json(rate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update currency rate by ID
export const updateCurrencyRate = async (req, res) => {
  try {
    const rate = await CurrencyRates.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!rate) return res.status(404).json({ message: "Rate not found" });
    res.status(200).json(rate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete currency rate by ID
export const deleteCurrencyRate = async (req, res) => {
  try {
    const rate = await CurrencyRates.findByIdAndDelete(req.params.id);
    if (!rate) return res.status(404).json({ message: "Rate not found" });
    res.status(200).json({ message: "Rate deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
