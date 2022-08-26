import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import logo from "../../../images/practiwiz-logo.png";
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
  top: 15vh;
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
const ConfirmBookingTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  margin-bottom: 0.5rem;
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
  margin: 0 auto;
  width: 100%;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: lightgreen;
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
const ErrorMessage = styled.p`
  color: red;
  margin: 0 0 10px 10px;
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
    font-size: 16px;
  }
`;
const ConfirmModel = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const user = useSelector((state) => state.user.currentUser);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const bookMentorHandler = async (data) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await axios.post(
          `/mentor/create/appointment/create-order`,
          {
            mentorId: props.sendMentor.mentor_dtls_id,
            date: new Date(props.date).toLocaleDateString(),
          }
        );
        if (result.data.error) {
          return (
            toast.error(result.data.error, {
              position: "top-center",
            }),
            setLoading(false)
          );
        }
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get("/get-razorpay-key");
        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: "Navrik Software Solutions",
          description: "Paying for the mentor",
          image: logo,
          order_id: order_id,
          handler: async function (response) {
            const res = await axios.post(
              "/mentor/create/appointment/pay-order",
              {
                amount: amount,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                mentorId: props.sendMentor.mentor_dtls_id,
                mentorName:
                  props.sendMentor.mentor_firstname +
                  " " +
                  props.sendMentor.mentor_lastname,
                date: new Date(props.date).toLocaleDateString(),
                userEmail: user?.email,
                mentorEmail: props.sendMentor.mentor_email,
                from: props.sendMentor.mentor_availability_start_time,
                to: props.sendMentor.mentor_availability_end_time,
                data: data,
              }
            );
            if (res.data.success) {
              setSuccess(res.data.success);
              toast.success(res.data.success, {
                position: "top-center",
              });
              setLoading(false);
              reset();
            }
            if (res.data.error) {
              setError(res.data.error);
              toast.error(res.data.error, {
                position: "top-center",
              });
              setLoading(false);
            }
          },
          prefill: {
            name: "example name",
            email: "email@example.com",
            contact: "111111",
          },
          theme: {
            color: "#80c0f0",
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  };

  return (
    <Backdrop>
      {loading && <LoadingSpinner />}
      <Modal>
        <CloseButtonDiv onClick={props.showModalHandler}>
          <CloseButton />
        </CloseButtonDiv>
        <MentorBoxDiv>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          {success && (
            <p style={{ color: "green", textAlign: "center" }}>{success}</p>
          )}
          <ConfirmBookingTitle>Confirm your booking!</ConfirmBookingTitle>
          <MentorSessionName>
            Mentorship session with
            <span>
              {" " +
                props.sendMentor.mentor_firstname +
                " " +
                props.sendMentor.mentor_lastname}
            </span>
          </MentorSessionName>
          <MentorBookedDate>
            <span>
              <i className="fa-solid fa-calendar"></i>
            </span>
            {new Date(props.date).toDateString()}
            <span>
              <i className="fa-solid fa-clock"></i>
            </span>
            {" " +
              props.sendMentor.mentor_availability_start_time +
              " - " +
              props.sendMentor.mentor_availability_end_time}
          </MentorBookedDate>
          <hr />
        </MentorBoxDiv>
        <form onSubmit={handleSubmit(bookMentorHandler)}>
          <MentorBoxDiv>
            <LabelTitle>Choose one of the following :</LabelTitle>
            <FormSelect
              {...register("selected", {
                required: "Choose from the dropdown",
              })}
              name="selected"
            >
              <FormOption value=""></FormOption>
              <FormOption value="Need help n building apps">
                Need help in building apps
              </FormOption>
              <FormOption value="Struggling in IT">Struggling in IT</FormOption>
              <FormOption value="Building the career in IT">
                Building the career in IT
              </FormOption>
            </FormSelect>
            {errors.selected && (
              <ErrorMessage>{errors.selected.message}</ErrorMessage>
            )}
            <LabelTitle>Choose one of the following :</LabelTitle>
            <TextArea
              {...register("questions", {
                required: "Write all your queries",
              })}
              name="questions"
              placeholder="Ask your question....."
            ></TextArea>
            {errors.questions && (
              <ErrorMessage>{errors.questions.message}</ErrorMessage>
            )}
          </MentorBoxDiv>
          <MentorBoxDiv>
            <ConfirmButton type="submit">Confirm Booking</ConfirmButton>
          </MentorBoxDiv>
        </form>
      </Modal>
    </Backdrop>
  );
};

export default ConfirmModel;
