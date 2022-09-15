import styled from "styled-components";
export const MentorIndSection = styled.section``;
export const MentorCoverDiv = styled.div`
  width: 100%;
  height: 150px;
  background: rgb(251, 205, 198);
  background: linear-gradient(
    90deg,
    rgba(251, 205, 198, 1) 0%,
    rgba(94, 132, 242, 1) 53%,
    rgba(0, 78, 255, 1) 100%
  );
  z-index: -122;
`;

export const MentorDetailsDiv = styled.div`
  width: 75%;
  margin: 0 auto;
`;
export const MentorSectionDiv = styled.div``;
export const MentorDetailsDivFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MentorDetailsName = styled.div``;
export const MentorName = styled.h1`
  text-transform: capitalize;
  font-size: 32px;
  color: #111;
  opacity: 0.8;
`;
export const MentorDesignation = styled.h4`
  text-transform: capitalize;
  font-size: 19px;
  color: #111;
  opacity: 0.6;
  display: inline-block;
`;
export const MentorMsgButton = styled.button`
  padding: 10px 20px;
  border: none;
  outline: none;
  box-shadow: rgb(0 0 0 / 10%) 0px 5px 24px;
  cursor: pointer;
  border-radius: 5px;
  margin: 15px 15px 0 0;
  font-size: 16px;
  transition: all 0.5s ease-in-out;
  &:hover {
    border: 1px solid #111;
  }
`;
export const MentorDetailsImgDiv = styled.div``;
export const MentorBioDesc = styled.p`
  font-size: 16px;
  line-height: 1.6rem;
  color: #111;
  width: 100%;
  overflow: hidden;
  overflow-wrap: break-word;
`;
export const MentorLanguagesDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 0 0 0;
`;
export const MentorLanguages = styled.h3`
  span {
    color: rgb(48, 209, 88);
  }
`;
export const MentorProfileImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: -80px;
  border: 5px solid #fff;
`;

export const MentorProfileDiv = styled.div``;
export const MentorProfileDivFlex = styled.div`
  display: flex; ;
`;
export const MentorProfileDivLeft = styled.div`
  width: 60%;
  padding: 30px 80px 20px 0;
`;
export const MentorProfileDivRight = styled.div`
  width: 40%;
  padding: 20px 0;
`;

export const MentorProfileAvailDiv = styled.div`
  padding: 20px;
  box-shadow: rgb(142 151 158 / 15%) 0px 4px 19px;
  p {
    margin-top: 10px;
  }
`;
export const MentorProfileDateDiv = styled.div`
  margin: 15px 0;
  font-size: 16px;
`;

export const MentorTimeSlotDiv = styled.div`
  padding: 1rem 0px;
  font-weight: 700;
  text-align: center;
  border-radius: 0.5rem;
  opacity: 1;
  cursor: pointer;
  border: ${({ isActive }) =>
    isActive ? "solid 1px #111;" : "solid 1px #e3e6ea;"};
`;
export const MentorBoxDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
export const BookNowButtonDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
`;
export const BookNowButton = styled.button`
  margin: 0 auto;
  width: 100%;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: lightgreen;
    transition: all 0.5s ease-in-out;
  }
`;
export const MentorRatingDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 30px;
`;
export const MentorRatingWrapper = styled.div``;
export const MentorRatingTitles = styled.h1`
  text-align: center;
  font-size: 35px;
  color: #111;
  opacity: 0.8;
`;
export const MentorRatingDivSlider = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 0;
  text-align: center;
  margin-bottom: 30px;
`;
export const RatingContentDiv = styled.div`
  width: 80%;
  background: lightgray;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  padding: 30px 50px;
  margin: 0 auto;
`;
export const RatingContent = styled.div`
  i {
    font-size: 45px;
    color: red;
  }
`;
export const RatingImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  text-align: center;
  border: 8px solid #fff;
  object-fit: cover;
`;
export const RatingContentText = styled.p`
  font-size: 19px;
  color: #111;
  font-weight: normal;
`;
export const RatingContentStarDiv = styled.div`
  padding: 20px;
  i {
    font-size: 21px;
    color: gold;
  }
`;
export const RatingContentTraineeName = styled.h4``;
