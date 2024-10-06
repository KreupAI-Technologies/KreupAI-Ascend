import express from "express";

import {
  createCurrency,
  getCurrencies,
  getCurrencyById,
  updateCurrency,
  deleteCurrency,
} from "../controllers/currenciesController.js";

const router = express.Router();

router.post("/currencies/", createCurrency);
router.get("/currencies/", getCurrencies);
router.get("/currencies/:id", getCurrencyById);
router.put("/currencies/:id", updateCurrency);
router.delete("/currencies/:id", deleteCurrency);

export default router;
