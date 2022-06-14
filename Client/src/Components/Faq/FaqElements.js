import styled from "styled-components";

export const FaqSection = styled.section`
  width: 100%;
  height: auto;
`;
export const FaqDiv = styled.div`
  width: 85%;
  margin: 0 auto;
`;
export const FaqWrapper = styled.div`
  padding: 50px 0;
`;
export const FaqDivFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 0;
`;
export const FaqDiv1 = styled.div``;
export const FaqDiv2 = styled.div``;

export const FaqContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  height: auto;
`;

export const FaqTitle = styled.h1`
  text-align: center;
  padding: 30px 0;
  font-size: 37px;
  font-weight: 700;
  text-align: center;
`;
export const FaqBox = styled.div`
  background-color: lightgray;
  padding: 10px 20px;
  margin-bottom: 5px;
  transition: all 1s cubic-bezier(0.39, 0.575, 0.565, 1);
`;

export const FaqQuestion = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 1s cubic-bezier(0.39, 0.575, 0.565, 1);
`;
export const FaqAnswer = styled.p`
  padding: 15px 20px;
  transition: all 1s cubic-bezier(0.39, 0.575, 0.565, 1);
`;

export const CourseAfterTitle = styled.h1`
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

export const CourseAfterWrapper = styled.div`
  padding: 50px 0px;
`;
export const CourseAfterDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const CourseAfterItems = styled.div`
  width: 100%;
  margin: 20px 0;
  height: auto;
  position: relative;
`;
export const CourseAfterImgTitle = styled.h1`
  color: white;
  text-align: center;
  padding: 20px 0px;
  font-size: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CourseAfterImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const CourseAfterBox = styled.div`
  width: 90%;
  height: 300px;
  margin: 0 auto;
  cursor: pointer;
`;
