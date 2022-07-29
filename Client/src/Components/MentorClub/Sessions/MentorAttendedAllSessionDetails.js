import React, { useState } from "react";

//import FeedbackForm from "../FeedbackForm";
import styled from "styled-components";
import { JoinButton, RefundedDoneButton } from "./ButtonElements";
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
  return (
    <div>
      <div>
        <UpcomingAllDivContent>
          You have successfully attended a mentorship session with
          <span>{" " + props.mentor.userEmail + " "}</span>
          on
          <span>
            {" " + new Date(props.mentor.bookingDate).toDateString() + " "}
          </span>
          and Time is
          <span>{" " + props.mentor.time + ". "}</span>, Waiting for the
          feedback from the trainee
        </UpcomingAllDivContent>
      </div>
      <JoinButtonDiv>
        <JoinButton>Send Remainder to trainee</JoinButton>
      </JoinButtonDiv>
    </div>
  );
};

export default AttendedAllSessionDetails;
