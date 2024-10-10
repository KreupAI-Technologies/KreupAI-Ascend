import Contact from "../models/contactModel";
import { validationResult } from "express-validator";

// Create a new Contact
export const createContact = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contactData = req.body;

    // Create a new Contact instance
    const contact = new Contact(contactData);
    await contact.save();

    // Populate references for the response
    await contact
      .populate("userId", "firstName lastName username")
      .populate("industryId", "name")
      .populate("leadSubSourceId", "name")
      .populate("statusId", "name")
      .populate("ratingId", "name")
      .populate("addressId")
      .populate("reportingTo", "firstName lastName email")
      .populate("clientId", "clientName")
      .execPopulate();

    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .populate("userId", "firstName lastName username")
      .populate("industryId", "name")
      .populate("leadSubSourceId", "name")
      .populate("statusId", "name")
      .populate("ratingId", "name")
      .populate("addressId")
      .populate("reportingTo", "firstName lastName email")
      .populate("clientId", "clientName");
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Contact by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate("userId", "firstName lastName username")
      .populate("industryId", "name")
      .populate("leadSubSourceId", "name")
      .populate("statusId", "name")
      .populate("ratingId", "name")
      .populate("addressId")
      .populate("reportingTo", "firstName lastName email")
      .populate("clientId", "clientName");
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Contact
export const updateContact = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updates = req.body;

    // Update the contact
    const contact = await Contact.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    })
      .populate("userId", "firstName lastName username")
      .populate("industryId", "name")
      .populate("leadSubSourceId", "name")
      .populate("statusId", "name")
      .populate("ratingId", "name")
      .populate("addressId")
      .populate("reportingTo", "firstName lastName email")
      .populate("clientId", "clientName");

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Contact
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
