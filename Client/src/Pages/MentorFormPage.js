import React, { Suspense } from "react";
import MentorRegisterStepForm from "../Components/MentorClub/MentorStepForm/MentorRegisterStepForm";

import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));

const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));

const MentorFormPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      {/* <MentorForm /> */}
      <MentorRegisterStepForm />
      <Footer />
    </Suspense>
  );
};

export default MentorFormPage;
