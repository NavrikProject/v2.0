import React, { Suspense } from "react";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const MentorProfile = React.lazy(() =>
  import("../Components/MentorClub/MentorProfile")
);
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const MentorProfilePage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <MentorProfile />
        <Footer />
      </Suspense>
    </>
  );
};

export default MentorProfilePage;
