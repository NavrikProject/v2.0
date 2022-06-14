import React, { Suspense } from "react";
//import RpaCoe from "../Components/COE/RpaCoe";
// import Footer from "../Components/Footer/Footer";
// import NavbarRes from "../Components/Navbar/NavbarRes";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const RpaCoe = React.lazy(() => import("../Components/COE/RpaCoe"));
const RpaCoePage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <RpaCoe />
        <Footer />
      </Suspense>
    </>
  );
};

export default RpaCoePage;
