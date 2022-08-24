import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
export const ContributionFormDiv = styled.div`
  position: relative;
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
export const FormDiv = styled.div`
  padding: 30px 40px;
`;
export const ContributionInput = styled.input`
  width: 100%;
  outline: none;
  padding: 10px 0;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  &:focus {
    border-color: #fc83bb;
  }
`;
export const ContributionSelection = styled.select`
  width: 100%;
  font-size: 18px;
  border-radius: 5px;
  padding: 10px;
  &:focus {
    border-color: #fc83bb;
  }
`;
export const ContributionOptions = styled.option``;
export const ContributionTextArea = styled.textarea`
  width: 100%;
  padding-bottom: 10px;
  font-size: 16px;
  ::placeholder {
    font-size: 18px;
    padding-left: 10px;
  }
`;
export const Field = styled.div`
  width: 100%;
  margin-bottom: 15px;
  text-align: center;
  h1 {
    font-size: 40px;
    font-weight:500
  }
`;
export const FormLabel = styled.label`
  font-size: 17px;
`;

export const ContributionButtonDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
`;
export const ContributionSubmitButton = styled.button`
  margin: 0 auto;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  background-color: #1363df;
  color: #fff;
  border-radius: 5px;
  &:hover {
    opacity: 0.7;
    transition: all 0.5s ease-in-out;
  }
`;
