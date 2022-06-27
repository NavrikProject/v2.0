import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
import "./TraineeBooking.css";
import TraineeModifyBooking from "./TraineeModifyBooking";
const TraineeBookingTable = () => {
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;
  const [allMentors, setAllMentors] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mentor, setMentor] = useState();

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
    setMentor(mentor);
  };
  const cancelMentorAppointMent = async (mentor) => {};

  return (
    <div className="rightbarSect">
      <div className="tableDiv">
        <h1>Modify booking dates</h1>
        {loading && <Loading />}
        {showModel && (
          <TraineeModifyBooking
            mentor={mentor}
            modifyMentorAppointMent={modifyMentorAppointMent}
          />
        )}
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Your Email</th>
              <th>Mentor Email</th>
              <th>Booked On</th>
              <th>Booking Date</th>
              <th>Session Time</th>
              <th>Mentor Price</th>
              <th>Mentor Confirmed</th>
              <th>Modify Appointment</th>
              <th>Cancel</th>
            </tr>
          </tbody>
          {allMentors?.length > 0 ? (
            allMentors?.map((mentor) => (
              <tbody>
                <tr key={mentor.id}>
                  <td>{mentor.id}</td>
                  <td>{mentor.userEmail}</td>
                  <td>{mentor.mentorEmail}</td>
                  <td>{new Date(mentor.bookedOn).toLocaleDateString()}</td>
                  <td>{new Date(mentor.bookingDate).toLocaleDateString()}</td>
                  <td>{mentor.time}</td>
                  <td>{mentor.amount}</td>
                  <td>{mentor.confirmed}</td>
                  <td>
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
                      <button mentor={mentor} className="disapproved">
                        Can not be modified
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => cancelMentorAppointMent(mentor)}
                      className="disapproved"
                    >
                      Cancel
                    </button>
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
