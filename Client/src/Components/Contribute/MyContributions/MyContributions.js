import React, { useState } from "react";
import {
  ContributionTitle,
  MyContributionDiv,
  MyContributionDivFlex,
  MyContributionDivWrapper,
  MyContributionFlexItem1,
  MyContributionFlexItem2,
  MyContributionFlexItem3,
  MyContributionFlexItems,
  MyContributionFlexItemTitle,
  MyContributionSection,
} from "./MyContributionElements";
import AddContent from "./AddContent";
import SuggestContent from "./SuggestContent";
import RemoveContent from "./RemoveContent";
const MyContributions = () => {
  const [showAddContentPage, setShowAddContentPage] = useState(true);
  const [removeContent, setRemoveContent] = useState(false);
  const [suggestContent, setSuggestContent] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  return (
    <MyContributionSection>
      <MyContributionDiv>
        <ContributionTitle>My Contributions</ContributionTitle>
        <MyContributionDivFlex>
          <MyContributionFlexItems
            onClick={() => {
              return (
                setShowAddContentPage(!showAddContentPage),
                setRemoveContent(false),
                setSuggestContent(false),
                setIsActive(true),
                setIsActive1(false),
                setIsActive2(false)
              );
            }}
          >
            <MyContributionFlexItem1 isActive={isActive}>
              <MyContributionFlexItemTitle>
                Add content
              </MyContributionFlexItemTitle>
            </MyContributionFlexItem1>
          </MyContributionFlexItems>
          <MyContributionFlexItems
            isActive1={isActive1}
            onClick={() => {
              return (
                setShowAddContentPage(false),
                setRemoveContent(false),
                setSuggestContent(!suggestContent),
                setIsActive(false),
                setIsActive1(true),
                setIsActive2(false)
              );
            }}
          >
            <MyContributionFlexItem2 isActive1={isActive1}>
              <MyContributionFlexItemTitle>
                suggest content
              </MyContributionFlexItemTitle>
            </MyContributionFlexItem2>
          </MyContributionFlexItems>
          <MyContributionFlexItems
            isActive2={isActive2}
            onClick={() => {
              return (
                setShowAddContentPage(false),
                setRemoveContent(!removeContent),
                setSuggestContent(false),
                setIsActive(false),
                setIsActive1(false),
                setIsActive2(true)
              );
            }}
          >
            <MyContributionFlexItem3 isActive2={isActive2}>
              <MyContributionFlexItemTitle>
                Remove content
              </MyContributionFlexItemTitle>
            </MyContributionFlexItem3>
          </MyContributionFlexItems>
        </MyContributionDivFlex>
        <hr />
        <MyContributionDivWrapper>
          {showAddContentPage && <AddContent />}
          {suggestContent && <SuggestContent />}
          {removeContent && <RemoveContent />}
        </MyContributionDivWrapper>
      </MyContributionDiv>
    </MyContributionSection>
  );
};

export default MyContributions;
