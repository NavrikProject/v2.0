import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BookNowButton,
  BookNowButtonDiv,
  MentorBoxDiv,
  MentorDescP,
  MentorDetailsDiv,
  MentorName,
} from "./MentorCardElements";
import logo from "../../images/practi-logo.png";
import {
  MentorCourseBox,
  MentorDiv,
  MentorDownDiv,
  MentorImg,
  MentorImgDiv,
  MentorUpDiv,
} from "./MentorClubElements";
import "react-datepicker/dist/react-datepicker.css";
import "./MentorCardDate.css";
import DatePicker from "react-datepicker";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../utils/LoadingSpinner";
import dotenv from "dotenv";
dotenv.config();
const MentorCourseCard = ({ searchItemWord, categoryItem }) => {
  const [mentorDetails, setMentorDetails] = useState([]);
  const [date, setDate] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [mentorBookingDate, setMentorBookingDate] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  console.log(mentorDetails);
  useEffect(() => {
    try {
      const getAllMentorDetails = async () => {
        const res = await axios.get(
          !searchItemWord
            ? "/mentor/get/all"
            : `/mentor/get/mentors?name=${searchItemWord}`
        );
        setMentorDetails(res.data.mentors);
      };
      getAllMentorDetails();
    } catch (error) {
      return;
    }
  }, [searchItemWord]);

  useEffect(() => {
    try {
      const getAllMentorDetailsAvailability = async () => {
        const res = await axios.get(`/mentor/get/booking`);
        setMentorBookingDate(res.data);
      };
      getAllMentorDetailsAvailability();
    } catch (error) {
      return;
    }
  }, []);

  const bookMentorHandler = async (mentor) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await axios.post(
          "mentor/create/appointment/create-order",
          {
            mentorId: mentor.mentor_dtls_id,
            date: date.toLocaleDateString(),
          }
        );
        if (result.data.error) {
          return (
            toast.error(result.data.error, {
              position: "top-center",
            }),
            setLoading(false)
          );
        }
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get("/get-razorpay-key");
        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: "Navrik Software Solutions",
          description: "Paying for the mentor",
          image: logo,
          order_id: order_id,
          handler: async function (response) {
            const res = await axios.post(
              "mentor/create/appointment/pay-order",
              {
                amount: amount,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                mentorId: mentor.mentor_dtls_id,
                date: date.toLocaleDateString(),
                userEmail: user?.email,
                mentorEmail: mentor.mentor_email,
                from: mentor.mentor_availability_slot_from,
                to: mentor.mentor_availability_slot_to,
              }
            );
            if (res.data.success) {
              setSuccess(res.data.success);
              toast.success(res.data.success, {
                position: "top-center",
              });
              setLoading(false);
            }
            if (res.data.error) {
              setError(res.data.error);
              toast.error(res.data.error, {
                position: "top-center",
              });
              setLoading(false);
            }
          },
          prefill: {
            name: "example name",
            email: "email@example.com",
            contact: "111111",
          },
          theme: {
            color: "#80c0f0",
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  };

  // disable the list of custom dates
  function isWorkDay(available, date) {
    const weekDay = new Date(date).getDay();
    if (available === "weekends") {
      return (
        weekDay !== 1 &&
        weekDay !== 2 &&
        weekDay !== 3 &&
        weekDay !== 4 &&
        weekDay !== 5
      );
    } else if (available === "weekdays") {
      return weekDay !== 0 && weekDay !== 6;
    } else if (available === "saturday") {
      return weekDay === 6;
    } else if (available === "sunday") {
      return weekDay === 0;
    }
  }

  const getDate = (date, mentor) => {
    for (let i = 0; i < mentorBookingDate.length; i++) {
      const element = mentorBookingDate[i].mentorId;
      if (
        element === mentor.mentor_dtls_id &&
        new Date(date).toLocaleDateString() === mentorBookingDate[i].bookedDate
      ) {
        return "disabled-date";
      }
    }
  };

  return (
    <>
      {loading && <Loading />}
      {error && <p>please select the date</p>}
      {!categoryItem && mentorDetails?.length > 0
        ? mentorDetails?.map((mentor) => (
            <MentorDiv key={mentor.mentor_dtls_id}>
              <MentorUpDiv></MentorUpDiv>
              <MentorDownDiv>
                <MentorImgDiv>
                  <MentorImg
                    src="https://images.pexels.com/photos/4339867/pexels-photo-4339867.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="trainer picture"
                  />
                </MentorImgDiv>
                <MentorCourseBox>
                  <MentorBoxDiv>
                    <MentorDetailsDiv>
                      <MentorName>
                        {mentor.mentor_firstname + " " + mentor.mentor_lastname}
                      </MentorName>
                    </MentorDetailsDiv>
                  </MentorBoxDiv>
                  <MentorDescP>Skills: {mentor.mentor_skills}</MentorDescP>
                  <MentorDescP>
                    Experience:{mentor.mentor_experience}
                  </MentorDescP>
                  <MentorBoxDiv>
                    <MentorDescP>
                      Availability: {mentor.mentor_availability}
                    </MentorDescP>
                  </MentorBoxDiv>
                  <MentorBoxDiv>
                    <MentorDescP>
                      Price for One Session : {mentor.mentor_price}
                    </MentorDescP>
                  </MentorBoxDiv>
                  <MentorBoxDiv>
                    <MentorDescP>Choose the date:</MentorDescP>
                    <MentorDescP>
                      <DatePicker
                        closeOnScroll={true}
                        selected={date}
                        value={date}
                        onChange={(date) => setDate(date)}
                        minDate={new Date()}
                        maxDate={new Date(mentor.mentor_available_end_date)}
                        dayClassName={(date) => getDate(date, mentor)}
                        filterDate={(date) =>
                          isWorkDay(mentor.mentor_availability, date)
                        }
                      />
                    </MentorDescP>
                  </MentorBoxDiv>
                  <MentorBoxDiv>
                    <div className="booked"></div> The red color shows those are
                    not available
                  </MentorBoxDiv>
                  <MentorBoxDiv>
                    <MentorDescP>
                      Available From :
                      <strong>{mentor.mentor_availability_slot_from} </strong>
                      to: <strong>{mentor.mentor_availability_slot_to}</strong>
                    </MentorDescP>
                    <MentorDescP></MentorDescP>
                  </MentorBoxDiv>
                  <BookNowButtonDiv>
                    {!user ? (
                      <BookNowButton>
                        <Link to={"/login"}>Login</Link>
                      </BookNowButton>
                    ) : (
                      <BookNowButton onClick={() => bookMentorHandler(mentor)}>
                        Book now <i className="fa-solid fa-right-long"></i>
                      </BookNowButton>
                    )}
                  </BookNowButtonDiv>
                </MentorCourseBox>
              </MentorDownDiv>
            </MentorDiv>
          ))
        : null}
      {categoryItem
        ? mentorDetails
            .filter(
              (course) =>
                course.mentor_skills === categoryItem ||
                course.mentor_mentorship_area === categoryItem ||
                course.mentor_availability === categoryItem
            )
            .map((mentor) => (
              <MentorDiv key={mentor.mentor_dtls_id}>
                <MentorCourseBox>
                  <MentorBoxDiv>
                    <MentorDetailsDiv>
                      <MentorName>
                        {mentor.mentor_firstname + " " + mentor.mentor_lastname}
                      </MentorName>
                    </MentorDetailsDiv>
                  </MentorBoxDiv>
                  <MentorDescP>Skills: {mentor.mentor_skills}</MentorDescP>
                  <MentorDescP>
                    Experience:{mentor.mentor_experience}
                  </MentorDescP>
                  <MentorBoxDiv>
                    <MentorDescP>
                      Availability: {mentor.mentor_availability}
                    </MentorDescP>
                    <MentorDescP>
                      Specialty: {mentor.mentor_specialty}
                    </MentorDescP>
                  </MentorBoxDiv>
                  <MentorBoxDiv>
                    <MentorDescP>
                      Sessions Conducted:{mentor.mentor_session_conducted}
                    </MentorDescP>
                    <MentorDescP>
                      Price for One Session : {mentor.mentor_price}
                    </MentorDescP>
                  </MentorBoxDiv>
                  <MentorBoxDiv>
                    <MentorDescP>Choose the date :</MentorDescP>
                    <MentorDescP>
                      <DatePicker
                        closeOnScroll={true}
                        selected={date}
                        value={date}
                        onChange={(date) => setDate(date)}
                        minDate={new Date()}
                        maxDate={new Date(mentor.mentor_available_end_date)}
                        dayClassName={(date) => getDate(date, mentor)}
                        filterDate={(date) =>
                          isWorkDay(mentor.mentor_availability, date)
                        }
                      />
                    </MentorDescP>
                  </MentorBoxDiv>
                  <MentorBoxDiv>
                    <MentorDescP>
                      Available From :
                      <strong>{mentor.mentor_availability_slot_from} </strong>
                      to: <strong>{mentor.mentor_availability_slot_to}</strong>
                    </MentorDescP>
                    <MentorDescP></MentorDescP>
                  </MentorBoxDiv>
                  <BookNowButtonDiv>
                    {!user ? (
                      <BookNowButton>
                        <Link to={"/login"}>Login</Link>
                      </BookNowButton>
                    ) : (
                      <BookNowButton onClick={() => bookMentorHandler(mentor)}>
                        Book now <i className="fa-solid fa-right-long"></i>
                      </BookNowButton>
                    )}
                  </BookNowButtonDiv>
                </MentorCourseBox>
              </MentorDiv>
            ))
        : null}
    </>
  );
};

export default MentorCourseCard;
