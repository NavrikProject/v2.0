import styled from "styled-components";
import { BiHide, BiShow } from "react-icons/bi";

export const SingleProfileSect = styled.section`
  height: auto;
  background-color: #fff;
  width: 100%;
`;
export const SingleProfileSection = styled.section`
  width: 70%;
  margin: 30px auto;
  padding: 50px 0px;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

export const SingleProfileWrapper = styled.div``;
// page title
export const SingleProfileTitle = styled.h1`
  color: blue;
  font-size: 37px;
  font-weight: 700;
  text-align: center;
`;

export const FormDiv = styled.div`
  padding: 30px;
  text-align: center;
  margin-left: 20px;
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;
export const FormInputDiv = styled.div`
  width: 100%;
`;
export const Form = styled.form``;
export const FormInput = styled.input`
  display: block;
  width: 80%;
  height: 40px;
  margin-bottom: 15px;
  font-size: 19px;
  margin-left: 25px;
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid #111;
  &::placeholder {
    color: #111;
    font-size: 15px;
    opacity: 0.9;
  }
`;
export const FormInputDate = styled.input`
  display: block;
  width: 80%;
  height: 40px;
  margin-bottom: 15px;
  font-size: 19px;
  background: transparent;
  border: none;
  outline: none;
  margin-left: 25px;
  border-bottom: 1px solid #111;
  &::placeholder {
    color: #111;
    opacity: 0.9;
  }
`;
export const PasswordDiv = styled.div`
  height: auto;
  padding-top: 8px;
  padding-left: 20px;
`;
export const FormInputFile = styled.input`
  width: 55%;
  height: 40px;
  font-size: 19px;
  margin-top: 10px;
  border: none;
  outline: none;
  margin-left: 15px;
  &::placeholder {
    color: #111;
    opacity: 0.9;
  }
`;
export const FormBtn = styled.button`
  border: none;
  outline: none;
  padding: 10px 30px;
  margin-top: 20px;
  background-color: blue;
  color: white;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  &:hover {
    opacity: 0.9;
  }
`;
export const FormAddress = styled.textarea`
  display: block;
  width: 80%;
  outline: none;
  height: 70px;
  margin-left: 15px;
  font-size: 15px;
  &::placeholder {
    color: #111;
    opacity: 0.9;
  }
`;
export const FormFlex = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
`;
export const Field = styled.div`
  height: 50px;
  width: 100%;
  margin-bottom: 15px;
`;
export const PwdField = styled.div`
  height: 50px;
  width: 100%;
  margin-top: 20px;
  position: relative;
  margin-bottom: 20px;
`;
export const PwdIcons = styled.div`
  top: 13px;
  right: 110px;
  position: absolute;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
export const ShowIcon = styled(BiShow)`
  font-size: 22px;
  color: #111;
`;

export const HideIcon = styled(BiHide)`
  font-size: 22px;
  color: #111;
`;
export const Input = styled.input`
  height: 100%;
  width: 80%;
  outline: none;
  padding-left: 15px;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  margin-bottom: 15px;
  &:focus {
    border-color: #fc83bb;
  }
`;
export const FormLabel = styled.label`
  font-size: 21px;
  width: 20%;
`;
export const FormSelect = styled.select`
  height: 36px;
  width: 80%;
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  margin: 5px 0px 15px 15px;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  &:focus {
    border-color: #fc83bb;
  }
`;
export const FormOption = styled.option``;
export const MentorFormSlotDiv = styled.div``;
export const MentorSlotTimerInput = styled.input`
  height: 100%;
  width: 50%;
  outline: none;
  padding-left: 15px;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  margin-bottom: 15px;
  &:focus {
    border-color: #fc83bb;
  }
`;
