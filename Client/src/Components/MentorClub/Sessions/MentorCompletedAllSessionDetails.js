import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const UpcomingAllDivContent = styled.p`
  font-size: 20px;
  color: #111;
  opacity: 0.9;
  span {
    font-weight: 600;
    text-transform: uppercase;
  }
`;
const JoinButtonDiv = styled.div`
  padding: 20px 0;
`;
const RebookAppointment = styled.button`
  margin: 0 auto;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  background-color: #1363df !important;
  color: #fff !important;
  border-radius: 5px;
  margin-bottom: 20px;
  &:hover {
    transition: all 0.5s ease-in-out;
  }
`;
const Feedback = styled.p`
  font-size: 19px;
  color: #111;
  opacity: 0.9;
  span {
    font-weight: bold;
  }
`;

const CompletedAllSessionDetails = (props) => {
  const user = useSelector((state) => state.user.currentUser);
  const [feedback, setFeedback] = useState([]);
  const getFeedbackHandler = async (bookingId) => {
    try {
      const res = await axios.post("/feedback/get/mentor-feedback", {
        userEmail: user?.email,
        bookingId: bookingId,
      });
      if (res.data.data) {
        setFeedback(res.data.data);
      } else {
        return;
      }
    } catch (error) {}
  };
  return (
    <div>
      <div>
        <UpcomingAllDivContent>
          You have successfully completed a mentorship session with
          <span>{" " + props.mentor.mentorFullName + " "}</span>
          on
          <span>
            {" " + new Date(props.mentor.bookingDate).toDateString() + " "}
          </span>
          and Time is
          <span>{" " + props.mentor.time + ". "}</span> If you have any query,
          get back to us through support email!
        </UpcomingAllDivContent>
        <JoinButtonDiv>
          <div>
            <RebookAppointment
              onClick={() => getFeedbackHandler(props.mentor.bookingId)}
            >
              View Feedback
            </RebookAppointment>
          </div>
          {feedback?.map((feeds) => (
            <Feedback>
              The overall rating of your mentor session with the following
              trainee email
              <span>
                {" " +
                  feeds.trainee_feedback_user_email +
                  " is " +
                  feeds.trainee_feedback_overall_exp}
              </span>
              . <br /> You have to improve in the following
              <span> {" " + feeds.trainee_feedback_improve_mentor} </span>
            </Feedback>
          ))}
        </JoinButtonDiv>
      </div>
    </div>
  );
};

export default CompletedAllSessionDetails;
