import React, { useState } from "react";
import {
  FaSearchIcon,
  MentorContainer,
  MentorDivFlex,
  MentorLabel,
  MentorOptions,
  MentorSearchDiv,
  MentorSearchRightDiv,
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
import { mentorshipAreas, mentorSkills } from "../Data/MentorData";
import GoToTop from "../GoToTop";
const MentorClub = () => {
  const [searchItem, setSearchItem] = useState("");
  const [searchItemWord, setSearchItemWord] = useState("");
  const [categoryItem, setCategoryItem] = useState("");
  const searchEngineAll = (event) => {
    event.preventDefault();
    setSearchItemWord(searchItem);
  };

  return (
    <MentorSection>
      <MentorContainer>
        <MentorWrapper>
          <MentorTitle>Meet Our Mentors</MentorTitle>
          <LineAfter />
        </MentorWrapper>
        <p>
          <Link to="/mentor/join">Join as a Mentor</Link>
        </p>
        <MentorSearchDiv>
          <MentorSearchRightDiv>
            <MentorLabel>Choose the Mentor by Skills :</MentorLabel>
            <MentorSelect
              onChange={(event) => setCategoryItem(event.target.value)}
            >
              <MentorOptions value="choose">Choose Below</MentorOptions>
              {mentorSkills.map((skill) => (
                <MentorOptions key={skill.id} value={skill.skills}>
                  {skill.skills}
                </MentorOptions>
              ))}
            </MentorSelect>
          </MentorSearchRightDiv>
          <MentorSearchRightDiv>
            <MentorLabel>Choose the Mentor by Mentorship Area:</MentorLabel>
            <MentorSelect
              onChange={(event) => setCategoryItem(event.target.value)}
            >
              <MentorOptions value="choose">Choose Below</MentorOptions>
              {mentorshipAreas.map((mentorArea) => (
                <MentorOptions key={mentorArea.id} value={mentorArea.area}>
                  {mentorArea.area}
                </MentorOptions>
              ))}
            </MentorSelect>
          </MentorSearchRightDiv>
          {/* <MentorSearchRightDiv>
            <MentorLabel>Choose the Mentor by Mentorship Area:</MentorLabel>
            <MentorSelect
              onChange={(event) => setCategoryItem(event.target.value)}
            >
              <MentorOptions value="choose">Choose Below</MentorOptions>
              {mentorshipAreas.map((mentorArea) => (
                <MentorOptions key={mentorArea.id} value={mentorArea.area}>
                  {mentorArea.area}
                </MentorOptions>
              ))}
            </MentorSelect>
          </MentorSearchRightDiv> */}
          <SearchForm onSubmit={searchEngineAll}>
            <SearchBoxInput
              placeholder="Search any mentor"
              onChange={(event) => setSearchItem(event.target.value)}
            ></SearchBoxInput>
            <FaSearchIcon onClick={searchEngineAll} />
          </SearchForm>
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
      <GoToTop />
    </MentorSection>
  );
};

export default MentorClub;
