import React from "react";
import { useState } from "react";
import styled from "styled-components";
import MentorAttendedSessions from "./MentorAttendedSessions";
import MentorCompletedSessions from "./MentorCompletedSessions";
import MentorCancelledSession from "./MentorCancelledSession";
import MentorUpcomingSession from "./MentorUpcomingSession";
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
  :nth-child(5) {
    border-bottom: none;
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

const MentorSessionDetails = () => {
  const [showUpcomingSessions, setShowUpcomingSessions] = useState(true);
  const [attendedSession, setAttendedSession] = useState(false);
  const [completedSession, setCompletedSession] = useState(false);
  const [refundedSession, setRefundedSession] = useState(false);
  return (
    <Section>
      <Div>
        <RightDiv>
          <Wrapper>
            <h1>Quick Menu</h1>
            <SidebarListUl>
              <SidebarListItem
                onClick={() => {
                  return (
                    setShowUpcomingSessions(!showUpcomingSessions),
                    setAttendedSession(false),
                    setCompletedSession(false),
                    setRefundedSession(false)
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
                    setRefundedSession(false)
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
                    setRefundedSession(false)
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
                    setRefundedSession(!refundedSession)
                  );
                }}
              >
                <QuickMenuTitle>Cancelled</QuickMenuTitle>
              </SidebarListItem>
            </SidebarListUl>
          </Wrapper>
        </RightDiv>
        <LeftDiv>
          <Wrapper>
            {showUpcomingSessions && <MentorUpcomingSession />}
            {attendedSession && <MentorAttendedSessions />}
            {completedSession && <MentorCompletedSessions />}
            {refundedSession && <MentorCancelledSession />}
          </Wrapper>
        </LeftDiv>
      </Div>
    </Section>
  );
};

export default MentorSessionDetails;
