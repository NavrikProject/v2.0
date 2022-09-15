import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import Form1 from "../Forms/ProfileForm/Form1.js";
import Form2 from "../../Forms/ProfileForm/Form2.js";
import Form3 from "../../Forms/ProfileForm/Form3.js";
import Form4 from "../../Forms/ProfileForm/Form4.js";
import ImageForm from "../../Forms/ProfileForm/ImageForm.js";
import GoToTop from "../../GoToTop.js";
import Model from ".././Model.js";
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
  QuickMenuTitle,
  RightDiv,
  Section,
  SidebarListItem,
  SidebarListUl,
  TraineeRole,
  TraineeTitle,
  Wrapper,
} from "./TraineeProfileElements.js";
import SingleProfile from "../../Forms/ProfileForm/SingleProfile";
import DefaultImg from "../../../images/default.jpg";
import { Link } from "react-router-dom";
const TraineeProfile = () => {
  const [personalForm, setPersonalForm] = useState(false);
  const [accountForm, setAccountForm] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState(false);
  const [deleteAccountForm, setDeleteAccountForm] = useState(false);
  const [changeImageForm, setChangeImageForm] = useState(false);
  const [traineeDetails, setTraineeDetails] = useState([]);
  const user = useSelector((state) => state.user.currentUser);

  const showPersonalForm = () => {
    setPersonalForm(!personalForm);
    setAccountForm(false);
    setChangePasswordForm(false);
    setDeleteAccountForm(false);
    setChangeImageForm(false);
  };
  const showAccountForm = () => {
    setAccountForm(!accountForm);
    setPersonalForm(false);
    setDeleteAccountForm(false);
    setChangePasswordForm(false);
    setChangeImageForm(false);
  };
  const showPasswordForm = () => {
    setChangePasswordForm(!changePasswordForm);
    setPersonalForm(false);
    setAccountForm(false);
    setDeleteAccountForm(false);
    setChangeImageForm(false);
  };
  const showDeleteAccount = () => {
    setAccountForm(false);
    setDeleteAccountForm(!deleteAccountForm);
    setPersonalForm(false);
    setChangePasswordForm(false);
    setChangeImageForm(false);
  };
  const showImageForm = () => {
    setChangeImageForm(!changeImageForm);
    setAccountForm(false);
    setDeleteAccountForm(false);
    setPersonalForm(false);
    setChangePasswordForm(false);
  };

  const token = user?.accessToken;

  useEffect(() => {
    const onImageGetHandler = async () => {
      const res = await axios.get(`/trainee/details/get/${user?.id}`, {
        headers: { authorization: "Bearer " + token },
      });
      setTraineeDetails(res.data);
    };
    onImageGetHandler();
  }, [user.id, token]);
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
                      to={`/trainee/profile/my-sessions`}
                    >
                      <span>
                        <i className="fa-solid fa-calendar-check"></i>
                      </span>
                      My Sessions
                    </Link>
                  </QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem onClick={showPersonalForm}>
                  <QuickMenuTitle>
                    <span>
                      <i className="fa-regular fa-user"></i>
                    </span>
                    Personal Form
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
                <SidebarListItem onClick={showPasswordForm}>
                  <QuickMenuTitle>
                    <span>
                      <i className="fa-solid fa-key"></i>
                    </span>
                    Password
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
          {personalForm ? (
            <Model>
              <SingleProfile personal={showPersonalForm} />
            </Model>
          ) : (
            ""
          )}
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
          <LeftDiv>
            <Wrapper>
              <DetailsWrapper>
                {" "}
                {traineeDetails?.length === 0 && (
                  <h1>Please fill the Personal details.</h1>
                )}
                {traineeDetails?.map((trainee) => (
                  <div key={trainee.trainee_id}>
                    <ImgBox>
                      <div>
                        <TraineeTitle>
                          {user.firstname + " " + user.lastname}
                        </TraineeTitle>
                        <TraineeRole>
                          <b>Role : </b> {user.type}
                        </TraineeRole>
                      </div>
                      <Img
                        src={
                          trainee.trainee_image
                            ? trainee.trainee_image
                            : DefaultImg
                        }
                      />
                    </ImgBox>
                    <DetailsFlex>
                      <DetailsFlex1>
                        <DetailsTitles>Your Email : </DetailsTitles>
                        <DetailsFromDb>{trainee.trainee_email}</DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Your Mobile : </DetailsTitles>
                        <DetailsFromDb>{trainee.trainee_mobile}</DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Date Of Birth : </DetailsTitles>
                        <DetailsFromDb>
                          {new Date(trainee.trainee_dob).toLocaleDateString()}
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Experience : </DetailsTitles>
                        <DetailsFromDb>
                          {trainee.trainee_experience} Year's
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Education : </DetailsTitles>
                        <DetailsFromDb>
                          {trainee.trainee_profession}
                        </DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Address : </DetailsTitles>
                        <DetailsFromDb>{trainee.trainee_address}</DetailsFromDb>
                      </DetailsFlex1>
                      <DetailsFlex1>
                        <DetailsTitles>Your Total Rewards : </DetailsTitles>
                        <DetailsFromDb>
                          <span> {trainee.trainee_points}</span> points
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
