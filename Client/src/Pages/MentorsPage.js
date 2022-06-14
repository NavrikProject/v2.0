import React, { Suspense } from "react";
//import NavbarRes from "../Components/Navbar/NavbarRes";
//import Footer from "../Components/Footer/Footer";
//import MentorClub from "../Components/MentorClub/MentorClub";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const MentorClub = React.lazy(() =>
  import("../Components/MentorClub/MentorClub")
);
const MentorsPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <MentorClub />
        <Footer />
      </Suspense>
    </>
  );
};

export default MentorsPage;
