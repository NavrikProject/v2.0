import React, { Suspense } from "react";
import LoadingSpinner from "../../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../../Components/Navbar/NavbarRes"));
const IndividualJobDetails = React.lazy(() =>
  import("../../Components/Jobs/JobCard/IndividualJob/IndividualJobDetails")
);
const JobIndividualPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <IndividualJobDetails />
      <Footer />
    </Suspense>
  );
};

export default JobIndividualPage;
