import Address from "../models/addressModel.js";
import mongoose from "mongoose";

// CREATE a new address
export const createAddress = async (req, res) => {
  try {
    const { addressLines, cityId, stateId, countryId, postalCode } = req.body;

    // Validate addressLines
    if (
      !addressLines ||
      !Array.isArray(addressLines) ||
      addressLines.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "At least one address line is required" });
    }

    // Optional: Validate cityId, stateId, countryId if provided
    if (cityId && !mongoose.Types.ObjectId.isValid(cityId)) {
      return res.status(400).json({ message: "Invalid City ID" });
    }
    if (stateId && !mongoose.Types.ObjectId.isValid(stateId)) {
      return res.status(400).json({ message: "Invalid State ID" });
    }
    if (countryId && !mongoose.Types.ObjectId.isValid(countryId)) {
      return res.status(400).json({ message: "Invalid Country ID" });
    }

    const address = new Address({
      addressLines,
      cityId,
      stateId,
      countryId,
      postalCode,
    });

    await address.save();

    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ all addresses
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find()
      .populate("cityId", "name")
      .populate("stateId", "name")
      .populate("countryId", "name");
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ an address by ID
export const getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id)
      .populate("cityId", "name")
      .populate("stateId", "name")
      .populate("countryId", "name");
    if (!address) return res.status(404).json({ message: "Address not found" });
    res.json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE an address
export const updateAddress = async (req, res) => {
  try {
    const updates = req.body;

    // Validate addressLines if provided
    if (updates.addressLines) {
      if (
        !Array.isArray(updates.addressLines) ||
        updates.addressLines.length === 0 ||
        updates.addressLines.length > 3
      ) {
        return res.status(400).json({
          message:
            "Address must have at least one line and at most three lines.",
        });
      }
    }

    // Validate IDs if provided
    if (updates.cityId && !mongoose.Types.ObjectId.isValid(updates.cityId)) {
      return res.status(400).json({ message: "Invalid City ID" });
    }
    if (updates.stateId && !mongoose.Types.ObjectId.isValid(updates.stateId)) {
      return res.status(400).json({ message: "Invalid State ID" });
    }
    if (
      updates.countryId &&
      !mongoose.Types.ObjectId.isValid(updates.countryId)
    ) {
      return res.status(400).json({ message: "Invalid Country ID" });
    }

    const address = await Address.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    })
      .populate("cityId", "name")
      .populate("stateId", "name")
      .populate("countryId", "name");

    if (!address) return res.status(404).json({ message: "Address not found" });
    res.json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE an address
export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) return res.status(404).json({ message: "Address not found" });
    res.json({ message: "Address deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
