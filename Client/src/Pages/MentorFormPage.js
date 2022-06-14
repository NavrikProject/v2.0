import React, { Suspense } from "react";

import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const MentorForm = React.lazy(() =>
  import("../Components/MentorClub/MentorForm")
);
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));

const MentorFormPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <MentorForm />
      <Footer />
    </Suspense>
  );
};

export default MentorFormPage;
