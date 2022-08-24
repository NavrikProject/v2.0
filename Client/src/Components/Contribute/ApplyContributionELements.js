import styled from "styled-components";
export const RegisterFormSect = styled.section`
  height: auto;
  background-color: #fff;
  width: 100%;
`;
export const RegisterFormSection = styled.section`
  width: 90%;
  margin: 0 auto;
  padding: 30px 0px;
  @media only screen and (max-width: 768px) {
    margin: 0;
  }
`;
export const RegisterFormWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const Form = styled.form`
  width: 600px;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;
export const Field = styled.div`
  height: auto;
  width: 100%;
  margin: 20px;
`;
export const NextButton = styled.button`
  height: 40px;
  width: 100%;
  outline: none;
  margin-top: 10px;
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
export const FormLabel = styled.label`
  font-size: 20px;
  margin: 10px auto;
  width: 100%;
  display: block;
`;
export const ErrorMessage = styled.p`
  color: red;
  margin: 0 0 10px 10px;
`;
export const FormSelect = styled.select`
  height: 40px;
  width: 100%;

  font-size: 18px;
  border-radius: 5px;
  &:focus {
    border-color: #fc83bb;
  }
`;
export const FormOption = styled.option``;
export const Input = styled.input`
  height: 40px;
  width: 100%;
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  padding: 5px;

  &:focus {
    border-color: #fc83bb;
  }
`;
export const FormTextArea = styled.textarea`
  height: 60px;
  width: 100%;
  font-size: 19px;
`;
