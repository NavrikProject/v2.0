import React, { Suspense } from "react";
import ContributerRegister from "../Components/Contribute/ContributerRegister";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const ContributerRegisterPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <ContributerRegister />
      <Footer />
    </Suspense>
  );
};

export default ContributerRegisterPage;
