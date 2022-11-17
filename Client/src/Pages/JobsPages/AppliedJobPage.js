import React, { Suspense } from "react";
import LoadingSpinner from "../../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../../Components/Navbar/NavbarRes"));
const AppliedJobs = React.lazy(() =>
  import("../../Components/Jobs/AppliedJobs/AppliedJobs.js")
);

const AppliedJobPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <AppliedJobs />
      <Footer />
    </Suspense>
  );
};

export default AppliedJobPage;
