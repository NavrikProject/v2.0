import React, { Suspense } from "react";
import AdminPanel from "../Components/Admin/AdminPanel";

import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));

const AdminPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NavbarRes />
      <AdminPanel />
      <Footer />
    </Suspense>
  );
};

export default AdminPage;
