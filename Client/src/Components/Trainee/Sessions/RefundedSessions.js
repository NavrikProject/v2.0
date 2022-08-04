import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import RefundedAllSessionDetails from "./RefundedAllSessionDetails";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { Link } from "react-router-dom";
const Div = styled.div``;
const RefundedTitle = styled.h1`
  color: #111;
  opacity: 0.7;
  padding-bottom: 10px;
`;
const RefundedDiv = styled.div`
  margin: 5px 0;
  padding: 20px;
  box-shadow: rgb(142 151 158 / 15%) 0px 4px 19px;
  height: auto;
`;
const RefundedUl = styled.ol``;
const RefundedList = styled.li``;
const RefundedDivFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;
const RefundedDivRight = styled.div``;
const RefundedDivContent = styled.p`
  font-size: 18px;
  color: #111;
  opacity: 0.9;
  span {
    font-weight: 600;
  }
`;
const RefundedDivLeft = styled.div``;
const RefundedDivButtons = styled.button`
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
const RefundedSessions = () => {
  const [loading, setLoading] = useState(false);
  const [refundedSessions, setRefundedSessions] = useState([]);
  const [selected, setSelected] = useState(null);

  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;

  useEffect(() => {
    const getAllRefundedSessions = async () => {
      setLoading(true);
      const res = await axios.post(`/mentor/profile/get/bookings/refunded`, {
        headers: { authorization: "Bearer " + token },
        userEmail: user?.email,
      });
      if (res.data.details) {
        setLoading(false);
        setRefundedSessions(res.data.details);
      } else {
        return setLoading(false);
      }
    };
    getAllRefundedSessions();
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
      <RefundedTitle>Your Refunded Sessions</RefundedTitle>
      <RefundedUl>
        {refundedSessions?.length > 0 ? (
          refundedSessions?.map((refundedSession) => (
            <RefundedDiv key={refundedSession.bookingId}>
              <RefundedList>
                <RefundedDivFlex>
                  <RefundedDivRight>
                    <RefundedDivContent>
                      A session on
                      <span>
                        {" " +
                          new Date(refundedSession.bookingDate).toDateString() +
                          " "}
                      </span>
                      and Time is
                      <span>{" " + refundedSession.time}</span>
                    </RefundedDivContent>
                  </RefundedDivRight>
                  <RefundedDivLeft>
                    <RefundedDivButtons
                      onClick={() =>
                        toggleShowDetails(refundedSession.bookingId)
                      }
                    >
                      Click here to view all session details
                    </RefundedDivButtons>
                  </RefundedDivLeft>
                </RefundedDivFlex>
                {selected === refundedSession.bookingId ? (
                  <SessionDetailsDiv>
                    <RefundedAllSessionDetails mentor={refundedSession} />
                  </SessionDetailsDiv>
                ) : null}
              </RefundedList>
            </RefundedDiv>
          ))
        ) : (
          <RefundedDiv>
            <RefundedDivFlex>
              <RefundedDivRight>
                <RefundedDivContent>
                  <span>You have not cancelled any appointments yet</span>
                </RefundedDivContent>
              </RefundedDivRight>
              <RefundedDivLeft>
                <RefundedDivButtons>
                  <Link to={"/mentors-club"} style={{ color: "white" }}>
                    Find Mentors
                  </Link>
                </RefundedDivButtons>
              </RefundedDivLeft>
            </RefundedDivFlex>
          </RefundedDiv>
        )}
      </RefundedUl>
    </Div>
  );
};

export default RefundedSessions;
