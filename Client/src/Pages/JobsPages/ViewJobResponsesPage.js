import React, { Suspense } from "react";
import LoadingSpinner from "../../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../../Components/Navbar/NavbarRes"));
const ViewJobResponses = React.lazy(() =>
  import("../../Components/Jobs/Recruiter/ViewJobResponses")
);
const ViewJobResponsesPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <ViewJobResponses />
      <Footer />
    </Suspense>
  );
};

export default ViewJobResponsesPage;
