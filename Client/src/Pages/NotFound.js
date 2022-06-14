import React, { Suspense } from "react";
import ErrorPage from "../images/404-error-page.jpg";
import styled from "styled-components";
import { Link } from "react-router-dom";

import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const ErrorSection = styled.section`
  width: 100%;
  height: auto;
  padding-bottom: 30px;
`;
const ErrorPageDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  text-align: center;
`;
const ErrorImg = styled.img`
  /* margin-top: 30px; */
`;
const ErrorTitle = styled.h1`
  margin-top: 10px;
  font-size: 31px;
  font-weight: 500;
`;
const ErrorBtn = styled.button`
  width: 150px;
  padding: 10px 20px;
  background-color: blue;
  cursor: pointer;
  color: white;
  border: none;
  outline: none;
  margin: 10px;
  &:hover {
    opacity: 0.9;
  }
`;

const NotFound = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <ErrorSection>
          <ErrorPageDiv>
            <ErrorImg src={ErrorPage} alt="" />
            <ErrorTitle>
              Oh no!, Sorry We couldn't find anything. <br />
              Please go back to the Home page.
            </ErrorTitle>
            <Link to={`/`} style={{ textDecoration: "none", color: "white" }}>
              <ErrorBtn>Back to Home</ErrorBtn>
            </Link>
          </ErrorPageDiv>
        </ErrorSection>
        <Footer />
      </Suspense>
    </>
  );
};

export default NotFound;
