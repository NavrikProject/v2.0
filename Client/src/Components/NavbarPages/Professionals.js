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
  ChronoDiv,
  ChronoTitle,
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
import { Chrono } from "react-chrono";
import CallCenter from "../../images/highlighsImages/call-center.png";
import GoToTop from "../GoToTop";
const data = [
  {
    title: "SELECTION",
    cardTitle: "Operation Barbarossa",
    url: "http://localhost:3000/login",
    cardSubtitle: `A column of Red Army prisoners taken during the first days of the German invasion`,
    cardDetailedText: `Since the 1920s, Hitler had seen Russia, with its immense natural resources, as the principal target for conquest and expansion. It would provide, he believed, the necessary ‘Lebensraum’, or living space, for the German people. And by conquering Russia, Hitler would also destroy the “Jewish pestilential creed of Bolshevism”. His non-aggression pact with Stalin in August 1939 he regarded as a mere temporary expedient.
      Barely a month after the fall of France, and while the Battle of Britain was being fought, Hitler started planning for the Blitzkrieg campaign against Russia, which began on 22 June 1941. Despite repeated warnings, Stalin was taken by surprise, and for the first few months the Germans achieved spectacular victories, capturing huge swathes of land and hundreds of thousands of prisoners. But they failed to take Moscow or Leningrad before winter set in.
      On 5/6 December, the Red Army launched a counter-offensive which removed the immediate threat to the Soviet capital. It also brought the German high command to the brink of a catastrophic military crisis. Hitler stepped in and took personal command. His intervention was decisive and he later boasted, “That we overcame this winter and are today in a position again to proceed victoriously… is solely attributable to the bravery of the soldiers at the front and my firm will to hold out…” <button  style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Hello</button>`,
  },
  {
    title: "REGISTRATION",
    cardTitle: "Pearl Harbor",
    url: "http://www.history.com",
    cardSubtitle: `The destroyer USS Shaw explodes in dry dock after being hit by Japanese aircraft`,
    cardDetailedText: `After Japan’s occupation of French Indo-China in July 1941, US President Franklin D Roosevelt, followed by Britain and the Netherlands, ordered the freezing of Japanese assets.
      Many Japanese now believed that there was no alternative between economic ruin and going to war with the United States and the European colonial powers. In October 1941, a hardline government under General Hideki Tojo came to power, and preparations were made to deliver a devastating blow against the Americans.`,
  },
  {
    title: "TRAINING",
    cardTitle: "The fall of Singapore",
    url: "http://www.history.com",
    cardSubtitle: `Lieutenant General Arthur Percival and staff on their way to the Singapore Ford factory to negotiate the island’s surrender with General Yamashita`,
    cardDetailedText: `The Japanese began their invasion of Malaya on 8 December 1941, and very soon the British and empire defenders were in full retreat.
      Told previously that the Japanese were no match for European troops, morale among the defending forces slumped as General Tomoyuki Yamashita’s forces moved swiftly southwards towards Singapore.
      The sinking of the British capital ships HMS Prince of Wales and Repulse by Japanese aircraft also contributed to the decline in morale, and panic began to set in among the civil population and the fighting troops. British commander Lieutenant General Arthur Percival had hoped to make a stand at Johore, but was forced to withdraw to Singapore Island. The Japanese landed there on 8/9 February, and before long the defence collapsed. To avoid further bloodshed, and with his water supply gone, Percival surrendered on 15 February.
      Churchill described the surrender as, “the worst disaster… in British military history”. Over 130,000 British and empire troops surrendered to a much smaller Japanese force, which only suffered 9,824 battle casualties during the 70-day campaign. Singapore was not only a humiliating military defeat, but also a tremendous blow to the prestige of the ‘white man’ throughout Asia.`,
  },
  {
    title: "MENTORSHIP",
    cardTitle: "Midway",
    url: "http://localhost:3000/login",
    cardSubtitle: `The American aircraft carrier USS Yorktown under Japanese attack during the battle of Midway`,
    cardDetailedText: `For six months after Pearl Harbor, just as Admiral Yamamoto predicted, Japanese forces carried all before them, capturing Hong Kong, Malaya, the Philippines and the Dutch East Indies. In May 1942, in an attempt to consolidate their grip on their new conquests, the Japanese sought to eliminate the United States as a strategic Pacific power.
      This would be done by luring into a trap the US navy carriers that had escaped Pearl Harbor, while at the same time the Japanese would occupy the Midway atoll in preparation for further attacks. The loss of the carriers would, the Japanese hoped, force the Americans to the negotiating table. In the event, it was the Americans who inflicted a crushing defeat on the Japanese. Their codebreakers were able to determine the location and date of the Japanese attack. This enabled US admiral Chester Nimitz to organise a trap of his own.
      During the ensuing battle the Japanese suffered the loss of four carriers, one heavy cruiser and 248 aircraft, while American losses totalled one carrier, one destroyer and 98 planes. By their victory at Midway, the turning point of the Pacific war, the Americans were able to seize the strategic initiative from the Japanese, who had suffered irreplaceable losses. Admiral Nimitz described the battle’s success as “Essentially a victory of intelligence”, while President Roosevelt called it “Our most important victory in 1942… there we stopped the Japanese offensive. ” `,
  },
];
const Professionals = () => {
  return (
    <ProfessionalSection>
      <ProfessionalDiv>
        <ChronoWrapper>
          <ChronoTitle>Our Journey starts from here!</ChronoTitle>
          <ChronoDiv>
            <Chrono
              fontSizes={{
                title: "21px",
              }}
              buttonTexts={{
                first: "Jump to First",
              }}
              items={data}
              hideControls
            />
          </ChronoDiv>
        </ChronoWrapper>
      </ProfessionalDiv>
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
                  <HighlightsImg src={CallCenter} alt="call center" />
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
                  <HighlightsImg src={CallCenter} alt="call center" />
                  <HighlightsContent>
                    Live online master classes delivered by industrial faculty
                  </HighlightsContent>
                </div>
              </HighlightsDivItem>
            </HighlightsDivItems>
            <HighlightsDivItems>
              <HighlightsDivItem>
                <div>
                  <HighlightsImg src={CallCenter} alt="call center" />
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
