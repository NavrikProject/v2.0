import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
import CancelAppointment from "./CancelAppointment";
import FeedbackForm from "./FeedbackForm";
import "./TraineeBooking.css";
import TraineeModifyBooking from "./TraineeModifyBooking";
const TraineeBookingTable = () => {
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;
  const [allMentors, setAllMentors] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mentor, setMentor] = useState();
  const [showCancelModel, setShowCancelModel] = useState(false);
  const [showFeedbackModel, setShowFeedbackModel] = useState(false);
  useEffect(() => {
    const getAllTheMentors = async () => {
      setLoading(true);
      const res = await axios.post(`/mentor/profile/get/bookings`, {
        headers: { authorization: "Bearer " + token },
        userEmail: user?.email,
      });
      if (res.data) {
        setLoading(false);
        setAllMentors(res.data);
      } else {
        setLoading(false);
      }
    };
    getAllTheMentors();
  }, [token, user]);

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
    <div className="rightbarSect">
      <div className="tableDiv">
        <h1>Modify booking dates Hello</h1>
        {loading && <Loading />}
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
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Your Email</th>
              <th>Mentor Email</th>
              <th>Booking Date</th>
              <th>Session Time</th>
              <th>Mentor Price</th>
              <th>Mentor Confirmed</th>
              <th>Payment Status</th>
              <th>Modify Appointment</th>
              <th>Cancel</th>
              <th>Join Meeting</th>
              <th>Feedback</th>
            </tr>
          </tbody>
          {allMentors?.length > 0 ? (
            allMentors?.map((mentor) => (
              <tbody>
                <tr key={mentor.bookingId}>
                  <td>{mentor.bookingId}</td>
                  <td>{mentor.userEmail}</td>
                  <td>{mentor.mentorEmail}</td>
                  <td>{new Date(mentor.bookingDate).toDateString()}</td>
                  <td>{mentor.time}</td>
                  <td>{mentor.amount}</td>
                  <td>{mentor.confirmed}</td>
                  <td>{mentor.paymentStatus}</td>
                  <td>
                    {mentor.paymentStatus === "Refunded" ? (
                      <button className="disapprove">
                        Can not be modified after refund
                      </button>
                    ) : (
                      <>
                        {mentor.changes === 0 && (
                          <button
                            mentor={mentor}
                            className="approve"
                            onClick={() => modifyMentorAppointMent(mentor)}
                          >
                            Modify
                          </button>
                        )}
                        {mentor.changes === 1 && (
                          <button
                            mentor={mentor}
                            className="approve"
                            onClick={() => modifyMentorAppointMent(mentor)}
                          >
                            Pay & Modify
                          </button>
                        )}
                        {mentor.changes === 2 && (
                          <button className="disapproved">
                            Can not be modified
                          </button>
                        )}
                      </>
                    )}
                  </td>
                  <td>
                    {mentor.paymentStatus === "Refunded" ? (
                      <button className="disapprove">
                        Refund has been issued
                      </button>
                    ) : (
                      <button
                        onClick={() => showCancelMentorModel(mentor)}
                        className="disapproved"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                  <td>
                    {mentor.paymentStatus === "Refunded" ? (
                      <button className="disapprove">
                        Can not be join after refund
                      </button>
                    ) : (
                      <button className="joinButton">
                        {new Date(mentor.bookingDate).toLocaleDateString() ===
                        new Date().toLocaleDateString() ? (
                          <a href={mentor.joinUrl}>Join Meeting</a>
                        ) : (
                          "Joining Link will activate booking date"
                        )}
                      </button>
                    )}
                  </td>
                  <td>
                    {mentor.paymentStatus === "Refunded" ? (
                      <button className="disapprove">
                        Refund has been issued
                      </button>
                    ) : (
                      <button
                        className="joinButton"
                        onClick={() => showFeedBackMentorHandler(mentor)}
                      >
                        Feedback
                        {/* <Link to={`/trainee/profile/bookings/feedback`}>
                          Give feedback
                        </Link> */}
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <h1>No appointments found</h1>
          )}
        </table>
      </div>
    </div>
  );
};

export default TraineeBookingTable;
