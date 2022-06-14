import React, { Suspense } from "react";

import LoadingSpinner from "../Components/utils/LoadingSpinner";

const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const ForgotPassword = React.lazy(() =>
  import("../Components/Forms/PasswordForm/ForgotPassword")
);
const ForgotPwdPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <ForgotPassword />
        <Footer />
      </Suspense>
    </>
  );
};

export default ForgotPwdPage;
