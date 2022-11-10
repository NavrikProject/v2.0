import React, { Suspense } from "react";
import JobsAdminPanel from "../../Components/Admin/JobsAdmin/JobsAdminPanel";
import LoadingSpinner from "../../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../../Components/Navbar/NavbarRes"));

const JobsAdminPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <JobsAdminPanel />
      <Footer />
    </Suspense>
  );
};

export default JobsAdminPage;
