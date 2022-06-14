import React from "react";
import {
  MentorCourseBox,
  MentorCourseTitle,
  MentorDiv,
} from "./CorpoTrainingElements";

const CorpoCourseCard = () => {
  return (
    <>
      <MentorDiv>
        <MentorCourseBox>
          <MentorCourseTitle>Implementing RPA COE-5 days</MentorCourseTitle>
        </MentorCourseBox>
      </MentorDiv>
      <MentorDiv>
        <MentorCourseBox>
          <MentorCourseTitle>RPA for Managers-3 days</MentorCourseTitle>
        </MentorCourseBox>
      </MentorDiv>
      <MentorDiv>
        <MentorCourseBox>
          <MentorCourseTitle>RPA Developer-20 days</MentorCourseTitle>
        </MentorCourseBox>
      </MentorDiv>
      <MentorDiv>
        <MentorCourseBox>
          <MentorCourseTitle>RPA for Business Analysts-5</MentorCourseTitle>
        </MentorCourseBox>
      </MentorDiv>
      <MentorDiv>
        <MentorCourseBox>
          <MentorCourseTitle>Design Thinking</MentorCourseTitle>
        </MentorCourseBox>
      </MentorDiv>
      <MentorDiv>
        <MentorCourseBox>
          <MentorCourseTitle>RPA Advanced Course</MentorCourseTitle>
        </MentorCourseBox>
      </MentorDiv>
    </>
  );
};

export default CorpoCourseCard;
