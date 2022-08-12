import React, { Suspense } from "react";

import GoToTop from "../Components/GoToTop";
import ScrollButton from "../Components/ScrollToTop";
//import Courses from "../Components/Deliver/Courses";
//import Footer from "../Components/Footer/Footer";
//import TrainingHighlights from "../Components/Highlights/TrainingHighlights";
//import LandingHome from "../Components/Landing/LandingHome";
//import NavbarRes from "../Components/Navbar/NavbarRes";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const TrainingHighlights = React.lazy(() =>
  import("../Components/Highlights/TrainingHighlights")
);
const LandingHome = React.lazy(() =>
  import("../Components/Landing/LandingHome")
);
const Courses = React.lazy(() => import("../Components/Deliver/Courses"));
const HomePage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <LandingHome />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Courses />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <TrainingHighlights />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
      <GoToTop />
      <ScrollButton />
    </>
  );
};

export default HomePage;
