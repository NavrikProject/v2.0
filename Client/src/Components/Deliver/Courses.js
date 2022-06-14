import React from "react";
import {
  CourseDiv,
  CourseIconDiv,
  CourseImg,
  CourseImgBox,
  CourseImgDiv,
  CourseImgDivItems,
  CourseSection,
  CourseStyleTitle,
  CourseTitle,
  CourseTitleDiv,
  CourseWrapper,
  LineAfter,
} from "./CourseElements";
import ClassTraining from "../../images/Classroom-Training-1024x672.png";
const Courses = () => {
  return (
    <CourseSection>
      <CourseDiv>
        <CourseTitle>How we deliver our course</CourseTitle>
        <LineAfter />
        <CourseWrapper>
          <CourseImgDiv>
            <CourseImgDivItems>
              <CourseImgBox>
                <CourseImg src={ClassTraining} />
                <CourseTitleDiv>
                  <CourseStyleTitle>
                    On-premises Classroom Training
                  </CourseStyleTitle>
                  <CourseIconDiv>
                    <i
                      style={{ fontSize: "20px" }}
                      className="fa-solid fa-angle-right"
                    ></i>
                  </CourseIconDiv>
                </CourseTitleDiv>
              </CourseImgBox>
            </CourseImgDivItems>
            <CourseImgDivItems>
              <CourseImgBox>
                <CourseImg src="https://img.freepik.com/free-vector/digital-presentation-concept-illustration_114360-8115.jpg?t=st=1652695137~exp=1652695737~hmac=687224e8e2e7a5f50a547d1b9e5e4e4504e6a555d166a03112bfd8ccf739f22b&w=996" />
                <CourseTitleDiv>
                  <CourseStyleTitle>
                    Instructor-lead live, Online Training
                  </CourseStyleTitle>
                  <CourseIconDiv>
                    <i
                      style={{ fontSize: "20px" }}
                      className="fa-solid fa-angle-right"
                    ></i>
                  </CourseIconDiv>
                </CourseTitleDiv>
              </CourseImgBox>
            </CourseImgDivItems>
            <CourseImgDivItems>
              <CourseImgBox>
                <CourseImg src="https://img.freepik.com/free-vector/kids-online-lessons_52683-36818.jpg?t=st=1652695137~exp=1652695737~hmac=f9be1f16cd96826f2b630fbcc9fcf7773ad1e285a29bda915aaf89f85ca0cb81&w=996" />
                <CourseTitleDiv>
                  <CourseStyleTitle>
                    Self-Paced, Online Training
                  </CourseStyleTitle>
                  <CourseIconDiv>
                    <i
                      style={{ fontSize: "20px" }}
                      className="fa-solid fa-angle-right"
                    ></i>
                  </CourseIconDiv>
                </CourseTitleDiv>
              </CourseImgBox>
            </CourseImgDivItems>
          </CourseImgDiv>
        </CourseWrapper>
      </CourseDiv>
    </CourseSection>
  );
};

export default Courses;
