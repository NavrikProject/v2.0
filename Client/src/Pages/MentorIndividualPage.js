import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const MentorIndividual = React.lazy(() =>
  import("../Components/MentorClub/Individual/MentorIndividual.js")
);

const MentorIndividualPage = () => {
  const [socket, setSocket] = useState("");
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    setSocket(io("http://localhost:1100"));
  }, []);
  const userEmail = user?.email;
  useEffect(() => {
    socket && socket?.emit("newUser", userEmail);
  });
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes socket={socket} />
        <MentorIndividual socket={socket} />
        <Footer />
      </Suspense>
    </>
  );
};

export default MentorIndividualPage;
