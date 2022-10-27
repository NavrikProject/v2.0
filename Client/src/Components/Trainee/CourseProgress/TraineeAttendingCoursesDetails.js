import React from "react";
import styled from "styled-components";
import { JoinButton } from "../ButtonElements.js";

const UpcomingAllDivContent = styled.div`
  font-size: 20px;
  color: #111;
  opacity: 0.9;
  span {
    font-weight: 600;
    text-transform: uppercase;
  }
  margin-bottom: 12px;
`;
const JoinButtonDiv = styled.div`
  padding: 20px 0;
`;

const NoteText = styled.p`
  color: #111;
  opacity: 0.5;
  padding-top: 10px;
`;
const FillDiv = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  height: 20px;
`;
const FillDivProgress = styled.div`
  background-color: blue;
  height: 20px;
  width: ${({ color }) => color * 1 + "%"};
`;
const TraineeAttendingCoursesDetails = (props) => {
  return (
    <div>
      <div>
        <UpcomingAllDivContent>
          <div>
            <span>Course Progress</span>
            <FillDiv>
              <FillDivProgress
                color={props.traineeCourse.trainee_course_progress_percentage}
              />
            </FillDiv>
            {props.traineeCourse.trainee_course_progress_percentage +
              "%  completed"}
          </div>
        </UpcomingAllDivContent>
        <JoinButton>Join Instructor Session</JoinButton>
      </div>
    </div>
  );
};

export default TraineeAttendingCoursesDetails;
