import React, { Suspense } from "react";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const ResetPassword = React.lazy(() =>
  import("../Components/Forms/PasswordForm/ResetPassword")
);
const ResetPwdPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <ResetPassword />
        <Footer />
      </Suspense>
    </>
  );
};

export default ResetPwdPage;
