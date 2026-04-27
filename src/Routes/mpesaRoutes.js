import express from "express";
import { initiateSTK } from "../Api/controllers/mpesaController.js";

const router = express.Router();

router.post("/stk", initiateSTK);

export default router;