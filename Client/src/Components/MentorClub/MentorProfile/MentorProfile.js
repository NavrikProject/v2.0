import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import Form1 from "../../Forms/ProfileForm/Form1.js";
import Form2 from "../../Forms/ProfileForm/Form2.js";
import Form3 from "../../Forms/ProfileForm/Form3.js";
import Form4 from "../../Forms/ProfileForm/Form4.js";
import ImageForm from "../../Forms/ProfileForm/ImageForm.js";
import GoToTop from "../../GoToTop.js";
import Model from "./Model.js";
import {
  DetailsFlex,
  DetailsFlex1,
  DetailsFromDb,
  DetailsTitles,
  DetailsWrapper,
  Div,
  Img,
  ImgBox,
  LeftDiv,
  MentorRegButton,
  NotFoundTitle,
  QuickMenuTitle,
  RightDiv,
  Section,
  SidebarListItem,
  SidebarListUl,
  SocialButton,
  TraineeRole,
  TraineeTitle,
  Wrapper,
} from "./MentorBookingProfileElements.js";
import { Link } from "react-router-dom";
import MentorBankDetails from "./MentorBankDetails.js";
const TraineeProfile = () => {
  const [accountForm, setAccountForm] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState(false);
  const [deleteAccountForm, setDeleteAccountForm] = useState(false);
  const [changeImageForm, setChangeImageForm] = useState(false);
  const [mentorDetails, setMentorDetails] = useState([]);
  const [showBankAccountForm, setShowBankAccountForm] = useState(false);
  const [mentorPoints, setMentorPoints] = useState([]);
  const user = useSelector((state) => state.user.currentUser);

  const showAccountForm = () => {
    setAccountForm(!accountForm);
    setDeleteAccountForm(false);
    setChangePasswordForm(false);
    setChangeImageForm(false);
    setShowBankAccountForm(false);
  };
  const showPasswordForm = () => {
    setChangePasswordForm(!changePasswordForm);
    setAccountForm(false);
    setDeleteAccountForm(false);
    setChangeImageForm(false);
    setShowBankAccountForm(false);
  };
  const showDeleteAccount = () => {
    setAccountForm(false);
    setDeleteAccountForm(!deleteAccountForm);
    setChangePasswordForm(false);
    setChangeImageForm(false);
    setShowBankAccountForm(false);
  };
  const showImageForm = () => {
    setChangeImageForm(!changeImageForm);
    setAccountForm(false);
    setDeleteAccountForm(false);
    setChangePasswordForm(false);
    setShowBankAccountForm(false);
  };
  const showBankAccountFormHandler = () => {
    setShowBankAccountForm(!showBankAccountForm);
    setChangeImageForm(false);
    setAccountForm(false);
    setDeleteAccountForm(false);
    setChangePasswordForm(false);
  };
  const token = user?.accessToken;

  useEffect(() => {
    const getFullMentorDetails = async () => {
      const res = await axios.get(`/mentor/get/full-details/${user?.email}`, {
        headers: { authorization: "Bearer " + token },
      });
      setMentorDetails(res.data.success);
    };
    getFullMentorDetails();
  }, [user?.email, token]);

  useEffect(() => {
    const getMentorPointsDetails = async () => {
      const res = await axios.get(`/feedback/reward-points/${user?.email}`, {
        headers: { authorization: "Bearer " + token },
      });
      if (res.data.success) {
        setMentorPoints(res.data.success);
      }
      if (res.data.notFound) {
        setMentorPoints([]);
      }
    };
    getMentorPointsDetails();
  }, [user?.email, token]);
  return (
    <>
      <Section>
        <Div>
          <RightDiv>
            <Wrapper>
              <h1>Quick Menu</h1>
              <SidebarListUl>
                <SidebarListItem>
                  <QuickMenuTitle>
                    <Link
                      style={{ textDecoration: "none", color: "#062C30" }}
                      to={`/mentor/profile/my-sessions`}
                    >
                      <span>
                        <i className="fa-solid fa-calendar-check"></i>
                      </span>
                      My Sessions
                    </Link>
                  </QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem>
                  <QuickMenuTitle>
                    <Link
                      style={{ textDecoration: "none", color: "#111" }}
                      to={`/${user?.type}/profile/my-jobs`}
                    >
                      <span>
                        <i className="fa-regular fa-file"></i>
                      </span>
                      Applied Jobs
                    </Link>
                  </QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem onClick={showAccountForm}>
                  <QuickMenuTitle>
                    <span>
                      <i className="fa-regular fa-user"></i>
                    </span>
                    Account
                  </QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem>
                  <QuickMenuTitle>
                    <span>
                      <i className="fa-solid fa-chart-line"></i>
                    </span>
                    Total Rewards :
                    {mentorPoints?.length > 0 ? (
                      mentorPoints?.map((mentorPoint) => (
                        <>
                          <span style={{ color: "gold" }}>
                            {" " + mentorPoint.user_points_dtls_closing_points}
                          </span>
                        </>
                      ))
                    ) : (
                      <span style={{ color: "gold" }}>0</span>
                    )}
                  </QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem onClick={showPasswordForm}>
                  <QuickMenuTitle>
                    <span>
                      <i className="fa-solid fa-key"></i>
                    </span>
                    Password
                  </QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem onClick={showBankAccountFormHandler}>
                  <QuickMenuTitle>
                    <span>
                      <i className="fa-regular fa-bank"></i>
                    </span>
                    Add Bank account
                  </QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem onClick={showImageForm}>
                  <QuickMenuTitle>
                    <span>
                      <i className="fa-regular fa-image"></i>
                    </span>
                    Change Profile picture
                  </QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem onClick={showDeleteAccount}>
                  <QuickMenuTitle>
                    <span>
                      <i className="fa-solid fa-trash"></i>
                    </span>
                    Delete the account
                  </QuickMenuTitle>
                </SidebarListItem>
              </SidebarListUl>
            </Wrapper>
          </RightDiv>
          {accountForm ? (
            <Model>
              <Form2 personal={showAccountForm} />
            </Model>
          ) : (
            ""
          )}
          {changePasswordForm ? (
            <Model>
              <Form3 personal={showPasswordForm} />
            </Model>
          ) : (
            ""
          )}
          {deleteAccountForm ? (
            <Model>
              <Form4 personal={showDeleteAccount} />
            </Model>
          ) : (
            ""
          )}
          {changeImageForm ? (
            <Model>
              <ImageForm personal={showImageForm} />
            </Model>
          ) : (
            ""
          )}
          {showBankAccountForm ? (
            <Model>
              <MentorBankDetails personal={showBankAccountFormHandler} />
            </Model>
          ) : (
            ""
          )}
          <LeftDiv>
            <Wrapper>
              <DetailsWrapper>
                {mentorDetails?.length === 0 && (
                  <>
                    <NotFoundTitle>
                      You have not applied for the mentor.Please fill the mentor
                      application
                    </NotFoundTitle>
                    <MentorRegButton>
                      <Link
                        style={{ textDecoration: "none", color: "#fff" }}
                        to={"/mentor/registration-success"}
                      >
                        Apply now
                      </Link>
                    </MentorRegButton>
                  </>
                )}
                {mentorDetails?.map((mentor) => (
                  <div key={mentor.trainee_id}>
                    <ImgBox>
                      <div>
                        <TraineeTitle>
                          {user.firstname + " " + user.lastname}
                        </TraineeTitle>
                        <TraineeRole>
                          <b>Role : </b> {user.type} <br />
                          <b>Status : </b>
                          {mentor.mentor_approved === "Yes"
                            ? "Application approved"
                            : "Application not approved"}
                        </TraineeRole>
                        <br />
                        <div style={{ marginTop: "20px" }}>
                          <SocialButton
                            target="_blank"
                            href={mentor.mentor_website}
                          >
                            website
                          </SocialButton>
                          <SocialButton
                            target="_blank"
                            href={mentor.mentor_linkedin_profile}
                          >
                            linked in
                          </SocialButton>
                        </div>
                      </div>

                      <Img
                        src={
                          !mentor.trainee_image
                            ? `https://navrik.blob.core.windows.net/navrikimage/default.jpg`
                            : mentor.trainee_image
                        }
                      />
                    </ImgBox>
                    <DetailsFlex>
                      <DetailsFlex1>
                        <DetailsTitles>Your Email : </DetailsTitles>
                        <DetailsFromDb>{mentor.mentor_email}</DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Your Mobile : </DetailsTitles>
                        <DetailsFromDb>
                          {mentor.mentor_phone_number}
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Skills category : </DetailsTitles>
                        <DetailsFromDb>
                          {mentor.mentor_speciality}
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Skills : </DetailsTitles>
                        <DetailsFromDb>
                          {mentor.mentor_skills} {mentor.mentor_otherSkills}
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Your mentorship timings :</DetailsTitles>
                        <DetailsFromDb>
                          {mentor.mentor_availability_start_time} to
                          {" " + mentor.mentor_availability_end_time}
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Experience : </DetailsTitles>
                        <DetailsFromDb>
                          {mentor.mentor_experience} Year's
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Current Role: </DetailsTitles>
                        <DetailsFromDb>
                          {mentor.mentor_current_role}
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Current Company: </DetailsTitles>
                        <DetailsFromDb>{mentor.mentor_firm}</DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>
                          Mentor Sessions Conducted:
                        </DetailsTitles>
                        <DetailsFromDb>
                          {mentor.mentor_sessions_conducted}
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Mentor Sessions Missed :</DetailsTitles>
                        <DetailsFromDb>
                          {mentor.mentor_unattended_sessions}
                        </DetailsFromDb>
                      </DetailsFlex1>
                    </DetailsFlex>
                  </div>
                ))}
              </DetailsWrapper>
            </Wrapper>
          </LeftDiv>
        </Div>
        <GoToTop />
      </Section>
    </>
  );
};

export default TraineeProfile;
