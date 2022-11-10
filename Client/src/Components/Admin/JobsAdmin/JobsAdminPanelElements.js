import styled from "styled-components";

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
export const Section = styled.section`
  width: 100%;
  height: 100vh;
`;
export const Div = styled.div`
  display: flex;
`;
export const RightDiv = styled.div`
  flex: 2;
  position: sticky;
  top: 120px;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(245, 245, 245, 1) 32%,
    rgba(224, 251, 252, 1) 100%
  );
`;
export const LeftDiv = styled.div`
  flex: 9.5;
  overflow: scroll;
  height: 100vh;
`;
export const SidebarListUl = styled.ul`
  list-style: none;
`;
export const SidebarListItem = styled.li`
  width: 100%;
  cursor: pointer;
  border-bottom: 1px solid lightgrey;
  :nth-child(5) {
    border-bottom: none;
  }
`;
export const Wrapper = styled.div`
  padding: 20px;
`;
export const DetailsWrapper = styled.div`
  width: auto;
  /* margin: 10px;
  //box-shadow: rgb(142 151 158 / 15%) 0px 4px 19px;
  padding: 20px; */
`;
export const QuickMenuTitle = styled.h3`
  font-size: 21px;
  color: black;
  opacity: 0.9;
  font-weight: 400;
  margin: 3px 0;
  span {
    margin-right: 10px;
  }
`;

export const Button = styled.button`
  margin: 0 auto;
  width: 50%;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: lightgreen;
    transition: all 0.5s ease-in-out;
  }
`;
export const FormSelect = styled.select`
  width: 50%;
  font-size: 18px;
  border-radius: 5px;
  padding-bottom: 10px;
  &:focus {
    border-color: #fc83bb;
  }
`;
export const ErrorMessage = styled.p`
  color: red;
  margin: 0 0 10px 10px;
`;
export const FormOption = styled.option``;
export const LabelTitle = styled.label`
  font-size: 18px;
  padding: 7px 0;
`;
export const Field = styled.div`
  width: 80%;
  margin-bottom: 8px;
`;
export const Input = styled.input`
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  width: 50%;
  padding: 10px 20px;
  &:focus {
    border-color: #fc83bb;
  }
`;
export const ModifyButton = styled.button`
  margin: 0 auto;
  padding: 12px 20px;
  text-align: center;
  font-size: 13px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  border-radius: 5px;
  background-color: lightblue;
  &:hover {
    transition: all 0.5s ease-in-out;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #ff8787;
    color: white;
  }
`;
