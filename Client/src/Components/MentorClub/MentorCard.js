import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BookNowButton,
  BookNowButtonDiv,
  MentorBoxDiv,
  MentorDesc,
  MentorDescP,
  MentorDetailsDiv,
  MentorName,
} from "./MentorCardElements";
import {
  MentorCourseBox,
  MentorDiv,
  MentorDownDiv,
  MentorImg,
  MentorImgDiv,
  MentorNotFoundDiv,
  MentorUpDiv,
} from "./MentorClubElements";
import { Link } from "react-router-dom";

const MentorCourseCard = ({ searchItemWord, categoryItem }) => {
  const [mentorDetails, setMentorDetails] = useState([]);

  useEffect(() => {
    try {
      const getAllMentorDetails = async () => {
        const res = await axios.get(
          !searchItemWord
            ? "/mentor/get/all"
            : `/mentor/get/mentors?name=${searchItemWord}`
        );
        setMentorDetails(res.data.mentors);
      };
      getAllMentorDetails();
    } catch (error) {
      return;
    }
  }, [searchItemWord]);

  return (
    <>
      {!categoryItem && mentorDetails?.length > 0
        ? mentorDetails?.map((mentor) => (
            <MentorDiv key={mentor.mentor_dtls_id}>
              <MentorUpDiv></MentorUpDiv>
              <MentorDownDiv>
                <MentorImgDiv>
                  <MentorImg src={mentor.mentor_image} alt="trainer picture" />
                </MentorImgDiv>
                <MentorCourseBox>
                  <MentorBoxDiv>
                    <MentorDetailsDiv>
                      <MentorName>
                        {mentor.mentor_firstname + " " + mentor.mentor_lastname}
                      </MentorName>
                      <MentorDescP>
                        <span>{mentor.mentor_current_role} </span>
                        at <span> {mentor.mentor_firm}</span>
                      </MentorDescP>
                    </MentorDetailsDiv>
                  </MentorBoxDiv>
                  <MentorDesc>
                    {mentor.mentor_bio.slice(0, 100) + "...."}
                  </MentorDesc>
                  <BookNowButtonDiv>
                    <BookNowButton>
                      <Link
                        style={{ textDecoration: "none", color: " #fff" }}
                        to={`individual/${
                          mentor.mentor_firstname.toLowerCase() +
                          "-" +
                          mentor.mentor_lastname.toLowerCase()
                        }`}
                      >
                        Know More
                      </Link>
                    </BookNowButton>
                  </BookNowButtonDiv>
                </MentorCourseBox>
              </MentorDownDiv>
            </MentorDiv>
          ))
        : null}

      {categoryItem &&
        mentorDetails
          .filter(
            (course) =>
              course.mentor_skills === categoryItem ||
              course.mentor_mentorship_area === categoryItem ||
              course.mentor_availability === categoryItem
          )
          .map((mentor) => (
            <MentorDiv key={mentor.mentor_dtls_id}>
              <MentorUpDiv></MentorUpDiv>
              <MentorDownDiv>
                <MentorImgDiv>
                  <MentorImg src={mentor.mentor_image} alt="trainer picture" />
                </MentorImgDiv>
                <MentorCourseBox>
                  <MentorBoxDiv>
                    <MentorDetailsDiv>
                      <MentorName>
                        {mentor.mentor_firstname + " " + mentor.mentor_lastname}
                      </MentorName>
                      <MentorDescP>
                        <span>{mentor.mentor_current_role} </span>
                        at <span> {mentor.mentor_firm}</span>
                      </MentorDescP>
                    </MentorDetailsDiv>
                  </MentorBoxDiv>
                  <MentorDesc>
                    {mentor.mentor_bio.slice(0, 60) + "...."}
                  </MentorDesc>
                  <BookNowButtonDiv>
                    <BookNowButton>
                      <Link
                        style={{ textDecoration: "none", color: " #fff" }}
                        to={`individual/${
                          mentor.mentor_firstname.toLowerCase() +
                          "-" +
                          mentor.mentor_lastname.toLowerCase()
                        }`}
                      >
                        Know More
                      </Link>
                    </BookNowButton>
                  </BookNowButtonDiv>
                </MentorCourseBox>
              </MentorDownDiv>
            </MentorDiv>
          ))}
      {categoryItem &&
        mentorDetails.filter(
          (course) =>
            course.mentor_skills === categoryItem ||
            course.mentor_mentorship_area === categoryItem ||
            course.mentor_availability === categoryItem
        ).length === 0 && (
          <MentorNotFoundDiv>
            Noo mentor found! Try with different names
          </MentorNotFoundDiv>
        )}
    </>
  );
};

export default MentorCourseCard;
