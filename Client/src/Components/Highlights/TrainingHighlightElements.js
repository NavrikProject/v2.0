import styled from "styled-components";
export const TrainingHighSection = styled.section`
  height: auto;
  width: 100%;
`;
export const TrainingHighDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 50px;
`;
export const TrainingHighWrapper = styled.div`
  padding: 0px 0px;
`;
export const TrainingHighTitle = styled.h1`
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

export const TrainingHighlightDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;
export const TrainingHighlightItems = styled.div`
  width: 100%;
  margin: 20px 0;
  height: auto;
`;
export const TrainerHighlightImg = styled.img`
  width: 100%;
  height: 100%;
`;
export const TrainerHighlightBox = styled.div`
  width: 90%;
  height: 300px;
  margin: 0 auto;
  cursor: pointer;
`;
export const CourseTitleDiv = styled.div``;
export const TrainerHighlightTitle = styled.h1`
  color: #1f4690;
  text-align: center;
  padding: 20px 0;
  font-size: 35px;
`;
