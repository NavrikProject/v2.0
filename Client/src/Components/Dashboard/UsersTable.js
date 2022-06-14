import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Dashboard.css";
const UsersTable = () => {
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;
  const [allTrainers, setAllTrainers] = useState([]);
  const [approve, setApprove] = useState(true);

  useEffect(() => {
    const getCourseByTitles = async () => {
      const res = await axios.get(`/trainer/getAllTrainers`, {
        headers: { authorization: "Bearer " + token },
      });
      setAllTrainers(res.data);
    };
    getCourseByTitles();
  }, [token]);

  const trainerApproveHandler = async (trainer) => {
    const res = await axios.put(
      `/trainer/update/approve/${trainer.trainer_id}`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    if (res.data.approved) {
      alert(res.data.approved);
      window.location.reload();
      setApprove(!approve);
    }
  };
  const trainerDisApproveHandler = async (trainer) => {
    const res = await axios.put(
      `/trainer/update/disapprove/${trainer.trainer_id}`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    if (res.data.disapproved) {
      alert(res.data.disapproved);
      setApprove(!approve);
      window.location.reload();
    }
  };
  return (
    <div className="rightbarSect">
      <div className="tableDiv">
        <h1>Approve the trainers</h1>
        <div className="itmes">
          <div className="flex1">
            <div className="greenBox"></div>
            <p className="tag"> Application is Approved</p>
          </div>
          <div className="flex1">
            <div className="redBox"></div>
            <p className="tag"> Application is Declined</p>
          </div>
          <div className="flex1">
            <div className="blueBox"></div>
            <p className="tag"> Application need to be approved</p>
          </div>
          <div className="flex1">
            <div className="yellowBox"></div>
            <p className="tag"> Application will be disapproved</p>
          </div>
        </div>
        <table>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>Experience</th>
            <th>Course Id</th>
            <th>Course Category</th>
            <th>Approve or Disapprove</th>
            <th>Status</th>
          </tr>
          {allTrainers?.map((trainer) => (
            <tr key={trainer.trainer_id}>
              <td>{trainer.trainer_id}</td>
              <td>{trainer.trainer_email}</td>
              <td>{trainer.trainer_firstname}</td>
              <td>{trainer.trainer_lastname}</td>
              <td>{trainer.trainer_mobile}</td>
              <td>{trainer.trainer_exp_yrs}</td>
              <td>{trainer.trainer_course_id}</td>
              <td>{trainer.trainer_course_cat_id}</td>
              <td>
                {trainer.trainer_approve === "yes" ? (
                  <button
                    className="disapprove"
                    onClick={() => trainerDisApproveHandler(trainer)}
                  >
                    {approve ? " Disapprove" : "Approve"}
                  </button>
                ) : (
                  <button
                    onClick={() => trainerApproveHandler(trainer)}
                    className="approve"
                  >
                    {approve ? " Approve" : "Disapprove"}
                  </button>
                )}
              </td>
              <td>
                {trainer.trainer_approve === "yes" ? (
                  <button className="approved">Approved</button>
                ) : (
                  <button className="disapproved">Disapproved</button>
                )}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
