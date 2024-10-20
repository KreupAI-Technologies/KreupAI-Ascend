import express from "express";
import {
  getBLGroups,
  createBLGroup,
  updateBLGroup,
  deleteBLGroup,
} from "../controllers/BLGroupController.js";

const router = express.Router();

router.get("/", getBLGroups);
router.post("/", createBLGroup);
router.put("/:id", updateBLGroup);
router.delete("/:id", deleteBLGroup);

export default router;
