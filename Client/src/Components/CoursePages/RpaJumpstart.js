import React, { useEffect, useState } from "react";
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
import GoToTop from "../GoToTop";
import { faqData } from "../Data/FaqData.js";
import LoginModel from "../Forms/LoginModel.js";
import axios from "axios";
import { useLocation } from "react-router-dom";
const RpaJumpstart = () => {
  const location = useLocation();
  let path = location.pathname.split("/")[3];
  console.log(path);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [courseDetails, setCourseDetails] = useState([]);
  useEffect(() => {
    try {
      const getIndMentorDetails = async () => {
        const res = await axios.get(`/courses/full-course?name=${path}`);
        if (res.data.success) {
          setCourseDetails(res.data.success);
        }
        if (res.data.error) {
          setCourseDetails([]);
        }
      };
      getIndMentorDetails();
    } catch (error) {
      return;
    }
  }, [path]);
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
  const showLoginModelHandler = () => {
    setShowLoginModal(!showLoginModal);
  };
  return (
    <SingleCourseSect>
      {showLoginModal && (
        <LoginModel showLoginModelHandler={showLoginModelHandler} />
      )}
      <SingleCourseSection>
        <SingleCourseWrapper>
          <SingleCourseFlex>
            {courseDetails?.map((courseDetail) => (
              <>
                <HeaderRightCol>
                  <SingleCourseTitle>
                    {courseDetail.course_name}
                  </SingleCourseTitle>
                  <CourseDescription>
                    {courseDetail.course_desc}
                  </CourseDescription>
                  <FlexBox>
                    <Label>Rating :</Label>
                    <RatingsCourse> 5 stars</RatingsCourse>
                  </FlexBox>
                  <FlexBox>
                    <Label>
                      No of People Registered :{" "}
                      {courseDetail.course_participants}
                    </Label>
                    <PeopleRegistered></PeopleRegistered>
                  </FlexBox>
                  <FlexBox>
                    <Label>Last update on :</Label>
                    <LastUpdated>{new Date().toLocaleDateString()}</LastUpdated>
                  </FlexBox>
                  <FlexBox>
                    <Label>Course Created By :</Label>
                    <LastUpdated>
                      {courseDetail.course_trainer_name}
                    </LastUpdated>
                  </FlexBox>
                  <FlexBox>
                    <Label>Languages :</Label>
                    <CourseLanguages> English</CourseLanguages>
                  </FlexBox>
                </HeaderRightCol>
                <HeaderLeftCol>
                  <HeaderLeftBox>
                    <HeaderRightImg src={courseDetail.course_image} />
                    <FlexBox>
                      <Label>Price:</Label>
                      <HeaderRightPriced>
                        Rs {courseDetail.course_price + " excluding GST"}
                      </HeaderRightPriced>
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
                        href={courseDetail.course_graphy_link}
                      >
                        <BuyNowBtn>Buy Now</BuyNowBtn>
                      </a>
                    ) : (
                      <BuyNowBtn onClick={showLoginModelHandler}>
                        Login
                      </BuyNowBtn>
                    )}
                  </HeaderLeftBox>
                </HeaderLeftCol>
              </>
            ))}
          </SingleCourseFlex>
        </SingleCourseWrapper>
      </SingleCourseSection>
      <FaqDiv1>
        <CourseHighlightTitle>Who is this course for? </CourseHighlightTitle>
        <CourseHighlight>
          <CourseHighlightList>
            Graduates and Post-Graduates interested in RPA BOT development
            skills
          </CourseHighlightList>
          <CourseHighlightList>
            Working Software Professionals interested in RPA BOT development
            skills
          </CourseHighlightList>
        </CourseHighlight>
      </FaqDiv1>
      <FaqDiv1>
        <CourseHighlightTitle>
          What is the Training Methodology?
        </CourseHighlightTitle>
        <CourseHighlight>
          <CourseHighlightList>
            Self-paced learning - Trainees get access to on-line content through
            Practiwiz
          </CourseHighlightList>
          <CourseHighlightList>
            Regular Instructor Sessions - At regular milestones on-line sessions
            with Instructors for doubt-clearing and coding help
          </CourseHighlightList>
          <CourseHighlightList>
            Mentor Session – With Industry experts on career guidance,
            experiences etc.
          </CourseHighlightList>
        </CourseHighlight>
      </FaqDiv1>
      <FaqDiv1>
        <CourseHighlightTitle>
          How is this training different from others ?
        </CourseHighlightTitle>
        <CourseHighlight>
          <CourseHighlightList>
            Practiwiz is part of Navrik Software, a software development company
            that specializes in delivering RPA, AI and ML solutions to companies
            globally
          </CourseHighlightList>
          <CourseHighlightList>
            Content is very easy to understand
          </CourseHighlightList>
          <CourseHighlightList>
            The training is Practical and not just theory
          </CourseHighlightList>
        </CourseHighlight>
      </FaqDiv1>
      <FaqDiv1>
        <CourseHighlightTitle>
          What will you get after completion ?
        </CourseHighlightTitle>
        <p>
          On successful completion of the course a certificate will be issued
        </p>
      </FaqDiv1>
      <FaqDiv1>
        <CourseHighlightTitle>
          Does Practiwiz provide Internships?
        </CourseHighlightTitle>
        <p>
          Yes, to select trainees internships are provided at Navrik and other
          companies with tie-ups. The internships are paid where students work
          on live customer projects
        </p>
      </FaqDiv1>
      <FaqDiv1>
        <CourseHighlightTitle>
          Does Practiwiz provide jobs?
        </CourseHighlightTitle>
        <p>
          We have tie-ups with corporates across the globe and get our
          candidates job-interviews. Depending on the capability of the
          candidate the selections happen
        </p>
      </FaqDiv1>
      <FaqDiv1>
        <CourseHighlightTitle>
          Does Practiwiz guarantee jobs?
        </CourseHighlightTitle>
        <p>
          No, it’s not possible for anyone to guarantee jobs. Jobs requirements
          are given by companies based on customer projects. Our belief is
          simple. The only person who can guarantee you a job is you. If you
          have the right skills and right attitude jobs will chase you.
        </p>
      </FaqDiv1>
      <FaqDiv1>
        <CourseHighlightTitle>
          What are ‘Course Highlights’?
        </CourseHighlightTitle>
        <CourseHighlight>
          <CourseHighlightList>
            Benefits to developers & prepares you for ui path certification exam
          </CourseHighlightList>
          <CourseHighlightList>
            Get 4 LIVE Classes with ample hands-on practice
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

export default RpaJumpstart;
