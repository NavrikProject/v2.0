import React, { useState } from "react";
import styled from "styled-components";
import Model from "./Model";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../utils/LoadingSpinner";

const CloseButton = styled(AiOutlineClose)`
  font-size: 25px;
  color: #111;
  cursor: pointer;
`;
const CloseButtonDiv = styled.div`
  height: 30px;
  width: 30px;
  position: absolute;
  top: 14px;
  right: 16px;
  cursor: pointer;
`;
const FormDiv = styled.div`
  padding: 40px 20px;
  width: 90%;
  margin: 0 auto;
`;
const Terms = styled.div`
  position: absolute;
  bottom: 14px;
  left: 16px;
  cursor: pointer;
`;
const ProceedBtn = styled.button`
  outline: none;
  cursor: pointer;
  padding: 12px 33px;
  background-color: blue;
  color: white;
  transition: all 0.4s ease-in-out;
  border: none;
  border-radius: 7px;
  margin-right: 10px;
`;
const CancelBtn = styled.button`
  outline: none;
  cursor: pointer;
  padding: 12px 24px;
  background-color: red;
  color: white;
  transition: all 0.4s ease-in-out;
  border: none;
  border-radius: 7px;
  margin-left: 10px;
`;
const CancelDescriptor = styled.p`
  margin-bottom: 20px;
  font-size: 20px;
`;
const FormData = styled.div``;
const CancelAppointment = ({ mentor, showCancelMentorModel }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const requestForRefundHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const result = await axios.post(
        "/mentor/profile/update/bookings/issue-refund",
        {
          bookingId: mentor.bookingId,
        }
      );
      if (result.data.success) {
        return (
          toast.success(result.data.success, {
            position: "top-center",
          }),
          setSuccess(result.data.success),
          setLoading(false)
        );
      }
      if (result.data.error) {
        return (
          toast.error(result.data.error, {
            position: "top-center",
          }),
          setLoading(false),
          setError(result.data.error)
        );
      }
    } catch (error) {
      return;
    }
  };
  return (
    <Model>
      <CloseButtonDiv onClick={showCancelMentorModel}>
        <CloseButton />
      </CloseButtonDiv>
      <FormDiv>
        <FormData>
          {loading && <LoadingSpinner />}
          {error && (
            <p style={{ color: "red" }}>
              There was an issue while refunding your account
            </p>
          )}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <form onSubmit={requestForRefundHandler}>
            <CancelDescriptor>
              * If you cancel the appointment there will be 20% charge on the
              paid amount see our
              <Link
                to="/terms-conditions"
                style={{
                  textDecoration: "none",
                  color: "red",
                  curser: "pointer",
                }}
              >
                policies and conditions.
              </Link>
            </CancelDescriptor>
            <ProceedBtn type="submit">Cancel Appointment</ProceedBtn>
            <CancelBtn type="submit" onClick={showCancelMentorModel}>
              Cancel this process
            </CancelBtn>
          </form>
        </FormData>
        <Terms></Terms>
      </FormDiv>
    </Model>
  );
};

export default CancelAppointment;
