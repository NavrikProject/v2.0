import React, { Suspense } from "react";
import styled from "styled-components";

//import Faq from "../Components/Faq/Faq";
//import Footer from "../Components/Footer/Footer";
//import NavbarRes from "../Components/Navbar/NavbarRes";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const NotificationSection = styled.section`
  height: auto;
  width: 100%;
`;
const NotificationSectionDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 50px 0px;
`;
const NotificationSectionWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    width: 90%;
  }
`;

const NotificationPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <NotificationSection>
          <NotificationSectionDiv>
            <NotificationSectionWrapper>
              <div>
                <p>Subject: Welcome to Practiwiz!</p>
                <h3> Hi Mahesh Bandari,</h3>
                <p>We're pleased to see you onboard with Practiwiz.</p>
                <p>
                  Please click the following link and/or the "Activate Account"
                  button below for activation.
                </p>
                <a href="hrll">Activate Account</a>
                <p>We look forward to seeing your progress with our service!</p>
                <p>
                  If you have any questions, reply back to this email and we'll
                  be happy to help. Thanks, Practiwiz
                </p>
              </div>
            </NotificationSectionWrapper>
          </NotificationSectionDiv>
        </NotificationSection>
        <Footer />
      </Suspense>
    </>
  );
};

export default NotificationPage;
