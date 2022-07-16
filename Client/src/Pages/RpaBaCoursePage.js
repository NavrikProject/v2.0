import React, { Suspense } from "react";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const RpaBaCourse = React.lazy(() =>
  import("../Components/CoursePages/BaPractical.js")
);
const RpaBaCoursePage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <RpaBaCourse />
        <Footer />
      </Suspense>
    </>
  );
};

export default RpaBaCoursePage;
