import { BiHide, BiShow } from "react-icons/bi";
import styled from "styled-components";
export const RegisterFormSect = styled.section`
  height: auto;
  background-color: #fff;
  width: 100%;
  /* background-image: url("https://res.cloudinary.com/ddzagipmh/image/upload/v1644037126/17973908_zwmwyf.jpg"); */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
export const RegisterFormSection = styled.section`
  width: 90%;
  margin: 0 auto;
  padding: 30px 0px;
`;
export const RegisterFormWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const RegisterFormLeft = styled.div`
  flex: 6;
`;
export const RegisterFormRight = styled.div`
  flex: 6;
`;
// page title
export const RegisterFormTitle = styled.h1`
  color: blue;
  font-size: 37px;
  font-weight: 700;
  text-align: center;
`;
export const LineAfter = styled.div`
  &::before {
    content: "";
    width: 180px;
    height: 4px;
    display: block;
    margin: 0 auto;
    background-color: #9926f0;
  }
  &::after {
    content: "";
    width: 50px;
    height: 4px;
    padding-top: 0.1rem;
    margin: 0 auto;
    display: block;
    background-color: #9926f0;
  }
`;
export const FormInner = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  width: 500px;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;
export const Field = styled.div`
  height: 50px;
  width: 100%;
  margin-top: 25px;
`;
export const PwdField = styled.div`
  height: 50px;
  width: 100%;
  margin-top: 20px;
  position: relative;
`;
export const PwdIcons = styled.div`
  top: 13px;
  right: 15px;
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

export const Field1 = styled.div`
  height: auto;
  width: 100%;
`;
export const PasswordDiv = styled.div`
  height: auto;
  padding-top: 8px;
  padding-left: 20px;
`;
export const Input = styled.input`
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 15px;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  &:focus {
    border-color: #fc83bb;
  }
`;
export const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
export const InputRadio = styled.input`
  width: 20px;
  height: 20px;
  &:focus {
    border-color: #fc83bb;
  }
`;

export const InputButton = styled.button`
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 15px;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  color: #fff;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  font-size: 20px;
  font-weight: 500;
  padding-left: 0;
  border: none;
  cursor: pointer;
  background: -webkit-linear-gradient(left, #3e5ce4, #4282fa);
`;
export const InputRadLabel = styled.label`
  font-size: 16px;
  margin-left: 7px;
`;
export const PassLink = styled.div`
  margin-top: 5px;
`;
export const PassLinkA = styled.a`
  text-decoration: none;
  color: #fa4299;
  &:hover {
    text-decoration: underline;
  }
`;
export const SignUpLink = styled.div`
  text-align: center;
  margin-top: 30px;
`;
export const SignLinkB = styled.a`
  text-decoration: none;
  color: #fa4299;
  &:hover {
    text-decoration: underline;
  }
`;
export const FormLabel = styled.label`
  font-size: 20px;
  margin: 10px;
`;
export const FormLabelDiv = styled.div`
  display: flex;
  align-items: center;
`;
export const FormSelect = styled.select`
  height: 30px;
  width: 250px;
  margin-left: 10px;
  font-size: 18px;
  border-radius: 5px;
  &:focus {
    border-color: #fc83bb;
  }
`;
export const FormOption = styled.option``;
export const FormInput = styled.input`
  width: 18px;
  height: 18px;
  padding: 5px;
  margin-right: 10px;
`;
