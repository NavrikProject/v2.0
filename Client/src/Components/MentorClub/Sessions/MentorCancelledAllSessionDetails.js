import React from "react";
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
const NoteText = styled.p`
  margin-top: 20px;
  font-size: 19px;
  color: red;
  opacity: 0.5;
`;

const MentorCancelledAllSessionDetails = (props) => {
  return (
    <div>
      <div>
        <UpcomingAllDivContent>
          You have cancelled a mentorship session with
          <span>{" " + props.mentor.username + " "}</span>
          on
          <span>
            {" " + new Date(props.mentor.bookingDate).toDateString() + " "}
          </span>
          and Time is
          <span>{" " + props.mentor.time + ". "}</span> If you have any query,
          get back to us through support email!
        </UpcomingAllDivContent>
        <NoteText>
          *If the cancellation of booking is more than five times your account
          will be deactivated.
        </NoteText>
      </div>
    </div>
  );
};

export default MentorCancelledAllSessionDetails;
