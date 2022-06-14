import React from "react";
// import { useSelector } from "react-redux";
import {
  CloseButton,
  Form,
  FormAddress,
  FormBtn,
  FormDiv,
  ImageTitleChoose,
} from "./FormProfileElements";

const Form4 = (props) => {
  // const user = useSelector((state) => state.user.currentUser);
  // const token = user?.accessToken;
  return (
    <>
      <CloseButton onClick={props.personal} />
      <FormDiv>
        <Form>
          <ImageTitleChoose>
            Once you clicked on delete account you will lost all your data and
            courses that you purchased.
          </ImageTitleChoose>
          <FormAddress>Enter your feedback</FormAddress>
          <FormBtn>Delete Account</FormBtn>
        </Form>
      </FormDiv>
    </>
  );
};

export default Form4;
