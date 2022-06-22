import routers from "express";
import {
  registerMentor,
  getAllMentorDetails,
  updateMentorApprove,
  updateMentorDisapprove,
  getAllMentorApprovedDetails,
  getMentorBySearch,
  createMentorAppointment,
  getAllMentorApprovedDetailsAndAvailability,
  getBookingDates,
  createMentorRazorPayOrder,
} from "../controllers/mentorController.js";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken.js";
let router = routers.Router();

router.post("/register", registerMentor);
router.get("/get", verifyTokenAndAuthorization, getAllMentorDetails);

router.get("/get/all", getAllMentorApprovedDetails);

router.get("get/available", getAllMentorApprovedDetailsAndAvailability);
//update the mentor to approve
router.put("/approve/:id", verifyTokenAndAuthorization, updateMentorApprove);

//update the mentor to disapprove
router.put(
  "/disapprove/:id",
  verifyTokenAndAuthorization,
  updateMentorDisapprove
);

router.get("/get/mentors", getMentorBySearch);

router.post("/create/appointment/pay-order", createMentorAppointment);

//creating the mentor route
router.post("/create/appointment/create-order", createMentorRazorPayOrder);

router.get("/get/booking", getBookingDates);

export default router;
