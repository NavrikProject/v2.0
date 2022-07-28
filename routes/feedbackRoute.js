import express from "express";
import { insertFeedBackController } from "../controllers/feedbackController.js";
let router = express.Router();

router.post("/", insertFeedBackController);
export default router;
