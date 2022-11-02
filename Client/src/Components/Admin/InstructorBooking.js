import axios from "axios";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

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
  width: 70%;
  margin: 0 auto;
`;
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10000000;
  background-color: rgba(0, 0, 0, 0.75);
`;
const Modal = styled.div`
  position: fixed;
  top: 20vh;
  left: 5%;
  width: 90%;
  height: auto;
  max-height: 500px;
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
const Field = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  &:focus {
    border-color: #fc83bb;
  }
`;
const ModifyButton = styled.button`
  width: 100%;
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  color: #fff;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  font-size: 20px;
  font-weight: 500;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background: -webkit-linear-gradient(left, #3e5ce4, #4282fa);
  &:disabled {
    cursor: not-allowed;
  }
`;
const InstructorBooking = (props) => {
  const user = useSelector((state) => state.user.currentUser);
  const [bookingInsDate, setBookingInsDate] = useState();
  const [bookingInsTime, setBookingInsTime] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const instructorBookingHandler = async () => {
    let minutes = bookingInsTime?.split(":")[1];
    if (minutes === "00") {
      try {
        setLoading(true);
        const res = await axios.post(`/admin/post/instructor-class`, {
          date: bookingInsDate,
          startTime: bookingInsTime,
          traineeDtlsId: props.traineeCourse.trainee_course_dtls_id,
          userEmail: user?.email,
        });
        if (res.data.success) {
          return (
            setLoading(false),
            toast.success(res.data.success, { position: "top-center" }),
            setSuccess(res.data.success)
          );
        } else {
          return (
            setLoading(false),
            toast.error(res.data.error, { position: "top-center" }),
            setError(res.data.error)
          );
        }
      } catch (error) {
        return (
          setLoading(false),
          toast.error("There was an error while scheduling", {
            position: "top-center",
          }),
          setError(error)
        );
      }
    } else {
      return (
        setLoading(false),
        toast.error("Please select the minutes handler with 0 minutes only", {
          position: "top-center",
        }),
        setError("Please select the minutes handler with 0 minutes only")
      );
    }
  };
  return (
    <Backdrop>
      <Modal>
        <div>
          <CloseButtonDiv onClick={props.showBookingInstructorHandler}>
            <CloseButton />
          </CloseButtonDiv>
          {error && <p style={{ color: "red", fontSize: "20px" }}>{error}</p>}
          {success && (
            <p style={{ color: "green", fontSize: "20px" }}>{success}</p>
          )}
          {loading && <p>Please wait... loading...</p>}
          <FormDiv>
            <h2>Instructor Live Class Booking </h2>
            <br />
            <Field>
              Choose the Date
              <Input
                value={bookingInsDate}
                required
                type="date"
                onChange={(event) => {
                  setBookingInsDate(event.target.value);
                }}
              />
            </Field>
            <Field>
              Choose the time
              <Input
                value={bookingInsTime}
                required
                type="time"
                onChange={(event) => {
                  setBookingInsTime(event.target.value);
                }}
              />
            </Field>
            <br />
            <ModifyButton type="submit" onClick={instructorBookingHandler}>
              Book session
            </ModifyButton>
          </FormDiv>
        </div>
      </Modal>
    </Backdrop>
  );
};

export default InstructorBooking;
