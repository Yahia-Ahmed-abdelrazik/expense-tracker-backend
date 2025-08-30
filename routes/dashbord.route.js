import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDashbordData } from "../controllers/dashbord.controller.js";

const router = express.Router();

router.get("/", protect, getDashbordData);

export default router;
