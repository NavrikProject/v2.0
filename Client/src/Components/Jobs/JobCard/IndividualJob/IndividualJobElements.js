import styled from "styled-components";
export const IndividualJobSection = styled.section`
  width: 100%;
  height: auto;
`;
export const IndividualJobWrapper = styled.div`
  margin: 0 10px 0 100px;
`;
export const IndividualJobDisplayFlex = styled.div`
  display: flex;
`;
export const IndividualJobDivRight = styled.div`
  flex: 7.5;
`;
export const IndividualJobDivLeft = styled.div`
  flex: 4.5;
`;
export const IndividualJobDiv = styled.div`
  padding: 30px;
`;
export const IndividualJobDescriptionDiv = styled.div``;
export const IndividualJobDescTitle = styled.h2``;
export const IndividualJobDesc = styled.div`
  padding: 10px 40px;
`;
export const IndividualJobUl = styled.ul``;
export const IndividualJobList = styled.li``;
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
  color: #111;
  border-radius: 5px;
  margin-right: 20px;
  &:hover {
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
export const JobCardSection = styled.div`
  margin: 20px 0px;
`;
