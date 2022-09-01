import axios from "axios";
// swiper core styles
import "swiper/swiper.min.css";

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookNowButton,
  MentorBioDesc,
  MentorBoxDiv,
  MentorCoverDiv,
  MentorDesignation,
  MentorDetailsDiv,
  MentorDetailsDivFlex,
  MentorDetailsImgDiv,
  MentorDetailsName,
  MentorIndSection,
  MentorLanguages,
  MentorLanguagesDiv,
  MentorMsgButton,
  MentorName,
  MentorProfileAvailDiv,
  MentorProfileDateDiv,
  MentorProfileDiv,
  MentorProfileDivFlex,
  MentorProfileDivLeft,
  MentorProfileDivRight,
  MentorProfileImg,
  MentorRatingDiv,
  MentorRatingDivSlider,
  MentorRatingTitles,
  MentorRatingWrapper,
  MentorSectionDiv,
  MentorTimeSlotDiv,
  RatingContent,
  RatingContentDiv,
  RatingContentStarDiv,
  RatingContentText,
  RatingContentTraineeName,
  RatingImg,
} from "./MentorIndividualElements";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import "../MentorCardDate.css";

import DatePicker from "react-datepicker";
import ConfirmModel from "./ConfirmModel";
import GoToTop from "../../GoToTop";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

const MentorIndividual = ({ socket }) => {
  const location = useLocation();
  let path = location.pathname.split("/")[3];
  const [indMentor, setIndMentor] = useState([]);
  const [date, setDate] = useState();
  const [mentorBookingDate, setMentorBookingDate] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sendMentor, setSendMentor] = useState();
  const [mentorFeedback, setMentorFeedback] = useState([]);
  useEffect(() => {
    try {
      const getIndMentorDetails = async () => {
        const res = await axios.get(
          `/mentor/get/individual/mentors?name=${path}`
        );
        setIndMentor(res.data);
      };
      getIndMentorDetails();
    } catch (error) {
      return;
    }
  }, [path]);

  useEffect(() => {
    try {
      const getIndMentorFeedback = async () => {
        const res = await axios.get(
          `/feedback/get/mentor-feedback/mentors?name=${path}`
        );
        setMentorFeedback(res.data.data);
      };
      getIndMentorFeedback();
    } catch (error) {
      return;
    }
  }, [path]);
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
  const setTimeSlotActive = (e) => {
    setIsActive(!isActive);
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
  const showModalHandler = (mentor) => {
    if (
      new Date().toLocaleDateString() === new Date(date).toLocaleDateString()
    ) {
      return toast.error("Today's can not be selected", {
        position: "top-center",
      });
    }
    if (!date) {
      return toast.error("Please choose select date", {
        position: "top-center",
      });
    }
    setShowModal(!showModal);
    setSendMentor(mentor);
  };
  const user = useSelector((state) => state.user.currentUser);

  return (
    <MentorIndSection>
      {showModal && (
        <ConfirmModel
          socket={socket}
          showModalHandler={showModalHandler}
          sendMentor={sendMentor}
          date={date}
        />
      )}
      <MentorCoverDiv></MentorCoverDiv>
      {indMentor?.map((mentor) => (
        <MentorSectionDiv key={mentor.mentor_dtls_id}>
          <MentorDetailsDiv>
            <MentorDetailsDivFlex>
              <MentorDetailsName>
                <MentorName>
                  {mentor.mentor_firstname +
                    " " +
                    mentor.mentor_lastname +
                    " " +
                    " "}
                </MentorName>
                <MentorDesignation>
                  {" " + mentor.mentor_current_role + " "}
                </MentorDesignation>
                at
                <MentorDesignation>
                  {" " + mentor.mentor_firm}
                </MentorDesignation>
                <br />
                <MentorMsgButton>
                  Message <i className="fa-solid fa-message"></i>
                </MentorMsgButton>
                <MentorMsgButton>
                  Share Profile <i className="fa-solid fa-share-nodes"></i>
                </MentorMsgButton>
              </MentorDetailsName>
              <MentorDetailsImgDiv>
                <MentorProfileImg
                  src={mentor.mentor_image}
                  alt="Mentor profile picture"
                />
              </MentorDetailsImgDiv>
            </MentorDetailsDivFlex>
          </MentorDetailsDiv>
          <MentorDetailsDiv>
            <h1>OverView</h1>
            <hr />
            <MentorProfileDiv>
              <MentorProfileDivFlex>
                <MentorProfileDivLeft>
                  <MentorBioDesc>{mentor.mentor_bio}</MentorBioDesc>
                  <MentorLanguagesDiv>
                    <MentorLanguages>
                      Skills Known: <span>{mentor.mentor_skills}</span>
                    </MentorLanguages>
                  </MentorLanguagesDiv>
                  <MentorLanguagesDiv>
                    <MentorLanguages>
                      Expertise In: <span>{mentor.mentor_mentorship_area}</span>
                    </MentorLanguages>
                  </MentorLanguagesDiv>
                  <MentorLanguagesDiv>
                    <MentorLanguages>
                      Languages Known: <span>English</span>
                    </MentorLanguages>
                  </MentorLanguagesDiv>
                </MentorProfileDivLeft>
                <MentorProfileDivRight>
                  <MentorProfileAvailDiv>
                    <h4>Available Sessions:</h4>
                    <hr />
                    <MentorProfileDateDiv>
                      Choose the Date: <br />
                      <DatePicker
                        required
                        className="form-control"
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
                      <MentorBoxDiv>
                        <div className="booked"></div>
                        <p>The red color shows those are not available</p>
                      </MentorBoxDiv>
                    </MentorProfileDateDiv>
                    <MentorProfileDateDiv>
                      Choose the Time slot: <br />
                      <MentorTimeSlotDiv
                        value={mentor.mentor_availability_slot_from}
                        isActive={isActive}
                        onClick={setTimeSlotActive}
                      >
                        <strong>
                          {mentor.mentor_availability_start_time + " "}
                        </strong>
                        to
                        <strong>
                          {" " + mentor.mentor_availability_end_time}
                        </strong>
                      </MentorTimeSlotDiv>
                    </MentorProfileDateDiv>
                    {!user ? (
                      <BookNowButton>
                        <Link to="/login">Login</Link>
                      </BookNowButton>
                    ) : (
                      <BookNowButton onClick={() => showModalHandler(mentor)}>
                        Book now
                      </BookNowButton>
                    )}
                    <p>
                      Note : You will earn 10 points for each mentor booking.
                    </p>
                  </MentorProfileAvailDiv>
                </MentorProfileDivRight>
              </MentorProfileDivFlex>
            </MentorProfileDiv>
          </MentorDetailsDiv>
        </MentorSectionDiv>
      ))}
      <MentorRatingDiv>
        <MentorRatingWrapper>
          <MentorRatingTitles>Testimonials</MentorRatingTitles>
          <Swiper
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
            }}
            spaceBetween={50}
            slidesPerView={1}
            onSwiper={(swiper) => console.log(swiper)}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {mentorFeedback?.length > 0 ? (
              mentorFeedback?.map((feedback) => (
                <SwiperSlide key={feedback.trainee_feedback_dtls_id}>
                  <MentorRatingDivSlider>
                    <RatingContentDiv>
                      <RatingContent>
                        <RatingImg
                          src={
                            feedback.trainee_image
                              ? feedback.trainee_image
                              : "https://images.pexels.com/photos/13085461/pexels-photo-13085461.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                          }
                          alt=""
                        />
                        <RatingContentText>
                          {feedback.trainee_feedback_aspects}
                        </RatingContentText>
                        <RatingContentStarDiv>
                          {feedback.trainee_feedback_overall_exp === "5" && (
                            <>
                              <i className="fa-solid fa-star gold"></i>
                              <i className="fa-solid fa-star gold"></i>
                              <i className="fa-solid fa-star gold"></i>
                              <i className="fa-solid fa-star gold"></i>
                              <i className="fa-solid fa-star gold"></i>
                            </>
                          )}
                          {feedback.trainee_feedback_overall_exp === "4" && (
                            <>
                              <i className="fa-solid fa-star gold"></i>
                              <i className="fa-solid fa-star gold"></i>
                              <i className="fa-solid fa-star gold"></i>
                              <i className="fa-solid fa-star gold"></i>
                            </>
                          )}
                          {feedback.trainee_feedback_overall_exp === "3" && (
                            <>
                              <i className="fa-solid fa-star gold"></i>
                              <i className="fa-solid fa-star gold"></i>
                              <i className="fa-solid fa-star gold"></i>
                            </>
                          )}
                        </RatingContentStarDiv>
                        <RatingContentTraineeName>
                          {feedback.trainee_fullname}
                        </RatingContentTraineeName>
                      </RatingContent>
                    </RatingContentDiv>
                  </MentorRatingDivSlider>
                </SwiperSlide>
              ))
            ) : (
              <MentorProfileAvailDiv>
                Noo testimonials found
              </MentorProfileAvailDiv>
            )}
          </Swiper>
        </MentorRatingWrapper>
      </MentorRatingDiv>
      <GoToTop />
    </MentorIndSection>
  );
};

export default MentorIndividual;
