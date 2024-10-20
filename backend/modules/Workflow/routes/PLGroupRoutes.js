import express from "express";
import {
  getPLGroups,
  createPLGroup,
  updatePLGroup,
  deletePLGroup,
} from "../controllers/PLGroupController.js";

const router = express.Router();

router.get("/", getPLGroups);
router.post("/", createPLGroup);
router.put("/:id", updatePLGroup);
router.delete("/:id", deletePLGroup);

export default router;
