import styled from "styled-components";
import { BiHide, BiShow } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
export const FormDiv = styled.div`
  padding: 50px;
  margin-left: 20px;
  @media only screen and (max-width: 868px) {
    padding: 30px 20px;
    margin-left: 0px;
  }
  @media only screen and (max-width: 468px) {
    padding: 20px 10px;
    margin-left: 0px;
  }
`;

export const Form = styled.form``;
export const FormInput = styled.input`
  display: block;
  width: 90%;
  height: 40px;
  margin-bottom: 15px;
  margin-top: 10px;
  font-size: 19px;
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid #111;
  &::placeholder {
    color: #111;
    opacity: 0.9;
  }
`;
export const PasswordDiv = styled.div`
  height: auto;
  padding-top: 10px;
  padding-left: 30px;
`;
export const FormInputDate = styled.input`
  display: block;
  width: 60%;
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
export const FormInputFile = styled.input`
  width: 55%;
  height: 40px;
  font-size: 19px;
  margin-top: 10px;
  border: none;
  outline: none;
  margin-left: 25px;
  &::placeholder {
    color: #111;
    opacity: 0.9;
  }
`;
export const ImgInput = styled.input`
  margin: 40px 0 10px 0;
  height: 40px;
  padding: 10px 20px;
`;

export const FormBtn = styled.button`
  border: none;
  outline: none;
  border-radius: 10px;
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
  width: 90%;
  outline: none;
  height: 70px;
  font-size: 15px;
  &::placeholder {
    color: #111;
    opacity: 0.9;
  }
`;
export const FormFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const FormLabel = styled.label`
  font-size: 19px;
`;
export const FormSelect = styled.select`
  height: 36px;
  width: 70%;
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

export const PwdField = styled.div`
  height: 50px;
  width: 100%;
  margin-top: 20px;
  position: relative;
`;
export const PwdIcons = styled.div`
  top: 13px;
  right: 70px;
  position: absolute;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
export const ShowIcon = styled(BiShow)`
  font-size: 22px;
  color: #111;
`;
export const CloseButton = styled(AiOutlineClose)`
  font-size: 25px;
  color: #111;
  cursor: pointer;
  position: absolute;
  top: 14px;
  right: 16px;
`;
export const HideIcon = styled(BiHide)`
  font-size: 22px;
  color: #111;
`;
export const ImageTitleChoose = styled.h1`
  font-weight: 600;
`;
