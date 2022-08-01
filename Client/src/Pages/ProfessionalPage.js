import React, { Suspense } from "react";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const Professionals = React.lazy(() =>
  import("../Components/NavbarPages/Professionals")
);

const ProfessionalPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <Professionals />
        <Footer />
      </Suspense>
    </>
  );
};

export default ProfessionalPage;
