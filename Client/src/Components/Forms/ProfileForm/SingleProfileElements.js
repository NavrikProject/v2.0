import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
export const SingleProfileSect = styled.section`
  height: auto;
  background-color: #fff;
  width: 100%;
`;
export const ErrorMessage = styled.p`
  color: red;
  margin: 0 0 10px 10px;
`;
export const SingleProfileSection = styled.section``;
export const CloseButton = styled(AiOutlineClose)`
  font-size: 25px;
  color: #111;
  cursor: pointer;
`;
export const CloseButtonDiv = styled.div`
  height: 30px;
  width: 30px;
  position: absolute;
  top: 14px;
  right: 16px;
  cursor: pointer;
`;
export const SingleProfileWrapper = styled.div``;
// page title
export const SingleProfileTitle = styled.h1`
  color: blue;
  font-size: 37px;
  font-weight: 700;
  text-align: center;
`;

export const Field = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;
export const Input = styled.input`
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  width: 100%;
  padding: 10px 20px;
  &:focus {
    border-color: #fc83bb;
  }
`;

export const FormDiv = styled.div`
  padding: 30px;
  margin-left: 20px;
`;
export const FormInputDiv = styled.div`
  width: 100%;
`;
export const Form = styled.form``;

export const FormBtn = styled.button`
  margin: 0 auto;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  background-color: #1363df;
  color: #fff;
  border-radius: 5px;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
export const TextArea = styled.textarea`
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  width: 100%;
  padding: 10px 20px;
  &:focus {
    border-color: #fc83bb;
  }
`;
export const FormFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const FormLabel = styled.label`
  font-size: 21px;
`;
export const FormSelect = styled.select`
  width: 100%;
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  padding: 10px 10px;
  &:focus {
    border-color: #fc83bb;
  }
`;
export const FormOption = styled.option``;
