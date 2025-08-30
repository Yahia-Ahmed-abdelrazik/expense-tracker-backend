import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addExpense,
  getAllExpenses,
  deleteExpense,
  downloadExpenseExcel,
} from "../controllers/expense.controller.js";

const router = express.Router();
router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpenses);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);

export default router;
