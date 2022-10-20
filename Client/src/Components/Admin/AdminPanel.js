import React, { useState } from "react";
import GoToTop from "../GoToTop";
import AddTraineeCourses from "./AddTraineeCourses";
import {
  DetailsWrapper,
  Div,
  LeftDiv,
  QuickMenuTitle,
  RightDiv,
  Section,
  SidebarListItem,
  SidebarListUl,
  Wrapper,
} from "./AdminPanelElements";
import ViewAllTraineeProgress from "./ViewAllTraineeProgress";

const AdminPanel = () => {
  const [showTraineeCourse, setShowTraineeCourse] = useState(true);
  const [showAllTraineeProgress, setShowAllTraineeProgress] = useState(false);
  const showAddTraineeCourseHandler = () => {
    setShowTraineeCourse(!showTraineeCourse);
    setShowAllTraineeProgress(false);
  };
  const showTraineeProgressHandler = () => {
    setShowAllTraineeProgress(!showAllTraineeProgress);
    setShowTraineeCourse(false);
  };

  return (
    <>
      <Section>
        <Div>
          <RightDiv>
            <Wrapper>
              <h1>Quick Menu</h1>
              <SidebarListUl>
                <SidebarListItem onClick={showAddTraineeCourseHandler}>
                  <QuickMenuTitle>Add Trainee course</QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem onClick={showTraineeProgressHandler}>
                  <QuickMenuTitle>View Trainee Progress</QuickMenuTitle>
                </SidebarListItem>
              </SidebarListUl>
            </Wrapper>
          </RightDiv>
          <LeftDiv>
            <Wrapper>
              <DetailsWrapper>
                {showTraineeCourse && <AddTraineeCourses />}
                {showAllTraineeProgress && <ViewAllTraineeProgress />}
              </DetailsWrapper>
            </Wrapper>
          </LeftDiv>
        </Div>
        <GoToTop />
      </Section>
    </>
  );
};

export default AdminPanel;
