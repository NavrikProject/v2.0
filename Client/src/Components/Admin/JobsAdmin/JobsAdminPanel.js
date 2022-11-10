import React, { useState } from "react";
import GoToTop from "../../GoToTop.js";
import ActiveJobs from "./ActiveJobsAdmin.js";
import InActiveJobs from "./InActiveJobsAdmin.js";
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
} from "./JobsAdminPanelElements.js";
const JobsAdminPanel = () => {
  const [activeJobPosts, setActiveJobPosts] = useState(false);
  const [inActiveJobPosts, setInActiveJobPosts] = useState(true);
  const inActiveJobPostsHandler = () => {
    setInActiveJobPosts(!inActiveJobPosts);
    setActiveJobPosts(false);
  };
  const activeJobPostsHandler = () => {
    setInActiveJobPosts(false);
    setActiveJobPosts(!activeJobPosts);
  };
  return (
    <>
      <Section>
        <Div>
          <RightDiv>
            <Wrapper>
              <h1>Quick Menu</h1>
              <SidebarListUl>
                <SidebarListItem onClick={inActiveJobPostsHandler}>
                  <QuickMenuTitle>In Active Jobs</QuickMenuTitle>
                </SidebarListItem>
                <SidebarListItem onClick={activeJobPostsHandler}>
                  <QuickMenuTitle>Active Jobs</QuickMenuTitle>
                </SidebarListItem>
              </SidebarListUl>
            </Wrapper>
          </RightDiv>
          <LeftDiv>
            <Wrapper>
              <DetailsWrapper>
                {activeJobPosts && <ActiveJobs />}
                {inActiveJobPosts && <InActiveJobs />}
              </DetailsWrapper>
            </Wrapper>
          </LeftDiv>
        </Div>
        <GoToTop />
      </Section>
    </>
  );
};

export default JobsAdminPanel;
