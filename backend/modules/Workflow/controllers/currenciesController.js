import Currencies from "../models/Currencies.js";

// Create new currency
export const createCurrency = async (req, res) => {
  const { code, currency } = req.body;
  try {
    const newCurrency = new Currencies({ code, currency });
    await newCurrency.save();
    res.status(201).json(newCurrency);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all currencies
export const getCurrencies = async (req, res) => {
  try {
    const currencies = await Currencies.find();
    res.status(200).json(currencies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single currency by ID
export const getCurrencyById = async (req, res) => {
  try {
    const currency = await Currencies.findById(req.params.id);
    if (!currency)
      return res.status(404).json({ message: "Currency not found" });
    res.status(200).json(currency);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update currency by ID
export const updateCurrency = async (req, res) => {
  try {
    const currency = await Currencies.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!currency)
      return res.status(404).json({ message: "Currency not found" });
    res.status(200).json(currency);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete currency by ID
export const deleteCurrency = async (req, res) => {
  try {
    const currency = await Currencies.findByIdAndDelete(req.params.id);
    if (!currency)
      return res.status(404).json({ message: "Currency not found" });
    res.status(200).json({ message: "Currency deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
