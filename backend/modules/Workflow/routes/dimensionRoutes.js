import express from "express";
import {
  createDimension,
  getDimensions,
  getDimensionById,
  updateDimension,
  deleteDimension,
} from "../controllers/dimensionController.js";

const router = express.Router();

router.post("/dimension/", createDimension);
router.get("/dimension/", getDimensions);
router.get("/dimension/:id", getDimensionById);
router.put("/dimension/:id", updateDimension);
router.delete("/dimension/:id", deleteDimension);

export default router;
