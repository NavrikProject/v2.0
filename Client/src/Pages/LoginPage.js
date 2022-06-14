import React, { Suspense } from "react";
// import NavbarRes from "../Components/Navbar/NavbarRes";
// import Footer from "../Components/Footer/Footer";
//import LoginForm from "../Components/Forms/LoginForm/LoginForm";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const LoginForm = React.lazy(() =>
  import("../Components/Forms/LoginForm/LoginForm")
);
const LoginPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <LoginForm />
        <Footer />
      </Suspense>
    </>
  );
};

export default LoginPage;
