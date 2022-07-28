import React, { Suspense } from "react";

import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const WhyPractiwiz = React.lazy(() =>
  import("../Components/Landing/WhyPractiwiz")
);
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const WhyPractiwizPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <WhyPractiwiz />
      <Footer />
    </Suspense>
  );
};

export default WhyPractiwizPage;
