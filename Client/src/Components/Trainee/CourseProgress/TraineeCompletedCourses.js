import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { Link } from "react-router-dom";
import TraineeCompletedCourseDetails from "./TraineeCompletedCoursesDetails";
const Div = styled.div``;
const AttendedTitle = styled.h1`
  color: #111;
  opacity: 0.7;
  padding-bottom: 10px;
`;
const AttendedDiv = styled.div`
  margin: 5px 0;
  padding: 20px;
  box-shadow: rgb(142 151 158 / 15%) 0px 4px 19px;
  height: auto;
`;
const AttendedUl = styled.ol``;
const AttendedList = styled.li``;
const AttendedDivFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;
const AttendedDivRight = styled.div``;
const AttendedDivContent = styled.p`
  font-size: 18px;
  color: #111;
  opacity: 0.9;
  span {
    font-weight: 600;
  }
`;
const AttendedDivLeft = styled.div``;
const AttendedDivButtons = styled.button`
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
const SessionDetailsDiv = styled.div`
  padding: 30px;
`;
const TraineeCompletedCourses = () => {
  const [loading, setLoading] = useState(false);
  const [traineeCompletedCourse, setTraineeCompletedCourse] = useState([]);
  const [selected, setSelected] = useState(null);

  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;
  useEffect(() => {
    const getAllTraineeCompletedCourse = async () => {
      setLoading(true);
      const res = await axios.post(
        `/trainee/courses/progress/get-trainee-complete-course`,
        {
          headers: { authorization: "Bearer " + token },
          email: user?.email,
        }
      );
      if (res.data.success) {
        setLoading(false);
        setTraineeCompletedCourse(res.data.success);
      } else {
        setLoading(false);
        setTraineeCompletedCourse([]);
      }
    };
    getAllTraineeCompletedCourse();
  }, [token, user]);

  const toggleShowDetails = (index) => {
    if (selected === index) {
      return setSelected(null);
    }
    setSelected(index);
  };
  return (
    <Div>
      {loading && <LoadingSpinner />}
      <AttendedTitle>Your Completed Courses</AttendedTitle>
      <AttendedUl>
        {traineeCompletedCourse?.length > 0 ? (
          traineeCompletedCourse?.map((completeCourse) => (
            <AttendedDiv key={completeCourse.trainee_course_dtls_id}>
              <AttendedList>
                <AttendedDivFlex>
                  <AttendedDivRight>
                    <AttendedDivContent>
                      Details for course
                      <span>
                        {" " + completeCourse.trainee_course_name + " "}
                      </span>
                    </AttendedDivContent>
                  </AttendedDivRight>
                  <AttendedDivLeft>
                    <AttendedDivButtons
                      onClick={() =>
                        toggleShowDetails(completeCourse.trainee_course_dtls_id)
                      }
                    >
                      See course Details
                    </AttendedDivButtons>
                  </AttendedDivLeft>
                </AttendedDivFlex>
                {selected === completeCourse.trainee_course_dtls_id ? (
                  <SessionDetailsDiv>
                    <TraineeCompletedCourseDetails
                      completeCourse={completeCourse}
                    />
                  </SessionDetailsDiv>
                ) : null}
              </AttendedList>
            </AttendedDiv>
          ))
        ) : (
          <AttendedDiv>
            <AttendedDivFlex>
              <AttendedDivRight>
                <AttendedDivContent>
                  <span>You have not registered any course</span>
                </AttendedDivContent>
              </AttendedDivRight>
              <AttendedDivLeft>
                <AttendedDivButtons>
                  <Link to={"/courses"} style={{ color: "white" }}>
                    Find Course
                  </Link>
                </AttendedDivButtons>
              </AttendedDivLeft>
            </AttendedDivFlex>
          </AttendedDiv>
        )}
      </AttendedUl>
    </Div>
  );
};

export default TraineeCompletedCourses;
