import React from "react";
import GoToTop from "../GoToTop";
import styled from "styled-components";
const UspSect = styled.section`
  height: auto;
  width: 100%;
`;
const UspSection = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 50px 0px;
`;
const UspWrapper = styled.div``;
// page title
const UspTitle = styled.h1`
  font-size: 37px;
  font-weight: 600;
  text-align: center;
  margin: 30px;
  color: #0f3d3e;
`;
const UspDiv = styled.div`
  margin: 50px 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
`;
const UspDesc = styled.p`
  color: #111;
  font-size: 18px;
  opacity: 0.8;
`;
const UspDivImg = styled.img`
  width: 500px;
  height: 350px;
  margin-left: 50px;
`;
const UspH3 = styled.h3`
  text-align: center;
  padding: 10px 0;
  font-size: 40px;
  font-weight: 700;
  font-weight: normal;
  position: relative;
  svg {
    position: absolute;
    left: -40px;
    bottom: -100px;
    z-index: -10;
    width: 300px;
  }
  svg .svg1 {
    left: 0 !important;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const DivImg = styled.img`
  width: 600px;
`;

const WhyPraciwiz = () => {
  return (
    <UspSect>
      <UspSection>
        <UspWrapper>
          <UspDiv>
            <div>
              <UspDesc>
                Our belief is simple - to be the best developer in a software
                are you need practical training from real software developers.
              </UspDesc>
              <br />
              <UspDesc>
                Hence, we started our IT company Navrik Software solutions
                first. At Navrik Software solutions we deliver projects.
              </UspDesc>
              <br />
              <UspDesc>
                We ensure our trainees get practical hand-on software training
                from developers and industry experts who live and breath that
                skill.
              </UspDesc>
            </div>
            <div>
              <UspDivImg
                src="https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </div>
          </UspDiv>
          <UspTitle>The pillars of our training are</UspTitle>
          <div>
            <FlexDiv>
              <div>
                <UspH3>
                  Practical
                  <svg
                    id="sw-js-blob-svg"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="sw-gradient"
                        x1="0"
                        x2="1"
                        y1="1"
                        y2="0"
                      >
                        <stop
                          id="stop1"
                          stop-color="rgba(254.004, 102.187, 30.334, 1)"
                          offset="0%"
                        ></stop>
                        <stop
                          id="stop2"
                          stop-color="rgba(251, 168, 31, 1)"
                          offset="100%"
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#sw-gradient)"
                      d="M18.3,-30.2C25.4,-27.6,33.9,-26.1,39.4,-21.2C44.9,-16.3,47.4,-8.2,46.2,-0.7C45,6.7,40,13.5,35,19.2C30,25,24.9,29.7,19.1,31.7C13.3,33.7,6.6,32.8,-0.5,33.7C-7.7,34.6,-15.4,37.3,-22.1,35.8C-28.9,34.4,-34.7,28.9,-37.5,22.2C-40.3,15.6,-40.2,7.8,-38.7,0.9C-37.2,-6.1,-34.4,-12.2,-31.5,-18.6C-28.5,-25.1,-25.4,-31.9,-20.2,-35.4C-14.9,-39,-7.4,-39.3,-0.9,-37.7C5.6,-36.1,11.2,-32.7,18.3,-30.2Z"
                      width="100%"
                      height="100%"
                      transform="translate(50 50)"
                      stroke-width="0"
                    ></path>
                  </svg>
                </UspH3>
              </div>
              <div>
                <DivImg
                  src="https://images.pexels.com/photos/4325466/pexels-photo-4325466.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
              </div>
            </FlexDiv>
            <FlexDiv>
              <div>
                <DivImg
                  src="https://images.pexels.com/photos/18104/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
              <div>
                <UspH3>
                  Simple
                  <svg
                    className="svg1"
                    id="sw-js-blob-svg"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="sw-gradient"
                        x1="0"
                        x2="1"
                        y1="1"
                        y2="0"
                      >
                        <stop
                          id="stop1"
                          stop-color="rgba(254.004, 102.187, 30.334, 1)"
                          offset="0%"
                        ></stop>
                        <stop
                          id="stop2"
                          stop-color="rgba(251, 168, 31, 1)"
                          offset="100%"
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#sw-gradient)"
                      d="M18.3,-30.2C25.4,-27.6,33.9,-26.1,39.4,-21.2C44.9,-16.3,47.4,-8.2,46.2,-0.7C45,6.7,40,13.5,35,19.2C30,25,24.9,29.7,19.1,31.7C13.3,33.7,6.6,32.8,-0.5,33.7C-7.7,34.6,-15.4,37.3,-22.1,35.8C-28.9,34.4,-34.7,28.9,-37.5,22.2C-40.3,15.6,-40.2,7.8,-38.7,0.9C-37.2,-6.1,-34.4,-12.2,-31.5,-18.6C-28.5,-25.1,-25.4,-31.9,-20.2,-35.4C-14.9,-39,-7.4,-39.3,-0.9,-37.7C5.6,-36.1,11.2,-32.7,18.3,-30.2Z"
                      width="100%"
                      height="100%"
                      transform="translate(50 50)"
                      stroke-width="0"
                    ></path>
                  </svg>
                </UspH3>
              </div>
            </FlexDiv>
            <FlexDiv>
              <div>
                <UspH3>
                  Mentoring
                  <svg
                    id="sw-js-blob-svg"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="sw-gradient"
                        x1="0"
                        x2="1"
                        y1="1"
                        y2="0"
                      >
                        <stop
                          id="stop1"
                          stop-color="rgba(254.004, 102.187, 30.334, 1)"
                          offset="0%"
                        ></stop>
                        <stop
                          id="stop2"
                          stop-color="rgba(251, 168, 31, 1)"
                          offset="100%"
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#sw-gradient)"
                      d="M18.3,-30.2C25.4,-27.6,33.9,-26.1,39.4,-21.2C44.9,-16.3,47.4,-8.2,46.2,-0.7C45,6.7,40,13.5,35,19.2C30,25,24.9,29.7,19.1,31.7C13.3,33.7,6.6,32.8,-0.5,33.7C-7.7,34.6,-15.4,37.3,-22.1,35.8C-28.9,34.4,-34.7,28.9,-37.5,22.2C-40.3,15.6,-40.2,7.8,-38.7,0.9C-37.2,-6.1,-34.4,-12.2,-31.5,-18.6C-28.5,-25.1,-25.4,-31.9,-20.2,-35.4C-14.9,-39,-7.4,-39.3,-0.9,-37.7C5.6,-36.1,11.2,-32.7,18.3,-30.2Z"
                      width="100%"
                      height="100%"
                      transform="translate(50 50)"
                      stroke-width="0"
                    ></path>
                  </svg>
                </UspH3>
              </div>
              <div>
                <DivImg
                  src="https://images.pexels.com/photos/935949/pexels-photo-935949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
            </FlexDiv>
          </div>
        </UspWrapper>
      </UspSection>
      <GoToTop />
    </UspSect>
  );
};

export default WhyPraciwiz;
