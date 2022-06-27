import React, { Suspense } from "react";
import LoadingSpinner from "../Components/utils/LoadingSpinner";

const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const TraineeBookingTable = React.lazy(() =>
  import("../Components/Trainee/TraineeBookingTable")
);
const TraineeBookingPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <TraineeBookingTable />
        <Footer />
      </Suspense>
    </>
  );
};

export default TraineeBookingPage;
