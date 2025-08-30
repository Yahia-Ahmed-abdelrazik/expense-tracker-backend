import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addIncom,
  getAllIncomes,
  deleteIncome,
  downloadIncomeExcel,
} from "../controllers/income.controller.js";

const router = express.Router();
router.post("/add", protect, addIncom);
router.get("/get", protect, getAllIncomes);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

export default router;
