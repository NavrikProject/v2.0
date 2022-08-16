import React, { Suspense } from "react";
import ApplyContribution from "../Components/Contribute/ApplyContribution";

import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const ApplyContributionPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <ApplyContribution />
      <Footer />
    </Suspense>
  );
};

export default ApplyContributionPage;
