import express from "express";
import {
  getFeedbackByMentorName,
  getFeedbackMentorController,
  insertFeedBackController,
} from "../controllers/feedbackController.js";
let router = express.Router();

router.post("/", insertFeedBackController);
router.post("/get/mentor-feedback", getFeedbackMentorController);
router.get("/get/mentor-feedback/mentors", getFeedbackByMentorName);

export default router;
