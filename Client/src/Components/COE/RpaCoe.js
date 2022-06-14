import React, { useState } from "react";
import {
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
  FaqDiv,
  FaqDiv1,
  FaqDiv2,
  FaqDivFlex,
  FaqQuestion,
  FaqSection,
  FaqTitle,
  FaqWrapper,
  LineAfter,
  ContactDiv,
  RpaSendQuery,
  RpaBookSessions,
} from "./RpaCoeElements";
import { faqData } from "../Data/FaqData";
import GoToTop from "../GoToTop";
const RpaCoe = () => {
  const [selected, setSelected] = useState(null);
  const toggleAccordion = (index) => {
    if (selected === index) {
      return setSelected(null);
    }
    setSelected(index);
  };
  return (
    <FaqSection>
      <FaqDiv>
        <FaqWrapper>
          <FaqDivFlex>
            <FaqDiv1>
              <h1>Future-Proof Your Business By Making Your Organization </h1>
            </FaqDiv1>
            <FaqDiv2>
              <p>Course Highlights</p>
            </FaqDiv2>
          </FaqDivFlex>
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
                {selected === index ? (
                  <FaqAnswer>{faq.answer}</FaqAnswer>
                ) : null}
              </FaqBox>
            ))}
          </FaqContainer>
        </FaqWrapper>
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
          <ContactDiv>
            <RpaSendQuery>Send a Query</RpaSendQuery>
            <RpaBookSessions>Book Your Session</RpaBookSessions>
          </ContactDiv>
        </FaqWrapper>
      </FaqDiv>
      <GoToTop />
    </FaqSection>
  );
};

export default RpaCoe;
