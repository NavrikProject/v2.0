import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { Link } from "react-router-dom";
import TraineeAttendingCoursesDetails from "./TraineeAttendingCoursesDetails";
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
const TraineeAttendingCourses = () => {
  const [loading, setLoading] = useState(false);
  const [traineeAttendingCourses, setTraineeAttendingCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;

  useEffect(() => {
    const getAllTraineeAttendingCourses = async () => {
      setLoading(true);
      const res = await axios.post(
        `/trainee/courses/progress/get-trainee-incomplete-course`,
        {
          headers: { authorization: "Bearer " + token },
          email: user?.email,
        }
      );
      if (res.data.success) {
        setLoading(false);
        setTraineeAttendingCourses(res.data.success);
      } else {
        return setLoading(false);
      }
    };
    getAllTraineeAttendingCourses();
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
      <AttendedTitle>Your Attended Courses</AttendedTitle>
      <AttendedUl>
        {traineeAttendingCourses?.length > 0 ? (
          traineeAttendingCourses?.map((traineeCourse) => (
            <AttendedDiv key={traineeCourse.bookingId}>
              <AttendedList>
                <AttendedDivFlex>
                  <AttendedDivRight>
                    <AttendedDivContent>
                      Your course Progress for
                      <span>{" " + traineeCourse.trainee_course_name}</span>
                    </AttendedDivContent>
                  </AttendedDivRight>
                  <AttendedDivLeft>
                    <AttendedDivButtons
                      onClick={() => toggleShowDetails(traineeCourse.bookingId)}
                    >
                      Click here to view all session details
                    </AttendedDivButtons>
                  </AttendedDivLeft>
                </AttendedDivFlex>
                {selected === traineeCourse.bookingId ? (
                  <SessionDetailsDiv>
                    <TraineeAttendingCoursesDetails
                      traineeCourse={traineeCourse}
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
                    Courses
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

export default TraineeAttendingCourses;
