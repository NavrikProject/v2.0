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
              Notifications
            </NotificationSectionWrapper>
          </NotificationSectionDiv>
        </NotificationSection>
        <Footer />
      </Suspense>
    </>
  );
};

export default NotificationPage;
