import React, { Suspense } from "react";
// import NavbarRes from "../Components/Navbar/NavbarRes";
// import Footer from "../Components/Footer/Footer";
// import RegisterForm from "../Components/Forms/RegisterForm/RegisterForm";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const RegisterForm = React.lazy(() =>
  import("../Components/Forms/RegisterForm/RegisterForm")
);
const RegisterPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <RegisterForm />
        <Footer />
      </Suspense>
    </>
  );
};

export default RegisterPage;
