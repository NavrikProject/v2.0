import styled from "styled-components";
export const SingleProfileSect = styled.section`
  height: auto;
  background-color: #fff;
  width: 100%;
`;
export const SingleProfileSection = styled.section`
  width: 70%;
  margin: 30px auto;
  padding: 50px 0px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
`;

export const SingleProfileWrapper = styled.div``;
// page title
export const SingleProfileTitle = styled.h1`
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

export const FormDiv = styled.div`
  padding: 30px;
  text-align: center;
  margin-left: 20px;
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
export const SkipBtnDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
export const SkipButton = styled.button`
  border: none;
  outline: none;
  padding: 10px 30px;
  margin-right: 20px;
  background-color: #f33;
  color: white;
  align-items: end;
  cursor: pointer;
  text-align: right;

  transition: all 0.4s ease-in-out;
  &:hover {
    opacity: 0.9;
  }
`;
