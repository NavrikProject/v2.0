import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CancelledAllSessionDetails from "./MentorCancelledAllSessionDetails";
import LoadingSpinner from "../../utils/LoadingSpinner";
const Div = styled.div``;
const CancelledTitle = styled.h1`
  color: #111;
  opacity: 0.7;
  padding-bottom: 10px;
`;
const CancelledDiv = styled.div`
  margin: 5px 0;
  padding: 20px;
  box-shadow: rgb(142 151 158 / 15%) 0px 4px 19px;
  height: auto;
`;
const CancelledUl = styled.ol``;
const CancelledList = styled.li``;
const CancelledDivFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;
const CancelledDivRight = styled.div``;
const CancelledDivContent = styled.p`
  font-size: 18px;
  color: #111;
  opacity: 0.9;
  span {
    font-weight: 600;
  }
`;
const CancelledDivLeft = styled.div``;
const CancelledDivButtons = styled.button`
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
const CancelledSessions = () => {
  const [loading, setLoading] = useState(false);
  const [cancelledSessions, setCancelledSessions] = useState([]);
  const [selected, setSelected] = useState(null);

  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;

  useEffect(() => {
    const getAllCancelledSessions = async () => {
      setLoading(true);
      const res = await axios.post(
        `/mentor/bookings/get/all-bookings/cancelled`,
        {
          headers: { authorization: "Bearer " + token },
          userEmail: user?.email,
        }
      );
      if (res.data.details) {
        setLoading(false);
        setCancelledSessions(res.data.details);
      } else {
        return setLoading(false);
      }
    };
    getAllCancelledSessions();
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
      <CancelledTitle>Your Cancelled Sessions</CancelledTitle>
      <CancelledUl>
        {cancelledSessions?.length > 0 ? (
          cancelledSessions?.map((cancelledSession) => (
            <CancelledDiv key={cancelledSession.bookingId}>
              <CancelledList>
                <CancelledDivFlex>
                  <CancelledDivRight>
                    <CancelledDivContent>
                      A session on
                      <span>
                        {" " +
                          new Date(
                            cancelledSession.bookingDate
                          ).toDateString() +
                          " "}
                      </span>
                      and Time is
                      <span>{" " + cancelledSession.time}</span>
                    </CancelledDivContent>
                  </CancelledDivRight>
                  <CancelledDivLeft>
                    <CancelledDivButtons
                      onClick={() =>
                        toggleShowDetails(cancelledSession.bookingId)
                      }
                    >
                      Click here to view all session details
                    </CancelledDivButtons>
                  </CancelledDivLeft>
                </CancelledDivFlex>
                {selected === cancelledSession.bookingId ? (
                  <SessionDetailsDiv>
                    <CancelledAllSessionDetails mentor={cancelledSession} />
                  </SessionDetailsDiv>
                ) : null}
              </CancelledList>
            </CancelledDiv>
          ))
        ) : (
          <CancelledDiv>
            <CancelledDivFlex>
              <CancelledDivRight>
                <CancelledDivContent>
                  <span>You have not cancelled any appointments yet</span>
                </CancelledDivContent>
              </CancelledDivRight>
              <CancelledDivLeft></CancelledDivLeft>
            </CancelledDivFlex>
          </CancelledDiv>
        )}
      </CancelledUl>
    </Div>
  );
};

export default CancelledSessions;
