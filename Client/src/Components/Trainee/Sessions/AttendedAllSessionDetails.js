import React, { useState } from "react";

import FeedbackForm from "../FeedbackForm";
import styled from "styled-components";
import { JoinButton, RefundedDoneButton } from "../ButtonElements";
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

const NoteText = styled.p`
  color: #111;
  opacity: 0.5;
  padding-top: 10px;
`;
const AttendedAllSessionDetails = (props) => {
  const [mentor, setMentor] = useState();
  const [showFeedbackModel, setShowFeedbackModel] = useState(false);
  const showFeedBackMentorHandler = async (mentor) => {
    setShowFeedbackModel(!showFeedbackModel);
    setMentor(mentor);
  };
  return (
    <div>
      {showFeedbackModel && (
        <FeedbackForm
          mentor={mentor}
          showFeedBackMentorHandler={showFeedBackMentorHandler}
        />
      )}
      <div>
        <UpcomingAllDivContent>
          You have successfully attended a mentorship session with
          <span>{" " + props.mentor.mentorFullName + " "}</span>
          on
          <span>
            {" " + new Date(props.mentor.bookingDate).toDateString() + " "}
          </span>
          and Time is
          <span>{" " + props.mentor.time + ". "}</span> Please Take a 10 minutes
          to fill the feedback,Your feedback is most important to us!
        </UpcomingAllDivContent>
        <JoinButtonDiv>
          <div>
            {props.mentor.paymentStatus === "Refunded" ? (
              <RefundedDoneButton>Refund has been issued</RefundedDoneButton>
            ) : (
              <JoinButton
                onClick={() => showFeedBackMentorHandler(props.mentor)}
              >
                Submit Feedback
                {/* <Link to={`/trainee/profile/bookings/feedback`}>
                          Give feedback
                        </Link> */}
              </JoinButton>
            )}
          </div>
          <NoteText>
            * Please fill the feedback form to serve us better
          </NoteText>
        </JoinButtonDiv>
      </div>
    </div>
  );
};

export default AttendedAllSessionDetails;
