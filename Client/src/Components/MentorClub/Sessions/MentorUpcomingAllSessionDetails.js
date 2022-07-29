import React, { useState } from "react";
//import CancelAppointment from "./CancelAppointment";
import styled from "styled-components";
import {
  JoinButton,
  ModifyButton,
  RefundedDoneButton,
  UnModifiedButton,
} from "./ButtonElements";
import axios from "axios";
import { useSelector } from "react-redux";

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
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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
const UpcomingAllSessionDetails = (props) => {
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
  return (
    <div>
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
              {new Date(props.mentor.bookingDate).toLocaleDateString() !==
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
      </MoreOptionText>
    </div>
  );
};

export default UpcomingAllSessionDetails;
