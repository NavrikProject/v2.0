import React, { Suspense } from "react";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const MentorIndividual = React.lazy(() =>
  import("../Components/MentorClub/Individual/MentorIndividual.js")
);

const MentorIndividualPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <MentorIndividual />
        <Footer />
      </Suspense>
    </>
  );
};

export default MentorIndividualPage;
