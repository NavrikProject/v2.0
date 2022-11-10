import React, { useState } from "react";
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
import ActiveJobs from "./ActiveJobs";
import InActiveJobs from "./InActiveJobs";
import AddFirmDetailsForm from "./AddFirmDetailsForm.js";
import PostJobForm from "./PostJobForm.js";
const RecruiterProfile = () => {
  const [showAddFirmDetails, setShowAddFirmDetails] = useState(true);
  const [showJobPostForm, setShowJobPostForm] = useState(false);
  const [showResponseForJobPost, setShowResponseForJobPost] = useState(false);
  const [showViewJobPosts, setShowViewJobPosts] = useState(false);
  const [activeJobPosts, setActiveJobPosts] = useState(false);
  const [inActiveJobPosts, setInActiveJobPosts] = useState(false);
  const AddFirmDetailsHandler = () => {
    setShowAddFirmDetails(!showAddFirmDetails);
    setShowResponseForJobPost(false);
    setShowViewJobPosts(false);
    setShowJobPostForm(false);
    setInActiveJobPosts(false);
    setActiveJobPosts(false);
  };
  const PostAJobHandler = () => {
    setShowJobPostForm(!showJobPostForm);
    setShowAddFirmDetails(false);
    setShowResponseForJobPost(false);
    setShowViewJobPosts(false);
    setInActiveJobPosts(false);
    setActiveJobPosts(false);
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
  const inActiveJobPostsHandler = () => {
    setShowViewJobPosts(false);
    setShowResponseForJobPost(false);
    setShowJobPostForm(false);
    setShowAddFirmDetails(false);
    setInActiveJobPosts(!inActiveJobPosts);
    setActiveJobPosts(false);
  };
  const activeJobPostsHandler = () => {
    setShowViewJobPosts(false);
    setShowResponseForJobPost(false);
    setShowJobPostForm(false);
    setShowAddFirmDetails(false);
    setInActiveJobPosts(false);
    setActiveJobPosts(!activeJobPosts);
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
              <SidebarListItem onClick={activeJobPostsHandler}>
                <QuickMenuTitle>Open Jobs</QuickMenuTitle>
              </SidebarListItem>
              <SidebarListItem onClick={inActiveJobPostsHandler}>
                <QuickMenuTitle>Closed Jobs</QuickMenuTitle>
              </SidebarListItem>
            </SidebarListUl>
          </Wrapper>
        </RightDiv>

        <LeftDiv>
          <Wrapper>
            <DetailsWrapper>
              {showAddFirmDetails && <AddFirmDetailsForm />}
              {showJobPostForm && <PostJobForm />}
              {activeJobPosts && <ActiveJobs />}
              {inActiveJobPosts && <InActiveJobs />}
            </DetailsWrapper>
          </Wrapper>
        </LeftDiv>
      </Div>
      <GoToTop />
    </Section>
  );
};

export default RecruiterProfile;
