import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const CloseButton = styled(AiOutlineClose)`
  font-size: 25px;
  color: #111;
  cursor: pointer;
  position: absolute;
  top: 14px;
  right: 16px;
`;

const MentorDateForm = ({ showDateForm, mentor }) => {
  const [date, setDate] = useState();
  const dateFormSubmitHandler = (event) => {
    event.preventDefault();
    console.log(date);
    console.log(mentor);
  };
  return (
    <div>
      <CloseButton onClick={showDateForm} />
      <form action="" onSubmit={dateFormSubmitHandler}>
        <input
          minDate={new Date()}
          type="date"
          onChange={(event) => setDate(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MentorDateForm;
