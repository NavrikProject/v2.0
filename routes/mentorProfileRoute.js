import routers from "express";
import {
  getAllMentorBookings,
  getBookingDatesOfOnlyMentor,
  getMentorAvailability,
  modifyBookingDate,
  modifyCreateOrder,
} from "../controllers/mentorProfileController.js";

let router = routers.Router();

router.post("/get/bookings", getAllMentorBookings);
router.post("/get/bookings/onlymentor", getBookingDatesOfOnlyMentor);
router.post("/get/bookings/availability", getMentorAvailability);

router.put("/update/bookings/:id", modifyBookingDate);

router.post("/update/bookings/modify-order", modifyCreateOrder);
export default router;
