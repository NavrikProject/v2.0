import styled from "styled-components";
export const JobCardSection = styled.div`
  margin: 20px;
`;
export const JobCardDiv = styled.div`
  width: 70%;
  background-color: #d1dfe3;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #fff;
`;

export const JobCardDisplayFlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
`;
export const ViewJobButton = styled.button`
  margin: 0 auto;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
  margin-right: 20px;
  &:hover {
    opacity: 0.7;
    transition: all 0.5s ease-in-out;
  }
`;
export const ApplyNowButton = styled.button`
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
export const JobTitle = styled.h2`
  font-weight: 600;
  font-size: 32px;
  text-transform: capitalize;
  cursor: pointer;
`;

export const JobCardDescription = styled.p`
  padding: 5px;
  span {
    text-transform: capitalize;
  }
`;
