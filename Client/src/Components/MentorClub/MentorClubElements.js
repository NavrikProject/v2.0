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
  padding: 50px 0;
`;

export const MentorContainer = styled.div``;
export const MentorTitle = styled.h1`
  text-align: center;
  font-size: 44px;
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
  justify-content: space-around;
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
  padding: 5px 10px;
  border: 1px solid lightgrey;
  margin: 5px 0px 15px 15px;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  &:focus {
    border-color: #fc83bb;
  }
`;
export const MentorOptions = styled.option``;

export const SearchForm = styled.form`
  position: relative;
  display: inline-block;
`;
export const SearchBoxInput = styled.input`
  padding: 6px;
  font-size: 17px;
  border: outline;
  @media only screen and (max-width: 768px) {
    max-width: 700px;
    min-width: 500px;
  }
  @media only screen and (max-width: 568px) {
    max-width: 500px;
    min-width: 300px;
  }
  @media only screen and (max-width: 468px) {
    max-width: 400px;
    min-width: 300px;
  }
`;
export const FaSearchIcon = styled(FaSearch)`
  font-size: 24px;
  color: #111;
  opacity: 0.8;
  top: 12px;
  right: 5px;
  position: absolute;
  cursor: pointer;
`;
