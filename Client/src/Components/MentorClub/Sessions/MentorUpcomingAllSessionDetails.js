import React, { useState } from "react";
//import CancelAppointment from "./CancelAppointment";
import styled from "styled-components";
import {
  JoinButton,
  RefundedDoneButton,
  UnModifiedButton,
} from "./ButtonElements";
import axios from "axios";
import { useSelector } from "react-redux";
import CancelWarningModal from "./CancelWarningModal";

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
const AllButtonDiv = styled.div`
  padding: 10px 0;
`;
const MoreOptionText = styled.h1`
  color: #111;
  opacity: 0.9;
  font-weight: 400;
  hr {
    margin-top: 3px;
  }
`;
const NoteText = styled.p`
  color: #111;
  opacity: 0.5;
  padding-top: 10px;
`;
const ErrorText = styled.p`
  color: #f24c4c;
  padding-top: 10px;
  font-size: 16px;
`;
const UpcomingAllSessionDetails = (props) => {
  const [showWarningModel, setShowWarningModel] = useState(false);
  const [sendMentor, setSendMentor] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;
  const attendMeetingHandler = async (bookingId) => {
    await axios.post(
      `/mentor/bookings/get/all-bookings/attended/update`,
      { userEmail: user?.email, bookingId: bookingId },
      {
        headers: { authorization: "Bearer " + token },
      }
    );
  };
  const cancelAppointmentHandler = (mentor) => {
    setShowWarningModel(!showWarningModel);
    setSendMentor(mentor);
  };

  return (
    <div>
      {showWarningModel && (
        <CancelWarningModal
          cancelAppointmentHandler={cancelAppointmentHandler}
          sendMentor={sendMentor}
        />
      )}
      <div>
        <UpcomingAllDivContent>
          You have successfully booked a mentorship session with
          <span>{" " + props.mentor.userEmail + " "}</span>
          on
          <span>
            {" " + new Date(props.mentor.bookingDate).toDateString() + " "}
          </span>
          and Time is
          <span>{" " + props.mentor.time + " "}</span> host link is given below
        </UpcomingAllDivContent>
        <JoinButtonDiv>
          {props.mentor.paymentStatus === "Refunded" ? (
            <RefundedDoneButton>
              Can not be join after refund
            </RefundedDoneButton>
          ) : (
            <JoinButton
              disabled={
                new Date(props.mentor.bookingDate).toLocaleDateString() !==
                new Date().toLocaleDateString()
              }
            >
              {new Date(props.mentor.bookingDate).toLocaleDateString() ===
              new Date().toLocaleDateString() ? (
                <a
                  href={props.mentor.hostUrl}
                  onClick={() => attendMeetingHandler(props.mentor.bookingId)}
                >
                  Host Meeting
                </a>
              ) : (
                "Host Link will be activated"
              )}
            </JoinButton>
          )}
          <NoteText>* Host button will activate on the same day</NoteText>
        </JoinButtonDiv>
      </div>
      <MoreOptionText>
        More Options: <hr />
        <AllButtonDiv>
          <UnModifiedButton
            onClick={() => cancelAppointmentHandler(props.mentor)}
          >
            Cancel Appointment
          </UnModifiedButton>
        </AllButtonDiv>
        <ErrorText>
          *If the cancellation of bookings is more than five times your account
          will be deactivated.
        </ErrorText>
      </MoreOptionText>
    </div>
  );
};

export default UpcomingAllSessionDetails;
