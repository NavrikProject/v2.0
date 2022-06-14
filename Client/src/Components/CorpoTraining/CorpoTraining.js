import React from "react";
import {
  CorpoBoxTitles,
  CorpoContainer,
  CorpoDescription,
  CorpoDiv,
  CorpoDivFlex,
  CorpoSection,
  CorpoTitle,
  CorpoWrapper,
} from "./CorpoClubElements";
import CorpoCourseCard from "./CorpoCourseCard";

const CorpoClub = () => {
  return (
    <CorpoSection>
      <CorpoContainer>
        <CorpoWrapper>
          <CorpoTitle>
            Making Corporate Training Time Saving & Effective
          </CorpoTitle>
        </CorpoWrapper>
        <CorpoWrapper>
          <CorpoDivFlex>
            <CorpoDiv>
              <CorpoBoxTitles>Online & Instructor Led</CorpoBoxTitles>
              <CorpoDescription>
                Online Mode - 24*7 Accesibility
              </CorpoDescription>
            </CorpoDiv>
            <CorpoDiv>
              <CorpoBoxTitles>Practical Examples</CorpoBoxTitles>
              <CorpoDescription>Real-Life Problems & Cases</CorpoDescription>
            </CorpoDiv>
            <CorpoDiv>
              <CorpoBoxTitles>Content</CorpoBoxTitles>
              <CorpoDescription>
                Conversational, Easy-to Grasp
              </CorpoDescription>
            </CorpoDiv>
          </CorpoDivFlex>
        </CorpoWrapper>
        <CorpoWrapper>
          <CorpoDivFlex>
            <CorpoCourseCard />
          </CorpoDivFlex>
        </CorpoWrapper>
      </CorpoContainer>
    </CorpoSection>
  );
};

export default CorpoClub;
