import express from "express";
import {
  getAllBankLedgers,
  createBankLedger,
  updateBankLedger,
  deleteBankLedger,
} from "../controllers/bankLedger.controller.js";

const router = express.Router();

// Get all Bank Ledger entries
router.get("/", getAllBankLedgers);

// Create a new Bank Ledger entry
router.post("/", createBankLedger);

// Update a Bank Ledger entry
router.put("/:id", updateBankLedger);

// Delete a Bank Ledger entry
router.delete("/:id", deleteBankLedger);

export default router;
