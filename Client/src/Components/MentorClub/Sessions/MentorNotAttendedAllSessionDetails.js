import React, { useState } from "react";
import styled from "styled-components";
import MentorModifyBooking from "./MentorModifyBooking";
import {
  RefundedDoneButton,
  ModifyButton,
  UnModifiedButton,
} from "../../Trainee/ButtonElements";
const UpcomingAllDivContent = styled.p`
  font-size: 20px;
  color: #111;
  opacity: 0.9;
  span {
    font-weight: 600;
    text-transform: uppercase;
  }
`;
const AllButtonDiv = styled.div`
  margin-top: 30px;
  padding: 10px 0;
`;

const NoteText = styled.p`
  color: #111;
  opacity: 0.5;
  padding-top: 10px;
`;
const MentorNotAttendedAllSessionDetails = (props) => {
  const [showModel, setShowModel] = useState(false);
  const [mentor, setMentor] = useState();
  const modifyMentorAppointMent = async (mentor) => {
    setShowModel(!showModel);
    setMentor(mentor);
  };

  return (
    <div>
      {showModel && (
        <MentorModifyBooking
          mentor={mentor}
          modifyMentorAppointMent={modifyMentorAppointMent}
        />
      )}
      <div>
        <UpcomingAllDivContent>
          You have missed a mentorship session with
          <span>{" " + props.mentor.username + " "}</span>
          on
          <span>
            {" " + new Date(props.mentor.bookingDate).toDateString() + " "}
          </span>
          and Time is
          <span>{" " + props.mentor.time + " "}</span> You can reschedule your
          session for one time.
        </UpcomingAllDivContent>
      </div>
      <AllButtonDiv>
        {props.mentor.paymentStatus === "Refunded" ? (
          <RefundedDoneButton className="disapprove">
            Can not be modified after refund
          </RefundedDoneButton>
        ) : (
          <>
            {props.mentor.rescheduleTimes === 0 && (
              <ModifyButton
                mentor={props.mentor}
                onClick={() => modifyMentorAppointMent(props.mentor)}
              >
                Reschedule appointment
              </ModifyButton>
            )}
            {props.mentor.rescheduleTimes === 1 && (
              <UnModifiedButton>Can not be modified</UnModifiedButton>
            )}
          </>
        )}
        <NoteText>
          You can only reschedule your appointment for one time only.
        </NoteText>
      </AllButtonDiv>
    </div>
  );
};

export default MentorNotAttendedAllSessionDetails;
