import React, { Suspense } from "react";
import ContributeCorner from "../Components/Contribute/ContributeCorner";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const ContributeCornerPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <ContributeCorner />
      <Footer />
    </Suspense>
  );
};

export default ContributeCornerPage;
