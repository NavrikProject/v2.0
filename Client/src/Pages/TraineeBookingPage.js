import React, { Suspense } from "react";
import TraineeSessionDetails from "../Components/Trainee/TraineeSessionDetails";
import LoadingSpinner from "../Components/utils/LoadingSpinner";

const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));

const TraineeBookingPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <TraineeSessionDetails />
        {/* <TraineeBookingTable /> */}
        <Footer />
      </Suspense>
    </>
  );
};

export default TraineeBookingPage;
