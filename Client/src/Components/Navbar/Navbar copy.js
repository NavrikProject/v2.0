import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import {
  LogoContainer,
  LogoImage,
  MenuBarContainer,
  MenuContainer,
  MenuItem,
  Nav,
  NavItem,
} from "./NavbarElements";
import logo from "../../images/practiwiz-logo.png";
import { useSelector } from "react-redux";
import CorporateTrainingMenu from "./CorporateTrainingMenu";
import IndividualTrainingMenu from "./IndividualTrainingMenu";
import LoginItems from "./LoginItems";

const Navbar = ({ toggleMenuItems }) => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Nav>
        <LogoContainer>
          {user?.type ? (
            <Link
              style={{ textDecoration: "none", color: "#062C30" }}
              to={`/${user?.type}`}
            >
              <LogoImage src={logo} alt="brand " />
            </Link>
          ) : (
            <Link style={{ textDecoration: "none", color: "#062C30" }} to={`/`}>
              <LogoImage src={logo} alt="brand " />
            </Link>
          )}
        </LogoContainer>
        <MenuContainer>
          <MenuItem>
            {/* redirect to home page */}
            <NavItem>
              <CorporateTrainingMenu />
            </NavItem>
            <NavItem>
              <IndividualTrainingMenu />
            </NavItem>
            <NavItem>
              <Link
                style={{ textDecoration: "none", color: "#062C30" }}
                to={`/mentor-club`}
              >
                Mentor Club
              </Link>
            </NavItem>
            <NavItem>
              <Link
                style={{ textDecoration: "none", color: "#062C30" }}
                to="/courses"
              >
                FAQ's
              </Link>
            </NavItem>
            <NavItem>
              <Link
                style={{ textDecoration: "none", color: "#062C30" }}
                to="/job-seeker"
              >
                Jobs
              </Link>
            </NavItem>
            <NavItem>
              <Link
                style={{ textDecoration: "none", color: "#062C30" }}
                to={`/resources`}
              >
                Resources
              </Link>
            </NavItem>
          </MenuItem>
        </MenuContainer>
        <MenuBarContainer onClick={toggleMenuItems}>
          <FaBars />
        </MenuBarContainer>
      </Nav>
    </>
  );
};
export default Navbar;
