import styled from "styled-components";
export const JobCardSection = styled.div`
  padding: 0px 10px;
`;
export const JobCardDisplayFlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
`;

export const ApplyNowButton = styled.button`
  padding: 7px 10px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  background-color: #1363df;
  color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  &:hover {
    opacity: 0.7;
    transition: all 0.5s ease-in-out;
  }
`;
export const JobTitle = styled.h2`
  font-weight: 500;
  font-size: 21px;
  text-transform: capitalize;
  cursor: pointer;
`;

export const JobCardDescription = styled.p`
  padding: 2px;
  span {
    text-transform: capitalize;
  }
`;
export const TrendingJobsCardDiv = styled.div`
  width: 100%;
  height: auto;
  background-color: #d1dfe3;
  margin: 0px auto;
  padding: 10px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  background-color: #fff;
`;
export const IndividualJobTrendingTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: normal;
`;
export const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
