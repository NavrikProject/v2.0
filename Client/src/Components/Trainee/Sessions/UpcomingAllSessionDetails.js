import React, { useState } from "react";
import TraineeModifyBooking from "../TraineeModifyBooking";
import CancelAppointment from "../CancelAppointment";
import FeedbackForm from "../FeedbackForm";
import styled from "styled-components";
import {
  JoinButton,
  ModifyButton,
  RefundedDoneButton,
  UnModifiedButton,
} from "../ButtonElements";
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
  const [showModel, setShowModel] = useState(false);
  const [showCancelModel, setShowCancelModel] = useState(false);
  const [mentor, setMentor] = useState();
  const [showFeedbackModel, setShowFeedbackModel] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;
  console.log(props);
  const attendMeetingHandler = async (bookingId) => {
    console.log(bookingId);
    await axios.post(
      `/mentor/profile/get/bookings/attended/update`,
      { userEmail: user?.email, bookingId: bookingId },
      {
        headers: { authorization: "Bearer " + token },
      }
    );
  };
  const modifyMentorAppointMent = async (mentor) => {
    setShowModel(!showModel);
    setShowCancelModel(false);
    setMentor(mentor);
  };
  const showCancelMentorModel = async (mentor) => {
    setShowCancelModel(!showCancelModel);
    setShowModel(false);
    setMentor(mentor);
  };
  const showFeedBackMentorHandler = async (mentor) => {
    setShowFeedbackModel(!showFeedbackModel);
    setShowModel(false);
    setMentor(mentor);
  };
  return (
    <div>
      {showModel && (
        <TraineeModifyBooking
          mentor={mentor}
          modifyMentorAppointMent={modifyMentorAppointMent}
        />
      )}
      {showCancelModel && (
        <CancelAppointment
          mentor={mentor}
          showCancelMentorModel={showCancelMentorModel}
        />
      )}
      {showFeedbackModel && (
        <FeedbackForm
          mentor={mentor}
          showFeedBackMentorHandler={showFeedBackMentorHandler}
        />
      )}
      <div>
        <UpcomingAllDivContent>
          You have successfully booked a mentorship session with
          <span>{" " + props.mentor.mentorFullName + " "}</span>
          on
          <span>
            {" " + new Date(props.mentor.bookingDate).toDateString() + " "}
          </span>
          and Time is
          <span>{" " + props.mentor.time + " "}</span> joining link is given
          below
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
                  href={props.mentor.traineeJoinUrl}
                  onClick={() => attendMeetingHandler(props.mentor.bookingId)}
                >
                  Join Meeting
                </a>
              ) : (
                "Link will be activated"
              )}
            </JoinButton>
          )}
          <NoteText>* joining button will activate on the same day</NoteText>
        </JoinButtonDiv>
      </div>
      <MoreOptionText>
        More Options: <hr />
      </MoreOptionText>

      <AllButtonDiv>
        {props.mentor.paymentStatus === "Refunded" ? (
          <RefundedDoneButton className="disapprove">
            Can not be modified after refund
          </RefundedDoneButton>
        ) : (
          <>
            {props.mentor.changes === 0 && (
              <ModifyButton
                mentor={props.mentor}
                onClick={() => modifyMentorAppointMent(props.mentor)}
              >
                Modify An Appointment
              </ModifyButton>
            )}
            {props.mentor.changes === 1 && (
              <ModifyButton
                mentor={props.mentor}
                onClick={() => modifyMentorAppointMent(props.mentor)}
              >
                Pay & Modify An Appointment
              </ModifyButton>
            )}
            {props.mentor.changes === 2 && (
              <UnModifiedButton>Can not be modified</UnModifiedButton>
            )}
          </>
        )}
        <div>
          {props.mentor.paymentStatus === "Refunded" ? (
            <RefundedDoneButton className="disapprove">
              Refund has been issued
            </RefundedDoneButton>
          ) : (
            <UnModifiedButton
              onClick={() => showCancelMentorModel(props.mentor)}
            >
              Cancel this appointment
            </UnModifiedButton>
          )}
        </div>
        <div>
          {props.mentor.paymentStatus === "Refunded" ? (
            <RefundedDoneButton>Refund has been issued</RefundedDoneButton>
          ) : (
            <JoinButton
              disabled
              onClick={() => showFeedBackMentorHandler(props.mentor)}
            >
              Feedback
              {/* <Link to={`/trainee/profile/bookings/feedback`}>
                          Give feedback
                        </Link> */}
            </JoinButton>
          )}
        </div>
      </AllButtonDiv>
    </div>
  );
};

export default UpcomingAllSessionDetails;
