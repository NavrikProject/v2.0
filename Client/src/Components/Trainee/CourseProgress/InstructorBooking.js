import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { ModifyButton } from "../ButtonElements.js";
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
const InstructorBooking = (props) => {
  const [bookingInsDate, setBookingInsDate] = useState();
  const instructorBookingHandler = () => {
    console.log(bookingInsDate);
  };
  return (
    <div>
      <CloseButtonDiv onClick={props.showInstructorBooking}>
        <CloseButton />
      </CloseButtonDiv>
      <FormDiv>
        InstructorBooking <br />
        <input
          required
          type="datetime-local"
          onChange={(event) => {
            setBookingInsDate(event.target.value);
          }}
          step={6000}
        />
        <br />

        <ModifyButton onClick={instructorBookingHandler}>
          Book session
        </ModifyButton>
      </FormDiv>
    </div>
  );
};

export default InstructorBooking;
