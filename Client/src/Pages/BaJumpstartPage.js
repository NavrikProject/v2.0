import React, { Suspense } from "react";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const BaJumpstart = React.lazy(() =>
  import("../Components/CoursePages/BaJumpstart.js")
);
const BaJumpstartPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <BaJumpstart />
        <Footer />
      </Suspense>
    </>
  );
};

export default BaJumpstartPage;
