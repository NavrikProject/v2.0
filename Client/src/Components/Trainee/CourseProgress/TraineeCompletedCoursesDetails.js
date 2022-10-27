import React from "react";
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
  return (
    <div>
      <div>
        <UpcomingAllDivContent>
          You have successfully completed a course
          {props.traineeCourse.trainee_course_name}
        </UpcomingAllDivContent>
        <JoinButtonDiv>
          <div>
            <RebookAppointment>
              <Link
                style={{ textDecoration: "none", color: " #fff" }}
                to={`/mentors-club
                `}
              >
                Book Again
              </Link>
            </RebookAppointment>
          </div>
        </JoinButtonDiv>
      </div>
    </div>
  );
};
export default TraineeCompletedCoursesDetails;
