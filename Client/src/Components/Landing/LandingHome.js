import React from "react";
import {
  ButtonDiv,
  DisplayDiv,
  DisplayDivItem1,
  DisplayDivItem2,
  DisplayDivItemTitleGold,
  DisplayDivItemTitleWhite,
  DisplayFlexDiv,
  DisplayFlexItems,
  KnowMoreButton,
  LandingDiv,
  LandingSection,
  RpaCoeBox,
  RpaCoeTitle,
} from "./LandingHomeElements";
import { Link } from "react-router-dom";
const LandingHome = () => {
  return (
    <>
      <LandingSection>
        <LandingDiv>
          <DisplayDiv>
            <DisplayDivItem1>
              <DisplayDivItemTitleWhite>
                We deliver RPA Project
              </DisplayDivItemTitleWhite>
              <DisplayDivItemTitleWhite>
                We pass on Our Learning
              </DisplayDivItemTitleWhite>
              <DisplayDivItemTitleWhite>
                Real World Software-experts
              </DisplayDivItemTitleWhite>
            </DisplayDivItem1>
            <DisplayDivItem2>
              <DisplayDivItemTitleGold>
                Don't just learn, <br /> Prctilearn
              </DisplayDivItemTitleGold>
            </DisplayDivItem2>
          </DisplayDiv>
        </LandingDiv>
      </LandingSection>
      <LandingDiv>
        <DisplayFlexDiv>
          <DisplayFlexItems>
            <RpaCoeBox>
              <RpaCoeTitle>IMPLEMENTING RPA COE AT CORPORATE</RpaCoeTitle>
              <ButtonDiv>
                <KnowMoreButton>
                  <Link
                    style={{ textDecoration: "none", color: "#111" }}
                    to="training/rpa-coe"
                  >
                    Know More
                  </Link>
                </KnowMoreButton>
              </ButtonDiv>
            </RpaCoeBox>
          </DisplayFlexItems>
          <DisplayFlexItems>
            <RpaCoeBox>
              <RpaCoeTitle>RPA FOR MANAGERS</RpaCoeTitle>
              <ButtonDiv>
                <KnowMoreButton>Know More</KnowMoreButton>
              </ButtonDiv>
            </RpaCoeBox>
          </DisplayFlexItems>
          <DisplayFlexItems>
            <RpaCoeBox>
              <RpaCoeTitle>RPA A Practical Perspective</RpaCoeTitle>
              <ButtonDiv>
                <KnowMoreButton>Know More</KnowMoreButton>
              </ButtonDiv>
            </RpaCoeBox>
          </DisplayFlexItems>
        </DisplayFlexDiv>
      </LandingDiv>
    </>
  );
};

export default LandingHome;
