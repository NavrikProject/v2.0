import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Model from "../Modal/Model";
import { ModifyButton } from "./AdminPanelElements";
import ModifyTraineeProgress from "./ModifyTraineeProgress";
const ViewAllLiveClasses = () => {
  const [allLiveClasses, setAllLiveClasses] = useState([]);
  const [showProgressEditModel, setShowProgressEditModel] = useState(false);
  const [traineeDetails, setTraineeDetails] = useState("");
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getAllTraineeProgress = async () => {
      const res = await axios.get(`/admin/get/all/instructor-class`, {
        headers: { authorization: "Bearer " + user?.accessToken },
      });
      if (res.data.success) {
        setAllLiveClasses(res.data.success);
      }
      if (res.data.error) {
        setAllLiveClasses([]);
      }
    };
    getAllTraineeProgress();
  }, [user?.accessToken]);
  const modifyTraineeProgressHandler = (trainee) => {
    setShowProgressEditModel(!showProgressEditModel);
    setTraineeDetails(trainee);
  };
  return (
    <div>
      {showProgressEditModel && (
        <Model>
          <ModifyTraineeProgress
            traineeDetails={traineeDetails}
            modifyTraineeProgressHandler={modifyTraineeProgressHandler}
          />
        </Model>
      )}
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Trainee Name</th>
            <th>Course Name</th>
            <th>Trainer Name</th>
            <th>Live Class Date</th>
            <th>Class Timings</th>
            <th>Live Class Status</th>
            <th>Host</th>
          </tr>

          {allLiveClasses?.map((liveClass) => (
            <tr key={liveClass.instructor_live_classes_dtls_id}>
              <td>{liveClass.instructor_live_classes_dtls_id}</td>
              <td>{liveClass.trainee_fullname}</td>
              <td>{liveClass.trainee_course_name}</td>
              <td>{liveClass.instructor_fullname}</td>
              <td>
                {new Date(liveClass.instructor_live_class_date).toDateString()}
              </td>
              <td>
                {liveClass.instructor_live_class_start_time}
                {"-"}
                {liveClass.instructor_live_class_end_time}
              </td>
              <td>{liveClass.instructor_live_class_completed_status}</td>
              <td>
                <button>
                  <a
                    href={liveClass.instructor_host_url}
                    target="_blank"
                    title="link"
                    rel="noreferrer"
                  >
                    Launch
                  </a>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllLiveClasses;
