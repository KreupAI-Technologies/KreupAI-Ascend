import express from "express";
import {
  getBLLedgers,
  createBLLedger,
  updateBLLedger,
  deleteBLLedger,
} from "../controllers/BLLedgerController.js";

const router = express.Router();

router.get("/", getBLLedgers);
router.post("/", createBLLedger);
router.put("/:id", updateBLLedger);
router.delete("/:id", deleteBLLedger);

export default router;
