import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

export const MentorSection = styled.section`
  width: 90%;
  height: auto;
  margin: 0 auto;
`;
export const MentorDiv = styled.div`
  width: 43%;
  margin: 20px;
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
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin: 20px;
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
