import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
const AllMentors = () => {
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;
  const [allMentors, setAllMentors] = useState([]);
  const [approve, setApprove] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllTheMentors = async () => {
      setLoading(true);
      const res = await axios.get(`/mentor/get`, {
        headers: { authorization: "Bearer " + token },
      });
      if (res.data.mentors) {
        setLoading(false);
        setAllMentors(res.data.mentors);
      } else {
        setLoading(false);
      }
    };
    getAllTheMentors();
  }, [token]);

  const mentorApproveHandler = async (mentor) => {
    setLoading(true);
    const res = await axios.put(
      `/mentor/approve/${mentor.mentor_dtls_id}`,
      { id: mentor.mentor_dtls_id },
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    if (res.data.success) {
      alert(res.data.success);
      window.location.reload();
      setApprove(!approve);
      setLoading(false);
    }
  };
  const mentorDisApproveHandler = async (mentor) => {
    setLoading(true);
    const res = await axios.put(
      `/mentor/disapprove/${mentor.mentor_dtls_id}`,
      { id: mentor.mentor_dtls_id },
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    if (res.data.success) {
      alert(res.data.success);
      setApprove(!approve);
      window.location.reload();
      setLoading(false);
    }
  };

  return (
    <div className="rightbarSect">
      <div className="tableDiv">
        <h1>Approve the Mentors</h1>
        {loading && <Loading />}
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Availability</th>
              <th>Experience</th>
              <th>Skills</th>
              <th>Speciality</th>
              <th>Session Conducted</th>
              <th>Approve or Not</th>
              <th>Mentor Status</th>
            </tr>
          </tbody>
          {allMentors?.length > 0 &&
            allMentors?.map((mentor) => (
              <tbody>
                <tr key={mentor.mentor_dtls_id}>
                  <td>{mentor.mentor_dtls_id}</td>
                  <td>{mentor.mentor_email}</td>
                  <td>
                    {mentor.mentor_firstname}
                    {mentor.mentor_lastname}
                  </td>
                  <td>{mentor.mentor_availability}</td>
                  <td>{mentor.mentor_experience}</td>
                  <td>{mentor.mentor_skills}</td>
                  <td>{mentor.mentor_speciality}</td>
                  <td>{mentor.mentor_sessions_conducted}</td>
                  <td>
                    {mentor.mentor_approved === "Yes" ? (
                      <button
                        className="disapprove"
                        onClick={() => mentorDisApproveHandler(mentor)}
                      >
                        {approve ? " Disapprove" : "Approve"}
                      </button>
                    ) : (
                      <button
                        onClick={() => mentorApproveHandler(mentor)}
                        className="approve"
                      >
                        {approve ? " Approve" : "Disapprove"}
                      </button>
                    )}
                  </td>
                  <td>
                    {mentor.mentor_approved === "Yes" ? (
                      <button className="approved">Approved</button>
                    ) : (
                      <button className="disapproved">Not Approved</button>
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
};

export default AllMentors;
