import styled from "styled-components";
export const RefundedDoneButton = styled.button`
  outline: none;
  cursor: not-allowed;
  padding: 10px 24px;
  color: white;
  border: none;
  font-size: 14px;
  background-color: rgb(212, 87, 87);
  transition: all 0.4s ease-in-out;
  border-radius: 7px;
`;
export const JoinButton = styled.button`
  outline: none;
  cursor: pointer;
  padding: 10px 33px;
  background-color: rgb(55, 164, 236);
  color: white;
  transition: all 0.4s ease-in-out;
  border: none;
  border-radius: 7px;
  font-size: 14px;
  :disabled {
    cursor: not-allowed !important;
  }
  a {
    color: black;
    text-decoration: none;
    :disabled {
      cursor: not-allowed;
    }
  }
`;
export const ModifyButton = styled.button`
  outline: none;
  cursor: pointer;
  padding: 10px 33px;
  background-color: blue;
  color: white;
  transition: all 0.4s ease-in-out;
  border: none;
  border-radius: 7px;
  font-size: 14px;
`;
export const UnModifiedButton = styled.button`
  outline: none;
  cursor: pointer;
  padding: 10px 24px;
  background-color: rgb(238, 10, 10);
  color: white;
  transition: all 0.4s ease-in-out;
  border: none;
  border-radius: 7px;
  font-size: 14px;
`;
