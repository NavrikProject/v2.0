import routers from "express";
import {
  getAllMentorBookings,
  getBookingDatesOfOnlyMentor,
  getMentorAvailability,
  issueRefundForBooking,
  modifyAppointmentAndMakePayment,
  modifyBookingDate,
  modifyCreateOrder,
} from "../controllers/traineeBookingProfileController.js";

let router = routers.Router();

router.post("/get/bookings", getAllMentorBookings);

router.post("/get/bookings/onlymentor", getBookingDatesOfOnlyMentor);

router.post("/get/bookings/availability", getMentorAvailability);

router.put("/update/bookings/:id", modifyBookingDate);

router.post("/update/bookings/modify-order", modifyCreateOrder);

router.put(
  "/update/bookings/modify-booking/pay",
  modifyAppointmentAndMakePayment
);

router.post("/update/bookings/issue-refund", issueRefundForBooking);

export default router;
