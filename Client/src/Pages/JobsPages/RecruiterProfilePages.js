import React, { Suspense } from "react";
import RecruiterProfile from "../../Components/Jobs/Recruiter/RecruiterProfile";
import LoadingSpinner from "../../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../../Components/Navbar/NavbarRes"));

const RecruiterProfilePages = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <RecruiterProfile />
      <Footer />
    </Suspense>
  );
};

export default RecruiterProfilePages;
