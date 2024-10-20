import express from "express";
import {
  getPLLedgers,
  createPLLedger,
  updatePLLedger,
  deletePLLedger,
} from "../controllers/PLLedgerController.js";

const router = express.Router();

router.get("/", getPLLedgers);
router.post("/", createPLLedger);
router.put("/:id", updatePLLedger);
router.delete("/:id", deletePLLedger);

export default router;
