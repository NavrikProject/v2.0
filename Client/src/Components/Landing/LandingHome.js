import React from "react";
import {
  ButtonDiv,
  DisplayDiv,
  DisplayDivItem1,
  DisplayDivItem2,
  DisplayDivItemTitleWhite,
  DisplayFlexDiv,
  DisplayFlexItems,
  KnowMoreButton,
  LandingDiv,
  LandingSection,
  PractiwizButton,
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
                Learn From the Corporate,
              </DisplayDivItemTitleWhite>
              <DisplayDivItemTitleWhite>
                Step Into Corporate World!
              </DisplayDivItemTitleWhite>
              <PractiwizButton>
                <Link
                  to={"/why-practiwiz"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Why Practiwiz ?
                </Link>
              </PractiwizButton>
            </DisplayDivItem1>
            <DisplayDivItem2>
              {/* <CorporateImage
                src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              /> */}
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
