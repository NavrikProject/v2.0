import styled from "styled-components";
export const SingleCourseSect = styled.section`
  height: auto;
  background-color: #fff;
  width: 100%;
`;
export const SingleCourseSection = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 0px 0px;
  background-color: #111;
  height: auto;
`;
export const SingleCourseWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 0px 0px;
`;
export const SingleCourseWrapper2 = styled.div`
  width: 80%;
  margin: 50px auto;
  padding: 0px 0px;
`;

export const SingleCourseLeftBarContent = styled.div`
  flex: 8;
`;

export const SingleCourseRightBarContent = styled.div`
  height: auto;
  flex: 4;
`;
// page title
export const SingleCourseTitle = styled.h1`
  color: white;
  font-size: 35px;
  font-weight: 700;
  padding-top: 10px;
  text-transform: capitalize;
`;
export const SingleCourseFlex = styled.div`
  padding: 50px 0;
  display: flex;
`;
export const HeaderRightCol = styled.div`
  flex: 8;
  padding-right: 20px;
`;
export const HeaderLeftCol = styled.div`
  flex: 4;
  position: relative;
`;
export const CourseDescription = styled.p`
  font-size: 19px;
  color: white;
  word-break: break;
  padding: 15px 0;
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0px;
  color: white;
`;
export const RatingsCourse = styled.p`
  font-size: 17px;
  font-weight: 300;
  padding-left: 12px;
`;

export const CreatedBy = styled.p`
  font-size: 17px;
  font-weight: 300;
  padding-left: 12px;
`;
export const PeopleRegistered = styled.p`
  font-size: 17px;
  font-weight: 300;
  padding-left: 12px;
`;
export const CourseLanguages = styled.p`
  font-size: 17px;
  font-weight: 300;
  padding-left: 12px;
`;
export const LastUpdated = styled.p`
  font-size: 17px;
  font-weight: 300;
  padding-left: 12px;
`;
export const Label = styled.p`
  font-size: 20px;
  font-weight: normal;
`;
export const HeaderLeftBox = styled.div`
  width: 100%;
  padding: 10px;
`;
export const HeaderRightImg = styled.img`
  width: 100%;
  height: 200px;
  cursor: pointer;
  border: 1px solid lightgrey;
  object-fit: cover;
`;
export const HeaderRightPriced = styled.p`
  font-size: 20px;
  padding-left: 10px;
`;
export const BuyNowBtn = styled.button`
  width: 100%;
  outline: none;
  border: none;
  margin-top: 10px;
  background: -webkit-linear-gradient(left, #3e5ce4, #4282fa);
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
export const AddToCartBtn = styled.button`
  outline: none;
  border: 1px solid #fff;
  background: none;
  color: #fff;
  width: 80%;
  cursor: pointer;
  padding: 10px 20px;
  &:hover {
    background: white;
    color: #111;
  }
`;

export const WishList = styled.p`
  padding: 10px 20px;
  cursor: pointer;
`;
export const CourseContentTitle = styled.h1`
  font-size: 43px;
`;

export const UlMenuContent = styled.ul``;
export const LieMenuContent = styled.li`
  list-style-type: none;
  font-size: 21px;
`;

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
export const FaqDiv1 = styled.div`
  padding: 20px 0;
  width: 80%;
  margin: 0 auto;
  p {
    margin-left: 30px;
  }
`;
export const CourseHighlightTitle = styled.h1`
  font-size: 27px;
  color: #111;
  opacity: 0.9;
`;
export const CourseHighlight = styled.ul`
  padding: 0 20px;
  margin-left: 30px;
`;
export const CourseHighlightList = styled.li`
  font-size: 17px;
  padding: 3px 0;
`;
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
export const ContactDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 50%;
  margin: 0 auto;
`;
export const RpaSendQuery = styled.button`
  outline: none;
  padding: 15px 20px;
  border: none;
  cursor: pointer;
  font-size: 24px;
  border-radius: 5px;
`;
export const RpaBookSessions = styled.button`
  outline: none;
  padding: 15px 20px;
  border: none;
  cursor: pointer;
  font-size: 24px;
  border-radius: 5px;
  animation-name: pop;
  animation-duration: 10s;
  &:hover {
    @keyframes pop {
      from {
        background-color: red;
      }
      to {
        background-color: yellow;
      }
    }
  }
`;
