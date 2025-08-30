import xlsx from "xlsx";
import Income from "../models/Income.js";

//Add income Source
const addIncom = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    //simple validation
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding income", error: err.message });
  }
};

//Get all incomes
const getAllIncomes = async (req, res) => {
  const userId = req.user.id;

  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching incomes", error: err.message });
  }
};

//ther is a simple one for del
//Delete income
const deleteIncome = async (req, res) => {
  const userId = req.user.id;
  const incomeId = req.params.id;

  try {
    const deletedIncome = await Income.findOneAndDelete({
      _id: incomeId,
      userId,
    });
    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting income", error: err.message });
  }
};

//Download excel
const downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    //parse incomes to excel
    const data = incomes.map((income) => ({
      Source: income.source,
      Amount: income.amount,
      Date: income.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Incomes");
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error downloading excel", error: err.message });
  }
};

export { addIncom, getAllIncomes, deleteIncome, downloadIncomeExcel };
