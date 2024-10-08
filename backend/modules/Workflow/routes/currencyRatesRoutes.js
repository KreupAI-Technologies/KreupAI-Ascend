import express from "express";
import {
  createCurrencyRate,
  getCurrencyRates,
  getCurrencyRateById,
  updateCurrencyRate,
  deleteCurrencyRate,
} from "../controllers/currencyRatesController.js";

const router = express.Router();

router.post("/currencyRates/", createCurrencyRate);
router.get("/currencyRates/", getCurrencyRates);
router.get("/currencyRates/:id", getCurrencyRateById);
router.put("/currencyRates/:id", updateCurrencyRate);
router.delete("/currencyRates/:id", deleteCurrencyRate);

export default router;






