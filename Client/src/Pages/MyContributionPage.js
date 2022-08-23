import React, { Suspense } from "react";
import MyContributions from "../Components/Contribute/MyContributions/MyContributions";

import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const MyContributionPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <MyContributions />
      <Footer />
    </Suspense>
  );
};

export default MyContributionPage;
