import Country from "../models/countryModel.js";

// CREATE a new country
export const createCountry = async (req, res) => {
  try {
    const { code, name, currency, description } = req.body;

    const country = new Country({
      code,
      name,
      currency,
      description,
    });

    await country.save();
    res.status(201).json(country);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ all countries
export const getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ a country by ID
export const getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) return res.status(404).json({ message: "Country not found" });
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a country
export const updateCountry = async (req, res) => {
  try {
    const { code, name, currency, description } = req.body;

    const country = await Country.findByIdAndUpdate(
      req.params.id,
      { code, name, currency, description },
      { new: true, runValidators: true }
    );

    if (!country) return res.status(404).json({ message: "Country not found" });
    res.json(country);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a country
export const deleteCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);
    if (!country) return res.status(404).json({ message: "Country not found" });
    res.json({ message: "Country deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH countries by code or name
export const searchCountries = async (req, res) => {
  try {
    const { code, name } = req.query;
    const query = {};

    if (code) {
      query.code = code.toUpperCase();
    }

    if (name) {
      query.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    const countries = await Country.find(query);
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
