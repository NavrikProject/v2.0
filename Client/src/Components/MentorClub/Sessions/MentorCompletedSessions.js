import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CompletedAllSessionDetails from "./MentorCompletedAllSessionDetails";
import LoadingSpinner from "../../utils/LoadingSpinner";
const Div = styled.div``;
const CompletedTitle = styled.h1`
  color: #111;
  opacity: 0.7;
  padding-bottom: 10px;
`;
const CompletedDiv = styled.div`
  margin: 5px 0;
  padding: 20px;
  box-shadow: rgb(142 151 158 / 15%) 0px 4px 19px;
  height: auto;
`;
const CompletedUl = styled.ol``;
const CompletedList = styled.li``;
const CompletedDivFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;
const CompletedDivRight = styled.div``;
const CompletedDivContent = styled.p`
  font-size: 18px;
  color: #111;
  opacity: 0.9;
  span {
    font-weight: 600;
  }
`;
const CompletedDivLeft = styled.div``;
const CompletedDivButtons = styled.button`
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
const CompletedSessions = () => {
  const [loading, setLoading] = useState(false);
  const [completedSessions, setCompletedSessions] = useState([]);
  const [selected, setSelected] = useState(null);

  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;

  useEffect(() => {
    const getAllCompletedSessions = async () => {
      setLoading(true);
      const res = await axios.post(
        `/mentor/bookings/get/all-bookings/completed`,
        {
          headers: { authorization: "Bearer " + token },
          userEmail: user?.email,
        }
      );
      if (res.data.details) {
        setLoading(false);
        setCompletedSessions(res.data.details);
      } else {
        return setLoading(false);
      }
    };
    getAllCompletedSessions();
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
      <CompletedTitle>Your Completed Sessions</CompletedTitle>
      <CompletedUl>
        {completedSessions?.length > 0 ? (
          completedSessions?.map((completedSession) => (
            <CompletedDiv key={completedSession.bookingId}>
              <CompletedList>
                <CompletedDivFlex>
                  <CompletedDivRight>
                    <CompletedDivContent>
                      A session on
                      <span>
                        {" " +
                          new Date(
                            completedSession.bookingDate
                          ).toDateString() +
                          " "}
                      </span>
                      and Time is
                      <span>{" " + completedSession.time}</span>
                    </CompletedDivContent>
                  </CompletedDivRight>
                  <CompletedDivLeft>
                    <CompletedDivButtons
                      onClick={() =>
                        toggleShowDetails(completedSession.bookingId)
                      }
                    >
                      Click here to view all session details
                    </CompletedDivButtons>
                  </CompletedDivLeft>
                </CompletedDivFlex>
                {selected === completedSession.bookingId ? (
                  <SessionDetailsDiv>
                    <CompletedAllSessionDetails mentor={completedSession} />
                  </SessionDetailsDiv>
                ) : null}
              </CompletedList>
            </CompletedDiv>
          ))
        ) : (
          <CompletedDiv>
            <CompletedDivFlex>
              <CompletedDivRight>
                <CompletedDivContent>
                  <span>You have not completed any sessions! </span>
                </CompletedDivContent>
              </CompletedDivRight>
              <CompletedDivLeft></CompletedDivLeft>
            </CompletedDivFlex>
          </CompletedDiv>
        )}
      </CompletedUl>
    </Div>
  );
};

export default CompletedSessions;
