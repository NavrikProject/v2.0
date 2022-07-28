import React, { Suspense } from "react";
import FeedbackForm from "../Components/Trainee/FeedbackForm";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const FeedbackFormPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <FeedbackForm />
      <Footer />
    </Suspense>
  );
};

export default FeedbackFormPage;
