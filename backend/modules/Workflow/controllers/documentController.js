//Debayan
//21.9.24

import Document from "../models/Document.js";

// Get all documents
export const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single document by ID
export const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document)
      return res.status(404).json({ message: "Document not found" });
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new document
export const createDocument = async (req, res) => {
  const document = new Document(req.body);
  try {
    const newDocument = await document.save();
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a document
export const updateDocument = async (req, res) => {
  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDocument)
      return res.status(404).json({ message: "Document not found" });
    res.json(updatedDocument);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a document
export const deleteDocument = async (req, res) => {
  try {
    const deletedDocument = await Document.findByIdAndDelete(req.params.id);
    if (!deletedDocument)
      return res.status(404).json({ message: "Document not found" });
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
