import React, { Suspense } from "react";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const RpaJumpstart = React.lazy(() =>
  import("../Components/CoursePages/RpaJumpstart.js")
);
const RpaJumpstartPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <RpaJumpstart />
        <Footer />
      </Suspense>
    </>
  );
};

export default RpaJumpstartPage;
