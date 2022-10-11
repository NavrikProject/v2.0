import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
export const MentorSect = styled.section`
  background-color: #f2f2f2;
  width: 100%;
`;
export const MentorSection = styled.section`
  width: 90%;
  height: auto;
  margin: 0 auto;
  background-image: url("https://navrik.blob.core.windows.net/navrikimage/abstract-background-with-squares_23-2148995948.jpg");
`;
export const MentorDiv = styled.div`
  width: 27%;
  margin: 20px;
  margin-bottom: 40px;
`;
export const MentorUpDiv = styled.div`
  width: 100%;
  height: 50px;
  background-color: #f2f2f2;
`;
export const MentorDownDiv = styled.div`
  width: 100%;
  //background-color: #d1dfe3;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #fff;
  /* // background-color: #eeeeee; */
  /* background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.5) 100%,
    rgba(255, 255, 255, 0) 40%
  ); */
`;
export const MentorNotFoundDiv = styled.div`
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #fff;
`;
export const MentorImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const MentorImg = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin: -100px auto 0 auto;
  object-fit: cover;
  border: 7px solid light;
`;
export const MentorWrapper = styled.div`
  padding: 20px 0;
`;

export const MentorContainer = styled.div``;
export const MentorTitle = styled.h1`
  text-align: center;
  font-size: 32px;
  color: #111;
  opacity: 0.8;
`;
export const MentorDescription = styled.h4`
  text-align: center;
  padding: 20px 10px;
`;
export const MentorBoxTitles = styled.h1`
  text-align: center;
  font-size: 27px;
  padding: 0px 10px;
`;
export const MentorDivFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const MentorCourseBox = styled.div`
  cursor: pointer;
  width: 100%;
  border-radius: 15px;
`;
export const MentorCourseDivFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MentorSearchDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const MentorSearchRightDiv = styled.div``;
export const MentorSearchLeftDiv = styled.div``;
export const MentorLabel = styled.label`
  padding-right: 10px;
`;
export const MentorSelect = styled.select`
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  padding: 8px 10px;
  border: 1px solid lightgrey;
  margin: 5px 0px 15px 15px;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  &:focus {
    border-color: #fc83bb;
  }
`;
export const MentorOptions = styled.option`
  text-transform: capitalize;
`;

export const SearchForm = styled.form`
  position: relative;
  display: inline-block;
`;
export const SearchBoxInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  margin-bottom: 10px !important;
  &:focus {
    border-color: #fc83bb;
  }
`;
export const FaSearchIcon = styled(FaSearch)`
  font-size: 24px;
  color: #111;
  opacity: 0.8;
  top: 9px;
  right: 5px;
  position: absolute;
  cursor: pointer;
`;

export const ClearFilter = styled.p`
  margin: 20px 0 0 20px;
  span {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: blue;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  i {
    padding: 5px;
  }
`;
export const MentorJoinDiv = styled.div`
  width: 70%;
  margin: 20px auto;
`;
export const MentorJoinDivFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
export const MentorJoinRightDiv = styled.div`
  width: 100%;
`;
export const MentorRightContentDiv = styled.div``;
export const MentorJoinDesc = styled.p`
  font-size: 18px;
  color: #627792;
`;
export const MentorJoinLeftDiv = styled.div`
  width: 100%;
`;
export const MentorLeftImgDiv = styled.div`
  img {
    object-fit: cover;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    margin: 0 100px !important;
  }
`;
export const BookNowButtonDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
`;
export const JoinAsMentorButton = styled.button`
  margin: 0px auto;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  background-color: #1363df;
  color: #fff !important;
  border-radius: 5px;
  &:hover {
    opacity: 0.7;
    transition: all 0.5s ease-in-out;
  }
`;
