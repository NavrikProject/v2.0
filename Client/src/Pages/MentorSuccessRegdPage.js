import React, { Suspense } from "react";
import MentorSuccess from "../Components/MentorClub/MentorStepForm/MentorSuccess";

import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));

const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));

const MentorSuccessRegdPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <MentorSuccess />
      <Footer />
    </Suspense>
  );
};

export default MentorSuccessRegdPage;
