import React, { Suspense } from "react";
import ContributerLogin from "../Components/Contribute/ContributerLogin";

import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const ContributerLoginPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <ContributerLogin />
      <Footer />
    </Suspense>
  );
};

export default ContributerLoginPage;
