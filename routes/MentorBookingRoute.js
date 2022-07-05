import routers from "express";
import {
  getAllMentorBookingsInProfile,
  updateTheConfirmAppointment,
} from "../controllers/mentorBookingController.js";

import { verifyTokenAndAuthorization } from "../middleware/verifyToken.js";
let router = routers.Router();

router.post("/get/all-bookings", getAllMentorBookingsInProfile);

router.put("/update/confirm/appointment/:id", updateTheConfirmAppointment);

export default router;
