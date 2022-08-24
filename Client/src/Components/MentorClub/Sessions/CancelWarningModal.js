import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import LoadingSpinner from "../../utils/LoadingSpinner";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 12000000000;
  background-color: rgba(0, 0, 0, 0.75);
`;
const Modal = styled.div`
  position: fixed;
  top: 18vh;
  left: 5%;
  width: 90%;
  height: auto;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 100000;
  animation: slide-down 300ms ease-out forwards;
  @media (min-width: 768px) {
    width: 40rem;
    left: calc(50% - 20rem);
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
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

const MentorBoxDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 10px;
`;
const MentorSessionName = styled.p`
  font-size: 15px;
  padding-bottom: 8px;
  span {
    font-weight: 600;
    color: #077f7f;
    font-size: 19px;
    text-transform: capitalize;
  }
`;
const MentorBookedDate = styled.p`
  span {
    margin: 0 10px;
    color: gray;
  }
  padding-bottom: 8px;
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
  ::placeholder {
    font-size: 18px;
    padding-left: 10px;
  }
`;
const ErrorMessage = styled.p`
  color: red;
  margin: 0 0px 0px 10px;
`;
const ButtonDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const CancelWarningModal = (props) => {
  const user = useSelector((state) => state.user.currentUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const cancelAppointment = async (data) => {
    setLoading(true);
    const res = await axios.put(
      `/mentor/bookings/update/cancel/appointment/${props.sendMentor.bookingId}`,
      { reasonExp: data.reasonExp, reason: data.reason },
      {
        headers: { authorization: "Bearer " + user?.accessToken },
      }
    );
    if (res.data.success) {
      return (
        setLoading(false),
        setSuccess(res.data.success),
        toast.success(res.data.success, { position: "top-center" }),
        reset()
      );
    }
    if (res.data.error) {
      return (
        setLoading(false),
        setError(res.data.error),
        toast.error(res.data.error, { position: "top-center" })
      );
    }
  };

  return (
    <Backdrop>
      {loading && <LoadingSpinner />}
      <Modal>
        <CloseButtonDiv onClick={props.cancelAppointmentHandler}>
          <CloseButton />
        </CloseButtonDiv>
        <MentorBoxDiv>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          {success && (
            <p style={{ color: "green", textAlign: "center" }}>{success}</p>
          )}
          <MentorSessionName>
            Mentorship session with
            <span>{" " + props.sendMentor.userEmail + " "}</span>
          </MentorSessionName>
          <MentorBookedDate>
            <span>
              <i className="fa-solid fa-calendar"></i>
            </span>
            {new Date(props.sendMentor.bookingDate).toDateString()}
            <span>
              <i className="fa-solid fa-clock"></i>
            </span>
            {" " + props.sendMentor.time + " "}
          </MentorBookedDate>
          <hr />
        </MentorBoxDiv>
        <form onSubmit={handleSubmit(cancelAppointment)}>
          <MentorBoxDiv>
            <LabelTitle>Choose one the Reason:</LabelTitle>
            <FormSelect
              name="reason"
              {...register("reason", {
                required: "Select from the dropdown",
              })}
            >
              <FormOption value=""></FormOption>
              <FormOption value="health issues">Health issues</FormOption>
              <FormOption value="I don't have time for attending the session">
                I don't have time for attending the session
              </FormOption>
              <FormOption value="Reason not listed">
                Reason not listed
              </FormOption>
            </FormSelect>{" "}
            {errors.reason && (
              <ErrorMessage>{errors.reason.message}</ErrorMessage>
            )}
            <LabelTitle>Reason for cancellation :</LabelTitle>
            <TextArea
              name="reasonExp"
              {...register("reasonExp", {
                required: "Clearly explain why you are cancelling",
              })}
              id=""
              cols="30"
              rows="10"
              placeholder="Explain the reason of appointment in detail....."
            ></TextArea>
            {errors.reasonExp && (
              <ErrorMessage>{errors.reasonExp.message}</ErrorMessage>
            )}
          </MentorBoxDiv>
          <ButtonDiv>
            <ConfirmButton type="submit">Confirm Cancel</ConfirmButton>
            <CancelProcess onClick={props.cancelAppointmentHandler}>
              Abort Process
            </CancelProcess>
          </ButtonDiv>
        </form>
      </Modal>
    </Backdrop>
  );
};

export default CancelWarningModal;
