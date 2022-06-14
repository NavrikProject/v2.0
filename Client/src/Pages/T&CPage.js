import React, { Suspense } from "react";
import LoadingSpinner from "../Components/utils/LoadingSpinner";

const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const Terms = React.lazy(() => import("../Components/Generals/Terms"));

const TermsCondition = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <Terms />
        <Footer />
      </Suspense>
    </>
  );
};

export default TermsCondition;
