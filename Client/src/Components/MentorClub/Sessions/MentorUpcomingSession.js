import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import UpcomingAllSessionDetails from "./MentorUpcomingAllSessionDetails";
import LoadingSpinner from "../../utils/LoadingSpinner";
const Div = styled.div``;
const UpcomingTitle = styled.h1`
  color: #111;
  opacity: 0.7;
  padding-bottom: 10px;
`;
const UpcomingDiv = styled.div`
  margin: 5px 0;
  padding: 20px;
  box-shadow: rgb(142 151 158 / 15%) 0px 4px 19px;
  height: auto;
`;
const UpcomingUl = styled.ol``;
const UpcomingList = styled.li``;
const UpcomingDivFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;
const UpcomingDivRight = styled.div``;
const UpcomingDivContent = styled.p`
  font-size: 18px;
  color: #111;
  opacity: 0.9;
  span {
    font-weight: 600;
  }
`;
const UpcomingDivLeft = styled.div``;
const UpcomingDivButtons = styled.button`
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
const MentorUpcomingSession = () => {
  const [loading, setLoading] = useState(false);
  const [upComingSessions, setUpComingSessions] = useState([]);
  const [selected, setSelected] = useState(null);

  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;

  useEffect(() => {
    const getAllMentorUpcomingSessions = async () => {
      setLoading(true);
      const res = await axios.post(
        `/mentor/bookings/get/all-bookings/upcoming`,
        {
          headers: { authorization: "Bearer " + token },
          userEmail: user?.email,
        }
      );
      if (res.data.details) {
        setLoading(false);
        setUpComingSessions(res.data.details);
      } else {
        return setLoading(false);
      }
    };
    getAllMentorUpcomingSessions();
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
      <UpcomingTitle>Your Upcoming Sessions</UpcomingTitle>
      <UpcomingUl>
        {upComingSessions?.length > 0 ? (
          upComingSessions?.map((upcomingSession) => (
            <UpcomingDiv key={upcomingSession.bookingId}>
              <UpcomingList>
                <UpcomingDivFlex>
                  <UpcomingDivRight>
                    <UpcomingDivContent>
                      A session on
                      <span>
                        {" " +
                          new Date(upcomingSession.bookingDate).toDateString() +
                          " "}
                      </span>
                      and Time is
                      <span>{" " + upcomingSession.time}</span>
                    </UpcomingDivContent>
                  </UpcomingDivRight>
                  <UpcomingDivLeft>
                    <UpcomingDivButtons
                      onClick={() =>
                        toggleShowDetails(upcomingSession.bookingId)
                      }
                    >
                      Click here to view all session details
                    </UpcomingDivButtons>
                  </UpcomingDivLeft>
                </UpcomingDivFlex>
                {selected === upcomingSession.bookingId ? (
                  <SessionDetailsDiv>
                    <UpcomingAllSessionDetails mentor={upcomingSession} />
                  </SessionDetailsDiv>
                ) : null}
              </UpcomingList>
            </UpcomingDiv>
          ))
        ) : (
          <UpcomingDiv>
            <UpcomingDivFlex>
              <UpcomingDivRight>
                <UpcomingDivContent>
                  <span> Noo appointments found</span>
                </UpcomingDivContent>
              </UpcomingDivRight>
              <UpcomingDivLeft></UpcomingDivLeft>
            </UpcomingDivFlex>
          </UpcomingDiv>
        )}
      </UpcomingUl>
    </Div>
  );
};

export default MentorUpcomingSession;
