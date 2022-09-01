import styled from "styled-components";

export const MentorBoxDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const MentorDetailsDiv = styled.div``;
export const MentorDetailsImgDiv = styled.div``;
export const MentorName = styled.h3`
  text-transform: capitalize;
  text-align: center;
  padding-top: 10px;
  font-size: 24px;
  color: rgb(19, 25, 70);
`;
export const MentorImg = styled.img`
  width: 50%;
  height: 50%;
  object-fit: cover;
  margin: 0 auto;
`;

export const MentorDesc = styled.p`
  padding: 10px;
  font-size: 19px;
  color: #627792;
  overflow: hidden;
`;
export const MentorDescP = styled.p`
  padding: 10px;
  font-size: 19px;
  text-align: center;
  span {
    color: #66bfbf;
  }
`;
export const BookNowButtonDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
`;
export const BookNowButton = styled.button`
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
