import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GoToTop from "../../GoToTop";
import TraineeAttendingCourses from "./TraineeAttendingCourses";
import TraineeCompletedCourses from "./TraineeCompletedCourses";

const Section = styled.section`
  width: 100%;
  height: 100vh;
`;
const Div = styled.div`
  display: flex;
`;
const RightDiv = styled.div`
  flex: 2.5;
  position: sticky;
  top: 120px;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(245, 245, 245, 1) 32%,
    rgba(224, 251, 252, 1) 100%
  );
`;
const LeftDiv = styled.div`
  flex: 9.5;
  overflow: scroll;
  height: 100vh;
`;
const SidebarListUl = styled.ul`
  list-style: none;
  padding: 10px;
`;
const SidebarListItem = styled.li`
  width: 100%;
  cursor: pointer;
  border-bottom: 1px solid lightgrey;
  :nth-child(3) {
    border-bottom: none;
  }
  &:hover {
    background-color: lightgrey;
  }
`;
const Wrapper = styled.div`
  padding: 30px;
`;
const QuickMenuTitle = styled.h3`
  font-size: 21px;
  color: black;
  opacity: 0.9;
  font-weight: 400;
`;

const TraineeCourseProgress = () => {
  const [showProgressingCourses, setShowProgressingCourses] = useState(true);
  const [completedCourse, setCompletedCourse] = useState(false);
  return (
    <Section>
      <Div>
        <RightDiv>
          <Wrapper>
            <h1>Quick Menu</h1>
            <SidebarListUl>
              <SidebarListItem>
                <QuickMenuTitle>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                      opacity: 0.9,
                    }}
                    to={`/trainee/profile`}
                  >
                    View Profile
                  </Link>
                </QuickMenuTitle>
              </SidebarListItem>
              <SidebarListItem
                active
                onClick={() => {
                  return (
                    setShowProgressingCourses(!showProgressingCourses),
                    setCompletedCourse(false)
                  );
                }}
              >
                <QuickMenuTitle>My Course Progress</QuickMenuTitle>
              </SidebarListItem>
              <SidebarListItem
                onClick={() => {
                  return (
                    setCompletedCourse(!completedCourse),
                    setShowProgressingCourses(false)
                  );
                }}
              >
                <QuickMenuTitle>Completed</QuickMenuTitle>
              </SidebarListItem>
            </SidebarListUl>
          </Wrapper>
        </RightDiv>
        <LeftDiv>
          <Wrapper>
            {showProgressingCourses && <TraineeAttendingCourses />}
            {completedCourse && <TraineeCompletedCourses />}
          </Wrapper>
        </LeftDiv>
      </Div>
      <GoToTop />
    </Section>
  );
};

export default TraineeCourseProgress;
