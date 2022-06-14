import React, { Suspense } from "react";

//import Faq from "../Components/Faq/Faq";
//import Footer from "../Components/Footer/Footer";
//import NavbarRes from "../Components/Navbar/NavbarRes";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));

const Faq = React.lazy(() => import("../Components/Faq/Faq.js"));
const FaqPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <Faq />
        <Footer />
      </Suspense>
    </>
  );
};

export default FaqPage;
