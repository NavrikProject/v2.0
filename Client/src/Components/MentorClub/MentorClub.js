import React, { useState } from "react";
import {
  ClearFilter,
  FaSearchIcon,
  JoinAsMentorButton,
  MentorContainer,
  MentorDivFlex,
  MentorJoinDesc,
  MentorJoinDiv,
  MentorJoinDivFlex,
  MentorJoinLeftDiv,
  MentorJoinRightDiv,
  MentorLeftImgDiv,
  MentorOptions,
  MentorRightContentDiv,
  MentorSearchDiv,
  MentorSearchRightDiv,
  MentorSect,
  MentorSection,
  MentorSelect,
  MentorTitle,
  MentorWrapper,
  SearchBoxInput,
  SearchForm,
} from "./MentorClubElements";
import MentorCourseCard from "./MentorCard";
import { LineAfter } from "./MentorCardElements";
import { Link } from "react-router-dom";
import {
  mentorAvailabilityTimings,
  mentorshipAreas,
  mentorSkills,
} from "../Data/MentorData";
import GoToTop from "../GoToTop";
const MentorClub = () => {
  const [searchItem, setSearchItem] = useState("");
  const [searchItemWord, setSearchItemWord] = useState("");
  const [categoryItem, setCategoryItem] = useState("");
  const searchEngineAll = (event) => {
    event.preventDefault();
    setSearchItemWord(searchItem);
  };
  const clearFilterHandler = () => {
    window.location.reload();
  };
  return (
    <>
      <MentorSect>
        <MentorSection>
          <MentorContainer>
            <MentorWrapper>
              <MentorTitle>Meet Our Mentors</MentorTitle>
              <LineAfter />
              {categoryItem && (
                <ClearFilter>
                  Showing filters for
                  <span onClick={clearFilterHandler}>
                    {categoryItem} <i class="fa-solid fa-xmark"></i>
                  </span>
                </ClearFilter>
              )}
            </MentorWrapper>
            <MentorSearchDiv>
              <MentorSearchRightDiv>
                <MentorSelect
                  onChange={(event) => setCategoryItem(event.target.value)}
                >
                  <MentorOptions value="">
                    Choose the Mentor by Skills
                  </MentorOptions>
                  {mentorSkills.map((skill) => (
                    <MentorOptions key={skill.id} value={skill.skills}>
                      {skill.skills}
                    </MentorOptions>
                  ))}
                </MentorSelect>
              </MentorSearchRightDiv>
              <MentorSearchRightDiv>
                <MentorSelect
                  onChange={(event) => setCategoryItem(event.target.value)}
                >
                  <MentorOptions value="">
                    Choose the Mentor by Mentorship Area
                  </MentorOptions>
                  {mentorshipAreas.map((mentorArea) => (
                    <MentorOptions key={mentorArea.id} value={mentorArea.area}>
                      {mentorArea.area}
                    </MentorOptions>
                  ))}
                </MentorSelect>
              </MentorSearchRightDiv>
              <MentorSearchRightDiv>
                <MentorSelect
                  onChange={(event) => setCategoryItem(event.target.value)}
                >
                  <MentorOptions value="">
                    Choose the Mentor by Availability
                  </MentorOptions>
                  {mentorAvailabilityTimings.map((mentorArea) => (
                    <MentorOptions
                      key={mentorArea.id}
                      value={mentorArea.timings}
                    >
                      {mentorArea.timings}
                    </MentorOptions>
                  ))}
                </MentorSelect>
              </MentorSearchRightDiv>
              <MentorSearchRightDiv>
                <SearchForm onSubmit={searchEngineAll}>
                  <SearchBoxInput
                    placeholder="Search any mentor"
                    onChange={(event) => setSearchItem(event.target.value)}
                  ></SearchBoxInput>
                  <FaSearchIcon onClick={searchEngineAll} />
                </SearchForm>
              </MentorSearchRightDiv>
            </MentorSearchDiv>
            <MentorWrapper>
              <MentorDivFlex>
                <MentorCourseCard
                  categoryItem={categoryItem}
                  searchItemWord={searchItemWord}
                />
              </MentorDivFlex>
            </MentorWrapper>
          </MentorContainer>
        </MentorSection>
      </MentorSect>
      <MentorContainer>
        <MentorWrapper>
          <MentorJoinDiv>
            <MentorJoinDivFlex>
              <MentorJoinRightDiv>
                <MentorRightContentDiv>
                  <MentorJoinDesc>
                    Are you an industry expert or Are you good at Mentoring the
                    people to achieve there goals.Then join now as mentor in the
                    practiwiz.com and win exciting prizes
                  </MentorJoinDesc>
                  <br />
                  <JoinAsMentorButton>
                    <Link
                      style={{ textDecoration: "none", color: " #fff" }}
                      to="/mentor/join"
                    >
                      Join as a Mentor
                    </Link>
                  </JoinAsMentorButton>
                </MentorRightContentDiv>
              </MentorJoinRightDiv>
              <MentorJoinLeftDiv>
                <MentorLeftImgDiv>
                  <img
                    src="https://images.pexels.com/photos/716276/pexels-photo-716276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="mentor"
                  />
                </MentorLeftImgDiv>
              </MentorJoinLeftDiv>
            </MentorJoinDivFlex>
          </MentorJoinDiv>
        </MentorWrapper>
        <GoToTop />
      </MentorContainer>
    </>
  );
};

export default MentorClub;
