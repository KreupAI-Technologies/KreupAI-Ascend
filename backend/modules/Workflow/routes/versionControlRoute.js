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

router.post("/versionControl", createVersionControl);
router.get("/versionControl", getAllVersionControls);
router.get("/versionControl/:id", getVersionControlById);
router.put("/versionControl/:id", updateVersionControl);
router.delete("/versionControl/:id", deleteVersionControl);

export default router;
