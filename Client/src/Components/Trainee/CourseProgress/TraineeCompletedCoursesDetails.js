import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
const RebookAppointment = styled.button`
  margin: 0 auto;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  background-color: #1363df !important;
  color: #fff !important;
  border-radius: 5px;
  &:hover {
    transition: all 0.5s ease-in-out;
  }
`;

const TraineeCompletedCoursesDetails = (props) => {
  const [allLiveClasses, setAllLiveClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const getAllTraineeLiveAttendedClasses = async () => {
      setLoading(true);
      const res = await axios.post(
        `/trainee/courses/progress/get-trainee-live-attended-classes`,
        {
          userEmail: user?.email,
          traineeCourseId: props.completeCourse.trainee_course_id,
        }
      );
      if (res.data.success) {
        setLoading(false);
        setAllLiveClasses(res.data.success);
      } else {
        setLoading(false);
        setAllLiveClasses([]);
      }
    };
    getAllTraineeLiveAttendedClasses();
  }, [user?.email, props.completeCourse.trainee_course_id]);
  return (
    <div>
      <div>
        <UpcomingAllDivContent>
          You have successfully completed a course
          <span>
            {" " + props.completeCourse.trainee_course_name + " "}
          </span> on
          <span>
            {" " +
              new Date(
                props.completeCourse.trainee_course_end_date
              ).toDateString() +
              " "}
          </span>
        </UpcomingAllDivContent>
        {loading && <p>Please wait...fetching live classes....</p>}
        {allLiveClasses?.length > 0 ? (
          allLiveClasses?.map((liveClass) => (
            <p>
              You attended the live class on the
              <b>
                {" " +
                  new Date(
                    liveClass.instructor_live_class_date
                  ).toDateString() +
                  " "}
              </b>
              and time is
              <b>{" " + liveClass.instructor_live_class_start_time + " "}</b> to
              <b>{" " + liveClass.instructor_live_class_start_time + " "}</b>
              with
              <b>{" " + liveClass.instructor_fullname + " "}</b>
            </p>
          ))
        ) : (
          <p>No live class attended</p>
        )}

        <JoinButtonDiv>
          <div>
            <RebookAppointment>
              <Link
                style={{ textDecoration: "none", color: " #fff" }}
                to={`/course
                `}
              >
                To see more courses
              </Link>
            </RebookAppointment>
          </div>
        </JoinButtonDiv>
      </div>
    </div>
  );
};
export default TraineeCompletedCoursesDetails;
