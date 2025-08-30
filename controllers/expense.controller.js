import xlsx from "xlsx";
import Expense from "../models/Expense.js";

//Add Expense Source
const addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    //simple validation
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding expense", error: err.message });
  }
};

//Get all Expenses
const getAllExpenses = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expense);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching expense", error: err.message });
  }
};

//Delete Expense
const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting expense", error: err.message });
  }
};

//Download excel
const downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    //parse expenses to excel
    const data = expenses.map((expense) => ({
      category: expense.category,
      Amount: expense.amount,
      Date: expense.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "expenses");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error downloading excel", error: err.message });
  }
};

export { addExpense, getAllExpenses, deleteExpense, downloadExpenseExcel };
