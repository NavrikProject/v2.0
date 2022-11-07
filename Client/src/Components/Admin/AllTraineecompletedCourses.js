import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LoadingSpinner from "../utils/LoadingSpinner";
import AllTraineeCompletedCoursesDetails from "./AllTraineeCompletedCoursesDetails";
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
const AllTraineeCompletedCourses = () => {
  const [loading, setLoading] = useState(false);
  const [traineeAttendingCourses, setTraineeAttendingCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;

  useEffect(() => {
    const getAllTraineeAttendingCourses = async () => {
      setLoading(true);
      const res = await axios.get(`/admin/get/all/completed-courses`, {
        headers: { authorization: "Bearer " + token },
      });
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
      <AttendedTitle>All Trainee Course Completed</AttendedTitle>
      <AttendedUl>
        {traineeAttendingCourses?.length > 0 ? (
          traineeAttendingCourses?.map((traineeCourse) => (
            <AttendedDiv key={traineeCourse.trainee_course_dtls_id}>
              <AttendedList>
                <AttendedDivFlex>
                  <AttendedDivRight>
                    <AttendedDivContent>
                      Course Progress for
                      <span>{" " + traineeCourse.trainee_fullname}</span> course
                      name is
                      <span>{" " + traineeCourse.trainee_course_name}</span>
                    </AttendedDivContent>
                  </AttendedDivRight>
                  <AttendedDivLeft>
                    <AttendedDivButtons
                      onClick={() =>
                        toggleShowDetails(traineeCourse.trainee_course_dtls_id)
                      }
                    >
                      Know more
                    </AttendedDivButtons>
                  </AttendedDivLeft>
                </AttendedDivFlex>
                {selected === traineeCourse.trainee_course_dtls_id ? (
                  <SessionDetailsDiv>
                    <AllTraineeCompletedCoursesDetails
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
                  <span>No one has complete the min course progress</span>
                </AttendedDivContent>
              </AttendedDivRight>
            </AttendedDivFlex>
          </AttendedDiv>
        )}
      </AttendedUl>
    </Div>
  );
};

export default AllTraineeCompletedCourses;
