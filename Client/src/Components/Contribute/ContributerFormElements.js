import { BiHide, BiShow } from "react-icons/bi";
import styled from "styled-components";

export const ContributerRegisterSection = styled.section`
  width: 100%;
  height: 90vh;

  /* background-image: url("https://designstripe-secure.imgix.net/scene-snapshots/ea79f5ef-e39a-4b39-ade8-8398dbd41cb4/1638290538671/gif?auto=compress&gif-q=60&fit=clip&h=400&s=d7894707514d74ce09e850026949fa6b?bust=1658396478117");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  background-image: linear-gradient(
    90deg,
    rgba(255, 244, 228, 1) 7.1%,
    rgba(240, 246, 238, 1) 67.4%
  );
`;
export const ContributerRegisterDiv = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const ContributerRegisterDiv1 = styled.div``;

export const ContributerRegisterFlex = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const ContributerRegisterLeftDiv = styled.div`
  width: 100%;
  height: 100%;
`;

export const FormDiv = styled.div`
  padding-top: 40px;
`;
export const FormHeading = styled.h1`
  text-align: start;
  padding-bottom: 10px;
  text-transform: capitalize;
  font-size: 35px;
  color: #111;
  opacity: 0.8;
`;
export const FormDivFlex = styled.div``;
export const Form = styled.form``;
export const ContributerRegisterRightDiv = styled.div`
  width: 100%;
  height: 100%;
  img {
    margin: 50px;
    width: 100%;
    height: 100%;
  }
`;

export const Field = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;
export const ErrorMessage = styled.p`
  color: red;
  margin: 0 0 10px 10px;
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
export const PwdField = styled.div`
  width: 100%;
  margin-top: 20px;
  position: relative;
`;
export const PwdIcons = styled.div`
  top: 13px;
  right: 13px;
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

export const TextArea = styled.textarea`
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  margin-bottom: 10px;
  width: 100%;
  padding: 10px 20px;
  &:focus {
    border-color: #fc83bb;
  }
`;
export const ButtonDiv = styled.div`
  padding-top: 10px;
`;
export const PrevButton = styled.button`
  margin: 0 auto;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  cursor: pointer;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  background-color: #136;
  color: #fff;
  border-radius: 5px;
  margin-right: 20px;
  &:hover {
    opacity: 0.9;
  }
  :disabled {
    cursor: not-allowed;
  }
`;
export const NextButton = styled.button`
  margin: 0 auto;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  background-color: #3df;
  color: #fff;
  border-radius: 5px;
  &:hover {
    opacity: 0.9;
  }
`;
export const JoinButton = styled.button`
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
