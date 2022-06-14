import React, { Suspense } from "react";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const Privacy = React.lazy(() => import("../Components/Generals/Privacy"));

const PrivacyPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <Privacy />
        <Footer />
      </Suspense>
    </>
  );
};

export default PrivacyPage;
