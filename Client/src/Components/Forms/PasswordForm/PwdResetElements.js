import styled from "styled-components";
import { BiHide, BiShow } from "react-icons/bi";

export const PwdSectionSection = styled.section`
  height: 100vh;
  width: 100%;
`;
export const PwdSectionDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 50px 0px;
`;
export const PwdSectionWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    width: 90%;
  }
`;
export const Form = styled.form`
  width: 100%;
  padding: 100px 0px;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;
export const Field = styled.div`
  height: 50px;
  width: 100%;
  margin-top: 20px;
`;
export const PwdField = styled.div`
  height: 50px;
  width: 100%;
  margin-top: 20px;
  position: relative;
`;
export const PassLink = styled.div`
  margin-top: 5px;
`;
export const PassLinkA = styled.a`
  text-decoration: none;
  color: #fa4299;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
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
  &:disabled {
    cursor: not-allowed;
  }
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
export const PasswordDiv = styled.div`
  height: auto;
  padding-top: 8px;
  padding-left: 20px;
`;
