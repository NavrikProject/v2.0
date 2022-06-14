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
import { MentorCourseBox, MentorDiv } from "./MentorClubElements";
import "react-datepicker/dist/react-datepicker.css";
import "./MentorCardDate.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import "rc-time-picker/assets/index.css";

import TimePicker from "rc-time-picker";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../utils/LoadingSpinner";

const showSecond = true;

const MentorCourseCard = ({ searchItemWord, categoryItem }) => {
  const [mentorDetails, setMentorDetails] = useState("");
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
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
      console.log(error.message);
    }
  }, [searchItemWord]);

  // useEffect(() => {
  //   try {
  //     const getAllMentorDetails = async () => {
  //       const res = await axios.get(
  //         `/mentor/get/mentors?name=${searchItemWord}`
  //       );
  //       setMentorDetails(res.data.mentors);
  //     };
  //     getAllMentorDetails();
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, [searchItemWord]);
  const price = 1000;
  const showDateForm = async (mentor) => {
    if (!date && timeSlot) {
    }
    try {
      const res = await axios.post("mentor/create/appointment", {
        mentor: mentor.mentor_dtls_id,
        date: date.toISOString().substring(0, 10),
        timeSlot: timeSlot,
        email: user?.email,
      });
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
    } catch (error) {
      console.log(error.message);
    }
  };
  const str = showSecond ? "HH:mm:ss" : "HH:mm";

  const now = moment().hour(14).minute(30);

  function generateOptions(length, excludedOptions) {
    const arr = [];
    for (let value = 0; value < length; value++) {
      if (excludedOptions.indexOf(value) < 0) {
        arr.push(value);
      }
    }
    return arr;
  }

  function onChangeTime(value) {
    setTimeSlot(value.format(str));
  }

  function disabledHours() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23];
  }
  function disabledMinutes(h) {
    switch (h) {
      case 9:
        return generateOptions(60, [30]);
      case 21:
        return generateOptions(60, [0]);
      default:
        return generateOptions(60, [0, 30]);
    }
  }

  function disabledSeconds(h, m) {
    return [h + (m % 60)];
  }
  // disable the list of custom dates
  const customDates = ["06/13/2022", "06/14/2022", "06/15/2022"];
  const disableCustomDt = (current) => {
    return customDates.includes(current.format("MM/DD/YYYY"));
  };
  function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }
  return (
    <>
      {loading && <Loading />}
      {!categoryItem && mentorDetails?.length > 0
        ? mentorDetails?.map((mentor) => (
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
                <MentorDescP>Experience:{mentor.mentor_experience}</MentorDescP>
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
                    Price for One Session : {`${price}`}
                  </MentorDescP>
                </MentorBoxDiv>
                <MentorBoxDiv>
                  <MentorDescP>Choose the date :</MentorDescP>
                  <MentorDescP>
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      minDate={new Date()}
                      dayClassName={(date) =>
                        date.getTime() === new Date("06/14/2022")
                          ? "disabled-date"
                          : undefined
                      }
                      excludeDates={[addDays(new Date(), 6)]}
                    />
                  </MentorDescP>
                </MentorBoxDiv>
                <MentorBoxDiv>
                  <MentorDescP>Choose the time slot :</MentorDescP>
                  <MentorDescP>
                    <TimePicker
                      showSecond={showSecond}
                      defaultValue={now}
                      onChange={onChangeTime}
                      disabledHours={disabledHours}
                      disabledMinutes={disabledMinutes}
                      disabledSeconds={disabledSeconds}
                    />
                  </MentorDescP>
                </MentorBoxDiv>
                <BookNowButtonDiv>
                  {!user ? (
                    <BookNowButton>
                      <Link to={"/login"}>Login</Link>
                    </BookNowButton>
                  ) : (
                    <BookNowButton onClick={() => showDateForm(mentor)}>
                      Book now
                    </BookNowButton>
                  )}
                </BookNowButtonDiv>
              </MentorCourseBox>
            </MentorDiv>
          ))
        : null}
      {categoryItem
        ? mentorDetails
            .filter(
              (course) =>
                course.mentor_skills === categoryItem ||
                course.mentor_mentorship_area === categoryItem
            )
            .map((mentor) => (
              <MentorDiv>
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
                      Price for One Session : {`${price}`}
                    </MentorDescP>
                  </MentorBoxDiv>
                  <MentorBoxDiv>
                    <MentorDescP>Choose the date :</MentorDescP>
                    <MentorDescP>
                      <input
                        type="date"
                        name="date"
                        onChange={(event) => setDate(event.target.value)}
                      />
                    </MentorDescP>
                  </MentorBoxDiv>
                  <MentorBoxDiv>
                    <MentorDescP>Choose the time slot :</MentorDescP>
                    <MentorDescP>
                      <input
                        type="time"
                        name="time"
                        onChange={(event) => setTimeSlot(event.target.value)}
                      />
                    </MentorDescP>
                  </MentorBoxDiv>
                  <BookNowButtonDiv>
                    <BookNowButton onClick={() => showDateForm(mentor)}>
                      Book now
                    </BookNowButton>
                  </BookNowButtonDiv>
                </MentorCourseBox>
              </MentorDiv>
            ))
        : null}
    </>
  );
};

export default MentorCourseCard;
