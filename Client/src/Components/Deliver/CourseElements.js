import styled from "styled-components";
export const CourseSection = styled.section`
  height: auto;
  width: 100%;
`;
export const CourseDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 50px;
`;
export const CourseWrapper = styled.div`
  padding: 50px 0px;
`;
export const CourseTitle = styled.h1`
  color: blue;
  font-size: 37px;
  font-weight: 700;
  text-align: center;
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

export const CourseImgDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;
export const CourseImgDivItems = styled.div`
  width: 100%;
  margin: 20px 0;
  height: auto;
`;
export const CourseImg = styled.img`
  width: 100%;
`;
export const CourseImgBox = styled.div`
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  width: 90%;
  height: 100%;
  margin: 0 auto;
  cursor: pointer;
  &:hover {
    display: block;
  }
`;
export const CourseTitleDiv = styled.div`
  background-color: blue;
  opacity: 0.7;
  display: flex;
  align-items: center;
  padding: 20px 10px;
  justify-content: space-around;
`;
export const CourseStyleTitle = styled.h1`
  color: white;
  &:hover {
  }
`;
export const CourseIconDiv = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
