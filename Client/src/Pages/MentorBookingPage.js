import React, { Suspense } from "react";
import MentorSessionDetails from "../Components/MentorClub/Sessions/MentorSessionDetails";
import LoadingSpinner from "../Components/utils/LoadingSpinner";

const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const MentorBookingTable = React.lazy(() =>
  import("../Components/MentorClub/MentorProfile/MentorBookingTable.js")
);
const MentorBookingPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        {/* <MentorBookingTable /> */}
        <MentorSessionDetails />
        <Footer />
      </Suspense>
    </>
  );
};

export default MentorBookingPage;
