import styled from "styled-components";
import { BiHide, BiShow } from "react-icons/bi";

export const HomeSectionComponent = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /* background-image: url("https://res.cloudinary.com/ddzagipmh/image/upload/v1644037126/17973908_zwmwyf.jpg"); */
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(245, 245, 245, 1) 32%,
    rgba(224, 251, 252, 1) 100%
  );
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  @media only screen and (min-width: 1068px) {
    padding: 0 100px;
  }
  @media only screen and (max-width: 1068px) {
    width: 100%;
  }
  @media only screen and (max-width: 968px) {
    padding: 0 50px;
  }
  @media only screen and (max-width: 768px) {
    padding: 0 20px;
  }
  @media only screen and (max-width: 468px) {
    padding: 0;
  }
`;
export const LoginWrapper = styled.div`
  display: flex; /* establish flex container */
  flex-direction: column; /* make main axis vertical */
  justify-content: center; /* center items vertically, in this case */
  align-items: center;
`;

// left section
export const Wrapper = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
  margin: 100px 0 auto;
  @media only screen and (max-width: 1068px) {
    width: 100%;
  }
  @media only screen and (max-width: 968px) {
    display: block;
  }
`;
export const WrapperRight = styled.div`
  flex: 2;
  @media only screen and (max-width: 868px) {
    display: none;
  }
`;
export const WrapperRightImg = styled.img`
  width: 180px;
  height: 200px;
`;

export const WrapperLeftImg = styled.img``;
export const WrapperLeft = styled.div`
  flex: 2;
  @media only screen and (max-width: 868px) {
    display: none;
  }
`;
export const SuccessDiv = styled.div`
  margin: 0 auto;
  text-align: center;
`;
export const WrapperCenter = styled.div`
  flex: 8;
  width: 100%;
  padding: 30px;
  height: 100%;
  border-radius: 5px;
  /* box-shadow: 0 15px 20px rgba(0, 0, 0, 0.1); */
  overflow: hidden;
  margin: 0 auto;
  @media only screen and (max-width: 968px) {
    flex: 12;
  }
`;

export const Title = styled.div`
  width: 50%;
  font-size: 35px;
  font-weight: 600;
  text-align: center;
`;
export const FormContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const SlideControls = styled.div`
  position: relative;
  display: flex;
  height: 49px;
  width: 99.5%;
  margin: 30px 0 10px 0;
  justify-content: space-between;
  border: 1px solid lightgrey;
  border-radius: 5px;
  overflow: hidden;
`;

export const SlideTab = styled.div`
  position: absolute;
  left: 0;
  border-radius: 5px;
  height: 100%;
  width: 25%;
  z-index: 0;
  background: -webkit-linear-gradient(left, #3e5ce4, #4282fa);
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;
export const SlideDiv1 = styled.div`
  height: 100%;
  width: 25%;
  font-size: 19px;
  font-weight: 500;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
  z-index: 1;
  color: ${({ isActive1 }) => (isActive1 ? "#fff" : "#111")};
  transition: all 0.6s ease;
  background: ${({ isActive1 }) =>
    isActive1 ? "-webkit-linear-gradient(left, #3e5ce4, #4282fa)" : "none"};
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  @media only screen and (max-width: 768px) {
    font-size: 17px;
  }
  @media only screen and (max-width: 468px) {
    font-size: 15px;
  }
`;

export const SlideDiv2 = styled.div`
  height: 100%;
  width: 25%;
  font-size: 19px;
  font-weight: 500;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
  z-index: 1;
  color: ${({ isActive2 }) => (isActive2 ? "#fff" : "#111")};
  transition: all 0.6s ease;
  background: ${({ isActive2 }) =>
    isActive2 ? "-webkit-linear-gradient(left, #3e5ce4, #4282fa)" : "none"};
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  @media only screen and (max-width: 768px) {
    font-size: 17px;
  }
  @media only screen and (max-width: 468px) {
    font-size: 15px;
  }
`;
export const SlideDiv3 = styled.div`
  height: 100%;
  width: 25%;
  font-size: 19px;
  font-weight: 500;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
  z-index: 1;
  color: ${({ isActive3 }) => (isActive3 ? "#fff" : "#111")};
  transition: all 0.6s ease;
  background: ${({ isActive3 }) =>
    isActive3 ? "-webkit-linear-gradient(left, #3e5ce4, #4282fa)" : "none"};
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  @media only screen and (max-width: 768px) {
    font-size: 17px;
  }
  @media only screen and (max-width: 468px) {
    font-size: 15px;
  }
`;
export const SlideDiv4 = styled.div`
  height: 100%;
  width: 25%;
  font-size: 19px;
  font-weight: 500;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
  z-index: 1;
  //color: #111;
  transition: all 0.6s ease;
  color: ${({ isActive4 }) => (isActive4 ? "#fff" : "#111")};
  background: ${({ isActive4 }) =>
    isActive4 ? "-webkit-linear-gradient(left, #3e5ce4, #4282fa)" : "none"};
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  @media only screen and (max-width: 768px) {
    font-size: 17px;
  }
  @media only screen and (max-width: 468px) {
    font-size: 15px;
  }
`;
export const FormInner = styled.div`
  display: flex;
  width: 100%;
`;

export const Form = styled.form`
  width: 100%;
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
export const PwdIcons = styled.div`
  top: 13px;
  right: 15px;
  position: absolute;
  width: 20px;
  height: 20px;
  cursor: pointer;
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
export const PassLink = styled.div`
  margin-top: 5px;
`;
export const PassLinkA = styled.p`
  text-decoration: none;
  color: #fa4299;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
export const SignUpLink = styled.div`
  text-align: center;
  margin-top: 30px;
`;
export const SignLinkB = styled.p`
  text-decoration: none;
  color: #fa4299;
  &:hover {
    text-decoration: underline;
  }
`;

export const ShowIcon = styled(BiShow)`
  font-size: 22px;
  color: #111;
`;

export const HideIcon = styled(BiHide)`
  font-size: 22px;
  color: #111;
`;
