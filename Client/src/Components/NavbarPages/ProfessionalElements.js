import styled from "styled-components";
export const ProfessionalSection = styled.section`
  margin: 0 auto;
  width: 95%;
  height: auto;
`;
export const ProfessionalDiv = styled.div``;

export const ChronoDiv = styled.div`
  margin: 0 auto !important;
`;
export const ChronoTitle = styled.h1`
  text-align: center;
  margin: 40px 0 0 0;
  text-transform: capitalize;
  font-size: 35px;
  color: #111;
  opacity: 0.8;
`;
export const ChronoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin: 0 auto !important;
  }
`;
export const ProfessionalWrapper = styled.div`
  padding: 30px 0;
`;
export const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
export const FlexDivItems = styled.div`
  width: 100%;
  height: auto;
  margin: 20px;
  cursor: pointer;
`;
export const ProfessionalCard = styled.div`
  box-shadow: rgb(142 151 158 / 15%) 0px 4px 19px;
`;
export const ProfessionalCardBody = styled.div`
  background: lightgrey;
  width: 100%;
  height: 300px;
`;
export const ProfessionalCardImg = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
`;
export const ProfessionalCardBrowserDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
export const ProfessionalCardFooter = styled.div`
  text-align: center;
  position: relative;
  padding: 10px;
  height: auto;
  background: #f0ebe3;
  &:hover ${ProfessionalCardBrowserDiv} {
    opacity: 1;
    transition: all 0.7s ease;
  }
`;
export const ProfessionCardTitles = styled.h1`
  font-weight: 500;
  font-size: 25px;
`;
export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BrowseMore = styled.button`
  font-size: 18px;
  position: absolute;
  top: 40%;
  cursor: pointer;
  padding: 7px 10px;
  border: none;
  outline: none;
  border-radius: 5px;
`;
export const FlexDiv1 = styled.div``;
export const AboutDiv = styled.div`
  width: 80%;
  margin: 40px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const AboutDivRight = styled.div`
  flex: 4;
`;
export const AboutDivLeft = styled.div`
  flex: 8;
`;
export const AboutImgDiv = styled.div`
  margin-right: 100px;
`;
export const AboutImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
`;
export const AboutContentDiv = styled.div`
  background: #eaf6f6;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  padding: 30px 50px;
`;
export const AboutContent = styled.div`
  i {
    font-size: 45px;
    color: red;
  }
`;
export const AboutText = styled.p`
  font-size: 19px;
  color: #111;
`;
export const AboutContentName = styled.h3`
  margin-top: 10px;
  color: #111;
  font-size: 24px;
  font-weight: 500;
`;
export const CourseTitle = styled.h1`
  text-align: center;
  font-size: 40px;
`;
export const HighlightsTitle = styled.h1`
  text-align: center;
  margin: 40px 0;
  text-transform: capitalize;
  font-size: 35px;
  color: #111;
  opacity: 0.8;
`;
export const HighlightsDiv = styled.div`
  padding: 20px 0;
  width: 80%;
  margin: 0 auto;
`;
export const HighlightsDivFlex = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;
export const HighlightsDivItems = styled.div`
  flex: 4;
  margin: 20px;
`;
export const HighlightsDivItem = styled.div`
  width: 100%;
  box-shadow: rgb(142 151 158 / 35%) 0px 10px 19px;
  padding: 30px 10px;
  text-align: center;
`;
export const HighlightsImg = styled.img`
  width: 100px;
  margin: 0 auto 20px auto;
`;
export const HighlightsContent = styled.p`
  font-size: 19px;
  margin: 0 auto 20px auto;
  color: #111;
  opacity: 0.9;
`;
