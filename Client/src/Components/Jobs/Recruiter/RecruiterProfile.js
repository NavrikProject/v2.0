import React, { useState } from "react";
import { useSelector } from "react-redux";
//import Form1 from "../Forms/ProfileForm/Form1.js";

import GoToTop from "../../GoToTop.js";
import {
  DetailsWrapper,
  Div,
  LeftDiv,
  QuickMenuTitle,
  RightDiv,
  Section,
  SidebarListItem,
  SidebarListUl,
  Wrapper,
} from "./RecruiterProfileElements.js";

import { Link } from "react-router-dom";
import AddFirmDetailsForm from "./AddFirmDetailsForm.js";
import PostJobForm from "./PostJobForm.js";
import ViewPostedJobs from "./ViewPostedJobs.js";
const RecruiterProfile = () => {
  const [showAddFirmDetails, setShowAddFirmDetails] = useState(true);
  const [showJobPostForm, setShowJobPostForm] = useState(false);
  const [showResponseForJobPost, setShowResponseForJobPost] = useState(false);
  const [showViewJobPosts, setShowViewJobPosts] = useState(false);
  const AddFirmDetailsHandler = () => {
    setShowAddFirmDetails(!showAddFirmDetails);
    setShowResponseForJobPost(false);
    setShowViewJobPosts(false);
    setShowJobPostForm(false);
  };
  const PostAJobHandler = () => {
    setShowJobPostForm(!showJobPostForm);
    setShowAddFirmDetails(false);
    setShowResponseForJobPost(false);
    setShowViewJobPosts(false);
  };

  const ViewResponseHandler = () => {
    setShowResponseForJobPost(!showResponseForJobPost);
    setShowJobPostForm(false);
    setShowAddFirmDetails(false);
    setShowViewJobPosts(false);
  };

  const ViewJobPosts = () => {
    setShowViewJobPosts(!showViewJobPosts);
    setShowResponseForJobPost(false);
    setShowJobPostForm(false);
    setShowAddFirmDetails(false);
  };
  return (
    <Section>
      <Div>
        <RightDiv>
          <Wrapper>
            <h1>Quick Menu</h1>
            <SidebarListUl>
              <SidebarListItem onClick={AddFirmDetailsHandler}>
                <QuickMenuTitle>Add Firm Details</QuickMenuTitle>
              </SidebarListItem>
              <SidebarListItem onClick={PostAJobHandler}>
                <QuickMenuTitle>Post a Job</QuickMenuTitle>
              </SidebarListItem>
              <SidebarListItem onClick={ViewJobPosts}>
                <QuickMenuTitle>View Job Posts</QuickMenuTitle>
              </SidebarListItem>
            </SidebarListUl>
          </Wrapper>
        </RightDiv>

        <LeftDiv>
          <Wrapper>
            <DetailsWrapper>
              {showAddFirmDetails && <AddFirmDetailsForm />}
              {showJobPostForm && <PostJobForm />}
              {showViewJobPosts && <ViewPostedJobs />}
            </DetailsWrapper>
          </Wrapper>
        </LeftDiv>
      </Div>
      <GoToTop />
    </Section>
  );
};

export default RecruiterProfile;
