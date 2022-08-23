import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";

const AllContributers = () => {
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;
  const [allContributers, setAllContributers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approve, setApprove] = useState(true);

  useEffect(() => {
    const getAllTheCourse = async () => {
      setLoading(true);
      const res = await axios.get(`/contributers/get-all`, {
        headers: { authorization: "Bearer " + token },
      });
      if (res.data) {
        setAllContributers(res.data);
        setLoading(false);
      }
    };
    getAllTheCourse();
  }, [token]);

  const contributerApproveHandler = async (contributer) => {
    setLoading(true);
    const res = await axios.put(
      `/contributers/approve/${contributer.contributer_details_id}`,
      { id: contributer.contributer_details_id },
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
  const contributerDisApproveHandler = async (contributer) => {
    setLoading(true);
    const res = await axios.put(
      `/contributers/disapprove/${contributer.contributer_details_id}`,
      { id: contributer.contributer_dtls_id },
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
        <h1>Approve the Contributer</h1>
        {loading && <Loading />}
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Mobile</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Course Name</th>
              <th>Course Category</th>
              <th>Approve or Not</th>
              <th>Contributer Status</th>
            </tr>
          </tbody>
          {allContributers?.length > 0 &&
            allContributers?.map((contributer) => (
              <tbody>
                <tr key={contributer.contributer_details_id}>
                  <td>{contributer.contributer_details_id}</td>
                  <td>{contributer.contributer_email}</td>
                  <td>{contributer.contributer_fullname}</td>
                  <td>{contributer.contributer_mobile}</td>
                  <td>{contributer.contributer_qualifications}</td>
                  <td>{contributer.contributer_exp_yrs}</td>
                  <td>{contributer.contributer_course_name}</td>
                  <td>{contributer.contributer_course_category}</td>
                  <td>
                    {contributer.contributer_approve_status === "yes" ? (
                      <button
                        className="disapprove"
                        onClick={() =>
                          contributerDisApproveHandler(contributer)
                        }
                      >
                        {approve ? " Disapprove" : "Approve"}
                      </button>
                    ) : (
                      <button
                        onClick={() => contributerApproveHandler(contributer)}
                        className="approve"
                      >
                        {approve ? " Approve" : "Disapprove"}
                      </button>
                    )}
                  </td>
                  <td>
                    {contributer.contributer_approve_status === "yes" ? (
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

export default AllContributers;
