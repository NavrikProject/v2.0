import React, { useState } from "react";
import {
  SingleCourseSect,
  SingleCourseSection,
  SingleCourseWrapper,
  SingleCourseFlex,
  HeaderRightCol,
  HeaderLeftCol,
  SingleCourseTitle,
  CourseDescription,
  RatingsCourse,
  PeopleRegistered,
  FlexBox,
  Label,
  CourseLanguages,
  LastUpdated,
  HeaderRightImg,
  HeaderLeftBox,
  HeaderRightPriced,
  BuyNowBtn,
  CourseAfterBox,
  CourseAfterDiv,
  CourseAfterImg,
  CourseAfterImgTitle,
  CourseAfterItems,
  CourseAfterTitle,
  CourseAfterWrapper,
  FaqAnswer,
  FaqBox,
  FaqContainer,
  FaqQuestion,
  FaqTitle,
  FaqWrapper,
  LineAfter,
  FaqDiv1,
  CourseHighlightList,
  CourseHighlight,
  CourseHighlightTitle,
} from "./CourseElements.js";
//import { addCourse } from "../../../../../../redux/cartRedux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GoToTop from "../GoToTop";
import { faqData } from "../Data/FaqData.js";
const BaPractical = () => {
  //add to cart handler currently commented
  // const addToCartHandler = (course) => {
  //   dispatch(addCourse(course));
  //   navigate("/trainee/cart");
  // };

  const [selected, setSelected] = useState(null);
  const toggleAccordion = (index) => {
    if (selected === index) {
      return setSelected(null);
    }
    setSelected(index);
  };
  const user = useSelector((state) => state.user.currentUser);
  return (
    <SingleCourseSect>
      <SingleCourseSection>
        <SingleCourseWrapper>
          <SingleCourseFlex>
            <HeaderRightCol>
              <SingleCourseTitle>RPA BA Practical Course</SingleCourseTitle>
              <CourseDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias illum rem labore! Quidem sunt molestias odio
                repellendus, quaerat veritatis perspiciatis?
              </CourseDescription>
              <FlexBox>
                <Label>Rating :</Label>
                <RatingsCourse> 5 stars</RatingsCourse>
              </FlexBox>
              <FlexBox>
                <Label>No of People Registered :</Label>
                <PeopleRegistered></PeopleRegistered>
              </FlexBox>
              <FlexBox>
                <Label>Last update on :</Label>
                <LastUpdated>{new Date().toLocaleDateString()}</LastUpdated>
              </FlexBox>
              <FlexBox>
                <Label>Course Created By :</Label>
                <LastUpdated>Tarun Gautham</LastUpdated>
              </FlexBox>
              <FlexBox>
                <Label>Languages :</Label>
                <CourseLanguages> English</CourseLanguages>
              </FlexBox>
            </HeaderRightCol>
            <HeaderLeftCol>
              <HeaderLeftBox>
                <HeaderRightImg src="https://www.simplilearn.com/ice9/free_resources_article_thumb/IT_Business_Analyst.jpg" />
                <FlexBox>
                  <Label>Price:</Label>
                  <HeaderRightPriced>Rs 4999</HeaderRightPriced>
                </FlexBox>
                {/* <FlexBox>
                    <AddToCartBtn onClick={() => addToCartHandler(course)}>
                      Add To Cart
                    </AddToCartBtn>
                    <WishList>Like</WishList>
                  </FlexBox> */}
                {user ? (
                  <a
                    target={`_blank`}
                    style={{ textDecoration: "none", color: "black" }}
                    href="https://learn.practilearn.com/s/store/courses/description/RPA-hands-on-live-training-Program-with-live-projects"
                  >
                    <BuyNowBtn>Buy Now</BuyNowBtn>
                  </a>
                ) : (
                  <Link to="/login">
                    <BuyNowBtn>Login</BuyNowBtn>
                  </Link>
                )}
              </HeaderLeftBox>
            </HeaderLeftCol>
          </SingleCourseFlex>
        </SingleCourseWrapper>
      </SingleCourseSection>
      <FaqDiv1>
        <CourseHighlightTitle>
          What are ‘Course Highlights’?
        </CourseHighlightTitle>
        <CourseHighlight>
          <CourseHighlightList>
            Benefits to developers & prepares you for ui path certification exam
          </CourseHighlightList>
          <CourseHighlightList>
            Get 18 LIVE Classes with ample hands-on practice
          </CourseHighlightList>
          <CourseHighlightList>
            Get professional certification by Vedic Math Forum India
          </CourseHighlightList>
          <CourseHighlightList>
            The first course of its kind to help you channelize your energy
          </CourseHighlightList>
          <CourseHighlightList>
            Makes you competent for ui path certification exam
          </CourseHighlightList>
          <CourseHighlightList>
            Gaming wizard | 15 years of coding experience in developing games
          </CourseHighlightList>
          <CourseHighlightList>
            The instructor has worked as the coach at Marquette, Miami OH, Iowa
            State
          </CourseHighlightList>
          <CourseHighlightList>
            The instructor has produced 28 civil servants; 5 were even rank
            holders
          </CourseHighlightList>
          <CourseHighlightList>
            The course is delivered at a highly economical price
          </CourseHighlightList>
          <CourseHighlightList>
            Every topic is covered with unique case studies, exercises and
            assignments
          </CourseHighlightList>
          <CourseHighlightList>
            Benefits Database developers, programmers, BI developers and DBA’s
          </CourseHighlightList>
        </CourseHighlight>
      </FaqDiv1>
      <FaqWrapper>
        <CourseAfterTitle>What You Get After The Course</CourseAfterTitle>
        <LineAfter />
        <CourseAfterWrapper>
          <CourseAfterDiv>
            <CourseAfterItems>
              <CourseAfterImgTitle>
                Practical Knowledge About RPA's Capabilties
              </CourseAfterImgTitle>
              <CourseAfterBox>
                <CourseAfterImg src="https://images.pexels.com/photos/6238048/pexels-photo-6238048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              </CourseAfterBox>
            </CourseAfterItems>
            <CourseAfterItems>
              <CourseAfterImgTitle>
                Framework for Setting Up a COE
              </CourseAfterImgTitle>
              <CourseAfterBox>
                <CourseAfterImg src="https://www.ccl.org/wp-content/uploads/2021/05/mentoring-at-work-how-to-implement-in-your-organization-ccl.jpg" />
              </CourseAfterBox>
            </CourseAfterItems>
            <CourseAfterItems>
              <CourseAfterImgTitle>
                Industry Best Practises & Lessons Learnt
              </CourseAfterImgTitle>
              <CourseAfterBox>
                <CourseAfterImg src="https://images.unsplash.com/photo-1651319087172-d27177766eab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80" />
              </CourseAfterBox>
            </CourseAfterItems>
          </CourseAfterDiv>
        </CourseAfterWrapper>
      </FaqWrapper>
      <FaqWrapper>
        <FaqContainer>
          <FaqTitle>Here some Faq</FaqTitle>
          {faqData.map((faq, index) => (
            <FaqBox key={index}>
              <FaqQuestion onClick={() => toggleAccordion(index)}>
                {faq.question}
                <span>
                  {selected === index ? (
                    <i className="fa-solid fa-minus"></i>
                  ) : (
                    <i className="fa-solid fa-plus"></i>
                  )}
                </span>
              </FaqQuestion>
              {selected === index ? <FaqAnswer>{faq.answer}</FaqAnswer> : null}
            </FaqBox>
          ))}
        </FaqContainer>
      </FaqWrapper>

      <GoToTop />
    </SingleCourseSect>
  );
};

export default BaPractical;
