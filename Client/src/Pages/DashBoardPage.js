import React, { Suspense } from "react";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const Dashboard = React.lazy(() => import("../Components/Dashboard/Dashboard"));

const DashBoardPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Dashboard />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </>
  );
};

export default DashBoardPage;
