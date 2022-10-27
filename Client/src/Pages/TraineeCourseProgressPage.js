import React, { Suspense } from "react";
import TraineeCourseProgress from "../Components/Trainee/CourseProgress/TraineeCourseProgress";
import LoadingSpinner from "../Components/utils/LoadingSpinner";

const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));

const TraineeCourseProgressPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <TraineeCourseProgress />
      <Footer />
    </Suspense>
  );
};

export default TraineeCourseProgressPage;
