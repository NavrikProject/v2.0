import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GoToTop from "../GoToTop";
import AttendedSessions from "./Sessions/AttendedSessions";
import CompletedSessions from "./Sessions/CompletedSessions";
import NotAttendedSessions from "./Sessions/NotAttendedSessions";
import RefundedSessions from "./Sessions/RefundedSessions";
import UpcomingSession from "./Sessions/UpcomingSession";
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

  :nth-child(7) {
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

const TraineeSessionDetails = () => {
  const [showUpcomingSessions, setShowUpcomingSessions] = useState(true);
  const [attendedSession, setAttendedSession] = useState(false);
  const [completedSession, setCompletedSession] = useState(false);
  const [refundedSession, setRefundedSession] = useState(false);
  const [notAttendedSession, setNotAttendedSession] = useState(false);
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
                    setShowUpcomingSessions(!showUpcomingSessions),
                    setAttendedSession(false),
                    setCompletedSession(false),
                    setRefundedSession(false),
                    setNotAttendedSession(false)
                  );
                }}
              >
                <QuickMenuTitle>Upcoming</QuickMenuTitle>
              </SidebarListItem>
              <SidebarListItem
                onClick={() => {
                  return (
                    setShowUpcomingSessions(false),
                    setAttendedSession(!attendedSession),
                    setCompletedSession(false),
                    setRefundedSession(false),
                    setNotAttendedSession(false)
                  );
                }}
              >
                <QuickMenuTitle>Attended</QuickMenuTitle>
              </SidebarListItem>
              <SidebarListItem
                onClick={() => {
                  return (
                    setShowUpcomingSessions(false),
                    setAttendedSession(false),
                    setCompletedSession(!completedSession),
                    setRefundedSession(false),
                    setNotAttendedSession(false)
                  );
                }}
              >
                <QuickMenuTitle>Completed</QuickMenuTitle>
              </SidebarListItem>
              <SidebarListItem
                onClick={() => {
                  return (
                    setShowUpcomingSessions(false),
                    setAttendedSession(false),
                    setCompletedSession(false),
                    setRefundedSession(!refundedSession),
                    setNotAttendedSession(false)
                  );
                }}
              >
                <QuickMenuTitle>Refunded</QuickMenuTitle>
              </SidebarListItem>
              <SidebarListItem
                onClick={() => {
                  return (
                    setShowUpcomingSessions(false),
                    setAttendedSession(false),
                    setCompletedSession(false),
                    setRefundedSession(false),
                    setNotAttendedSession(!notAttendedSession)
                  );
                }}
              >
                <QuickMenuTitle>Not Attended</QuickMenuTitle>
              </SidebarListItem>
              <SidebarListItem>
                <QuickMenuTitle>Check Refund Status</QuickMenuTitle>
              </SidebarListItem>
            </SidebarListUl>
          </Wrapper>
        </RightDiv>
        <LeftDiv>
          <Wrapper>
            {showUpcomingSessions && <UpcomingSession />}
            {attendedSession && <AttendedSessions />}
            {completedSession && <CompletedSessions />}
            {refundedSession && <RefundedSessions />}
            {notAttendedSession && <NotAttendedSessions />}
          </Wrapper>
        </LeftDiv>
      </Div>
      <GoToTop />
    </Section>
  );
};

export default TraineeSessionDetails;
