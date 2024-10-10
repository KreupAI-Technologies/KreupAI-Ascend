//Debayan
//21.9.24

import express from "express";
import {
  getAllVersionControls,
  getVersionControlById,
  createVersionControl,
  updateVersionControl,
  deleteVersionControl,
} from "../controllers/versionControlController.js";

const router = express.Router();

router.post("/", createVersionControl);
router.get("/", getAllVersionControls);
router.get("/:id", getVersionControlById);
router.put("/:id", updateVersionControl);
router.delete("/:id", deleteVersionControl);

export default router;
