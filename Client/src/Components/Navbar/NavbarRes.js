import React, { useState } from "react";
import Navbar from "./Navbar";
import Dropdown from "./Dropdown";
const NavbarRes = ({ socket }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenuItems = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar socket={socket} toggleMenuItems={toggleMenuItems} />
      <Dropdown isOpen={isOpen} toggleMenuItems={toggleMenuItems} />
    </>
  );
};

export default NavbarRes;
