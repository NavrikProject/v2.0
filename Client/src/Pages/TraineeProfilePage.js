import React, { Suspense } from "react";
import LoadingSpinner from "../Components/utils/LoadingSpinner";

const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const TraineeProfile = React.lazy(() =>
  import("../Components/Trainee/TraineeProfile")
);

const TraineeProfilePage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <TraineeProfile />
        <Footer />
      </Suspense>{" "}
    </>
  );
};

export default TraineeProfilePage;
