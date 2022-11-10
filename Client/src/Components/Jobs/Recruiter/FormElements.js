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
export const SingleProfileSection = styled.section`
  width: 80%;
  margin: 0 auto;
`;
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
  margin-right: 10px;
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
export const WarnText = styled.h1`
  color: #fff;
  padding: 7px 10px;
  background-color: rgb(239, 116, 116);
  text-align: center;
  border-radius: 5px;
  font-weight: normal;
`;
export const FormDiv = styled.div`
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
    cursor: not-allowed !important;
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
  font-size: 19px;
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
export const FieldFlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
export const ImgBox = styled.div`
  margin-bottom: 20px;
  justify-content: space-evenly;
`;
export const UserTitle = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-right: 20px;
  text-transform: capitalize;
`;
export const ImgForm = styled.form``;

export const Img = styled.img`
  width: 200px;
  height: 100px;
  @media only screen and (max-width: 868px) {
    width: 130px;
    height: 130px;
  }
`;
export const SocialButton = styled.a`
  margin-top: 20px !important;
  padding: 10px 20px;
  border: none;
  outline: none;
  box-shadow: rgb(0 0 0 / 10%) 0px 5px 24px;
  cursor: pointer;
  border-radius: 5px;
  margin: 15px 15px 0 0;
  font-size: 16px;
  transition: all 0.5s ease-in-out;
  text-decoration: none;
  &:hover {
    border: 1px solid #111;
  }
`;
export const DetailsFlex = styled.div`
  text-transform: capitalize;
  @media only screen and (max-width: 968px) {
    margin-left: 0px;
  }
`;
export const DetailsFlex1 = styled.div`
  display: flex;
  padding: 7px 10px;
`;
export const DetailsTitles = styled.h4`
  font-weight: 600;
  margin-right: 5px;
`;
export const DetailsFromDb = styled.p`
  font-weight: 400;
  margin-left: 5px;
  span {
    color: gold;
  }
`;
