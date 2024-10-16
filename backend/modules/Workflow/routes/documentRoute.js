//Debayan
//21.9.24

import express from "express";
import {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/documentController.js";

const router = express.Router();

router.get("/document", getAllDocuments);
router.get("/document/:id", getDocumentById);
router.post("/document/", createDocument);
router.put("/document/:id", updateDocument);
router.delete("/document/:id", deleteDocument);

export default router;
