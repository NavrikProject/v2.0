import React from "react";
import {
  AboutContent,
  AboutContentDiv,
  AboutDiv,
  AboutDivLeft,
  AboutDivRight,
  AboutImg,
  AboutImgDiv,
  AboutText,
  BrowseMore,
  ButtonDiv,
  ChronoWrapper,
  CourseTitle,
  FlexDiv,
  FlexDiv1,
  FlexDivItems,
  HighlightsContent,
  HighlightsDiv,
  HighlightsDivFlex,
  HighlightsDivItem,
  HighlightsDivItems,
  HighlightsImg,
  HighlightsTitle,
  ProfessionalCard,
  ProfessionalCardBody,
  ProfessionalCardBrowserDiv,
  ProfessionalCardFooter,
  ProfessionalCardImg,
  ProfessionalDiv,
  ProfessionalSection,
  ProfessionalWrapper,
  ProfessionCardTitles,
} from "./ProfessionalElements";
import ScrollAnimation from "react-animate-on-scroll";

import CallCenter from "../../images/highlighsImages/call-center.png";
import Content from "../../images/highlighsImages/content.png";
import Online from "../../images/highlighsImages/learning.png";
import roadmap from "../../images/Project2 - Roadmapping.jpg";
import Content2 from "../../images/highlighsImages/content (2).png";
import GoToTop from "../GoToTop";

const Professionals = () => {
  return (
    <ProfessionalSection>
      <ProfessionalDiv>
        <ChronoWrapper>
          <img src={roadmap} alt="roadmap" />
        </ChronoWrapper>
      </ProfessionalDiv>
      <ScrollAnimation animateIn="fadeIn">Some Text</ScrollAnimation>
      <ProfessionalDiv>
        <ProfessionalWrapper>
          <FlexDiv>
            <FlexDivItems>
              <ProfessionalCard>
                <ProfessionalCardBody>
                  <ProfessionalCardImg
                    src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    alt=""
                  />
                </ProfessionalCardBody>
                <ProfessionalCardFooter>
                  <div>
                    <ProfessionCardTitles>
                      Choose the course that fits for you
                    </ProfessionCardTitles>
                  </div>
                  <ProfessionalCardBrowserDiv>
                    <ButtonDiv>
                      <BrowseMore>Know More</BrowseMore>
                    </ButtonDiv>
                  </ProfessionalCardBrowserDiv>
                </ProfessionalCardFooter>
              </ProfessionalCard>
            </FlexDivItems>
            <FlexDivItems>
              <ProfessionalCard>
                <ProfessionalCardBody>
                  <ProfessionalCardImg
                    src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
                    alt=""
                  />
                </ProfessionalCardBody>
                <ProfessionalCardFooter>
                  <div>
                    <ProfessionCardTitles>
                      Choose the plan create profile
                    </ProfessionCardTitles>
                  </div>
                  <ProfessionalCardBrowserDiv>
                    <ButtonDiv>
                      <BrowseMore>Know More</BrowseMore>
                    </ButtonDiv>
                  </ProfessionalCardBrowserDiv>
                </ProfessionalCardFooter>
              </ProfessionalCard>
            </FlexDivItems>
            <FlexDivItems>
              <ProfessionalCard>
                <ProfessionalCardBody>
                  <ProfessionalCardImg
                    src="https://images.unsplash.com/photo-1629001528534-e8a48b636ded?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                    alt=""
                  />
                </ProfessionalCardBody>
                <ProfessionalCardFooter>
                  <div>
                    <ProfessionCardTitles>
                      Doubt clearing session with instructors
                    </ProfessionCardTitles>
                  </div>
                  <ProfessionalCardBrowserDiv>
                    <ButtonDiv>
                      <BrowseMore>Know More</BrowseMore>
                    </ButtonDiv>
                  </ProfessionalCardBrowserDiv>
                </ProfessionalCardFooter>
              </ProfessionalCard>
            </FlexDivItems>
            <FlexDivItems>
              <ProfessionalCard>
                <ProfessionalCardBody>
                  <ProfessionalCardImg
                    src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    alt=""
                  />
                </ProfessionalCardBody>
                <ProfessionalCardFooter>
                  <div>
                    <ProfessionCardTitles>
                      Professional guidance with mentors
                    </ProfessionCardTitles>
                  </div>
                  <ProfessionalCardBrowserDiv>
                    <ButtonDiv>
                      <BrowseMore>Know More</BrowseMore>
                    </ButtonDiv>
                  </ProfessionalCardBrowserDiv>
                </ProfessionalCardFooter>
              </ProfessionalCard>
            </FlexDivItems>
          </FlexDiv>
        </ProfessionalWrapper>
      </ProfessionalDiv>
      <ProfessionalDiv>
        <ProfessionalWrapper>
          <FlexDiv1>
            <AboutDiv>
              <AboutDivRight>
                <AboutImgDiv>
                  <AboutImg src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" />
                </AboutImgDiv>
              </AboutDivRight>
              <AboutDivLeft>
                <AboutContentDiv>
                  <AboutContent>
                    <AboutText>
                      <i className="fa-solid fa-quote-left"></i>Lorem, ipsum
                      dolor sit amet consectetur adipisicing elit. Velit sequi
                      dolore, quia assumenda quis autem eligendi quod.
                      Quibusdam, culpa in.
                      <i className="fa-solid fa-quote-right"></i>
                    </AboutText>
                  </AboutContent>
                </AboutContentDiv>
              </AboutDivLeft>
            </AboutDiv>
          </FlexDiv1>
        </ProfessionalWrapper>
      </ProfessionalDiv>
      <ProfessionalDiv>
        <HighlightsDiv>
          <HighlightsTitle>Course Highlights</HighlightsTitle>
          <HighlightsDivFlex>
            <HighlightsDivItems>
              <HighlightsDivItem>
                <div>
                  <HighlightsImg src={CallCenter} alt="call center" />
                  <HighlightsContent>
                    24/7 Customer support, Available for all the time with great
                    support
                  </HighlightsContent>
                </div>
              </HighlightsDivItem>
            </HighlightsDivItems>
            <HighlightsDivItems>
              <HighlightsDivItem>
                <div>
                  <HighlightsImg src={Content} alt="image " />
                  <HighlightsContent>
                    Exclusive course content, co-created by the industrial
                    experts and professors
                  </HighlightsContent>
                </div>
              </HighlightsDivItem>
            </HighlightsDivItems>
            <HighlightsDivItems>
              <HighlightsDivItem>
                <div>
                  <HighlightsImg src={Online} alt="image" />
                  <HighlightsContent>
                    Live online master classes delivered by industrial faculty
                  </HighlightsContent>
                </div>
              </HighlightsDivItem>
            </HighlightsDivItems>
            <HighlightsDivItems>
              <HighlightsDivItem>
                <div>
                  <HighlightsImg src={Content2} alt="image" />
                  <HighlightsContent>
                    Exclusive course content, co-created by the industrial
                    experts and professors
                  </HighlightsContent>
                </div>
              </HighlightsDivItem>
            </HighlightsDivItems>
          </HighlightsDivFlex>
        </HighlightsDiv>
      </ProfessionalDiv>
      <ProfessionalDiv>
        <CourseTitle>Courses</CourseTitle>
        <ProfessionalWrapper>
          <FlexDiv>
            <FlexDivItems>
              <ProfessionalCard>
                <ProfessionalCardBody></ProfessionalCardBody>
              </ProfessionalCard>
            </FlexDivItems>
            <FlexDivItems>
              <ProfessionalCard>
                <ProfessionalCardBody></ProfessionalCardBody>
              </ProfessionalCard>
            </FlexDivItems>
            <FlexDivItems>
              <ProfessionalCard>
                <ProfessionalCardBody></ProfessionalCardBody>
              </ProfessionalCard>
            </FlexDivItems>
          </FlexDiv>
        </ProfessionalWrapper>
      </ProfessionalDiv>
      <GoToTop />
    </ProfessionalSection>
  );
};

export default Professionals;
