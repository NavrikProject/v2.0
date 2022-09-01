import React, { useState } from "react";
import styled from "styled-components";
import Model from "./Model";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../utils/LoadingSpinner";
import { useForm } from "react-hook-form";

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
  padding: 0px 0px;
  width: 90%;
  margin: 0 auto;
`;

const CancelDescriptor = styled.p`
  font-size: 16px;
`;

const MentorBoxDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 10px;
`;

const ConfirmButton = styled.button`
  margin: 0 10px 0 0;
  width: 100%;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  border-radius: 5px;
  background-color: red;

  &:hover {
    opacity: 0.7;
    background-color: red;

    transition: all 0.5s ease-in-out;
  }
`;
const CancelProcess = styled.button`
  margin: 0 0 0 10px;
  width: 100%;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  border-radius: 5px;
  background-color: #9772fb;
  &:hover {
    background-color: lightblue;
    transition: all 0.5s ease-in-out;
  }
`;
const FormSelect = styled.select`
  height: 30px;
  width: 100%;
  font-size: 18px;
  border-radius: 5px;
  padding-bottom: 10px;
  &:focus {
    border-color: #fc83bb;
  }
`;
const FormOption = styled.option``;
const LabelTitle = styled.p`
  font-size: 16px;
  padding: 7px 0;
`;
const TextArea = styled.textarea`
  width: 100%;
  padding-bottom: 10px;
  font-size: 16px;
  ::placeholder {
    font-size: 18px;
    padding-left: 10px;
  }
`;
const ButtonDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const ErrorMessage = styled.p`
  color: red;
  margin: 0 0px 0px 10px;
`;
const FormData = styled.div``;
const CancelAppointment = ({ mentor, showCancelMentorModel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const requestForRefundHandler = async (data) => {
    try {
      setLoading(true);
      const result = await axios.post(
        "/mentor/profile/update/bookings/issue-refund",
        {
          bookingId: mentor.bookingId,
          selected: data.selected,
          reason: data.reason,
        }
      );
      if (result.data.success) {
        return (
          toast.success(result.data.success, {
            position: "top-center",
          }),
          setSuccess(result.data.success),
          setLoading(false),
          reset()
        );
      }
      if (result.data.error) {
        return (
          toast.error(result.data.error, {
            position: "top-center",
          }),
          setLoading(false),
          setError(result.data.error),
          reset()
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
            <p style={{ color: "red", fontSize: "20px" }}>
              There was an issue while refunding your account
            </p>
          )}
          {success && (
            <p style={{ color: "green", fontSize: "20px" }}>{success}</p>
          )}
          <form onSubmit={handleSubmit(requestForRefundHandler)}>
            <MentorBoxDiv>
              <LabelTitle>Choose one the Reason for cancellation:</LabelTitle>
              <FormSelect
                name="selected"
                {...register("selected", {
                  required: "Select from the dropdown",
                })}
              >
                <FormOption value="">Choose option below</FormOption>
                <FormOption value="health issues">Health issues</FormOption>
                <FormOption value="I don't have time for attending the session">
                  I don't have time for attending the session
                </FormOption>
                <FormOption value="Reason not listed">
                  Reason not listed
                </FormOption>
              </FormSelect>
              {errors.selected && (
                <ErrorMessage>{errors.selected.message}</ErrorMessage>
              )}
              <LabelTitle>Reason for cancellation :</LabelTitle>
              <TextArea
                name="reason"
                {...register("reason", {
                  required: "Clearly explain why you are cancelling",
                })}
                cols="30"
                rows="7"
                placeholder="Explain the reason of cancelling appointment in detail....."
              ></TextArea>
              {errors.reason && (
                <ErrorMessage>{errors.reason.message}</ErrorMessage>
              )}
            </MentorBoxDiv>
            <ButtonDiv>
              <ConfirmButton type="submit">Confirm Cancel</ConfirmButton>
              <CancelProcess onClick={showCancelMentorModel}>
                Abort Process
              </CancelProcess>
            </ButtonDiv>
            <MentorBoxDiv>
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
            </MentorBoxDiv>
          </form>
        </FormData>
      </FormDiv>
    </Model>
  );
};

export default CancelAppointment;
