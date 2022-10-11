import React, { Suspense } from "react";
import LoadingSpinner from "../../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../../Components/Navbar/NavbarRes"));
const JobHome = React.lazy(() => import("../../Components/Jobs/JobHome"));
const JobHomePage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <JobHome />
      <Footer />
    </Suspense>
  );
};

export default JobHomePage;
