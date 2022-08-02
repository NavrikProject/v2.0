import express from "express";
import {
  getFeedbackMentorController,
  insertFeedBackController,
} from "../controllers/feedbackController.js";
let router = express.Router();

router.post("/", insertFeedBackController);
router.post("/get/mentor-feedback", getFeedbackMentorController);
export default router;
