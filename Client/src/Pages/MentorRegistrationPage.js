import React, { Suspense } from "react";

import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const MentorRegistration = React.lazy(() =>
  import("../Components/MentorClub/MentorRegistration/MentorRegistration.js")
);

const MentorRegistrationPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <MentorRegistration />
      <Footer />
    </Suspense>
  );
};

export default MentorRegistrationPage;
