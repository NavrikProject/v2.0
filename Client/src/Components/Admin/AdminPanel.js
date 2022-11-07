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
import AllTraineeCompletedCourses from "./AllTraineecompletedCourses";
import TraineeIncompleteCourses from "./TraineeIncompleteCourses";
import ViewAllLiveClasses from "./ViewAllLiveClasses";
import ViewAllTraineeProgress from "./ViewAllTraineeProgress";

const AdminPanel = () => {
  const [showTraineeCourse, setShowTraineeCourse] = useState(true);
  const [showAllTraineeProgress, setShowAllTraineeProgress] = useState(false);
  const [showInstructorBooking, setShowInstructorBooking] = useState(false);
  const [showLiveClasses, setShowLiveClasses] = useState(false);
  const [showCompletedLiveClasses, setCompletedLiveClasses] = useState(false);
  const showAddTraineeCourseHandler = () => {
    setShowTraineeCourse(!showTraineeCourse);
    setShowAllTraineeProgress(false);
    setShowInstructorBooking(false);
    setShowLiveClasses(false);
    setCompletedLiveClasses(false);
  };
  const showTraineeProgressHandler = () => {
    setShowAllTraineeProgress(!showAllTraineeProgress);
    setShowTraineeCourse(false);
    setShowInstructorBooking(false);
    setShowLiveClasses(false);
    setCompletedLiveClasses(false);
  };
  const showInstructorBookingHandler = () => {
    setShowInstructorBooking(!showInstructorBooking);
    setShowAllTraineeProgress(false);
    setShowTraineeCourse(false);
    setShowLiveClasses(false);
    setCompletedLiveClasses(false);
  };
  const showLiveInstructorClassesHandler = () => {
    setShowLiveClasses(!showLiveClasses);
    setShowInstructorBooking(false);
    setShowAllTraineeProgress(false);
    setShowTraineeCourse(false);
    setCompletedLiveClasses(false);
  };
  const showLiveCompletedClassesHandler = () => {
    setShowLiveClasses(false);
    setShowInstructorBooking(false);
    setShowAllTraineeProgress(false);
    setShowTraineeCourse(false);
    setCompletedLiveClasses(!showCompletedLiveClasses);
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
                <SidebarListItem onClick={showInstructorBookingHandler}>
                  <QuickMenuTitle>Schedule Instructor Class</QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem onClick={showLiveInstructorClassesHandler}>
                  <QuickMenuTitle>Live Classes</QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem onClick={showLiveCompletedClassesHandler}>
                  <QuickMenuTitle>Course Completed lists</QuickMenuTitle>
                </SidebarListItem>
              </SidebarListUl>
            </Wrapper>
          </RightDiv>
          <LeftDiv>
            <Wrapper>
              <DetailsWrapper>
                {showTraineeCourse && <AddTraineeCourses />}
                {showAllTraineeProgress && <ViewAllTraineeProgress />}
                {showInstructorBooking && <TraineeIncompleteCourses />}
                {showLiveClasses && <ViewAllLiveClasses />}
                {showCompletedLiveClasses && <AllTraineeCompletedCourses />}
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
