import routers from "express";
import {
  getAllMentorBookingsInProfile,
  getMentorAllAttendedSessions,
  getMentorAllCompletedSessions,
  getMentorAllRefundedSessions,
  getMentorAllUpcomingSessions,
  updateMentorAttendedSessions,
  updateTheConfirmAppointment,
} from "../controllers/mentorBookingController.js";

import {
  verifyToken,
  verifyTokenAndAuthorization,
} from "../middleware/verifyToken.js";
let router = routers.Router();

router.post("/get/all-bookings", getAllMentorBookingsInProfile);

router.put("/update/confirm/appointment/:id", updateTheConfirmAppointment);

router.post("/get/all-bookings/upcoming", getMentorAllUpcomingSessions);

router.post(
  "/get/all-bookings/attended/update",
  verifyToken,
  updateMentorAttendedSessions
);
router.post("/get/all-bookings/attended", getMentorAllAttendedSessions);
router.post("/get/all-bookings/completed", getMentorAllCompletedSessions);
router.post("/get/all-bookings/refunded", getMentorAllRefundedSessions);
export default router;
