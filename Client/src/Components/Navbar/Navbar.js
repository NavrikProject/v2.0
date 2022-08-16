import React from "react";
import { Link, Navigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import {
  Div1,
  LogoContainer,
  LogoImage,
  MenuBarContainer,
  MenuContainer,
  MenuItem,
  NavDiv,
  NavItem,
  NavSection,
} from "./NavbarElements";
import logo from "../../images/practiwiz-logo.png";
import { useDispatch, useSelector } from "react-redux";
import CorporateTrainingMenu from "./CorporateTrainingMenu";
import IndividualTrainingMenu from "./IndividualTrainingMenu";
import { logOut } from "../../redux/userRedux";
import NavbarProfile from "./NavbarProfile";
const Navbar = ({ toggleMenuItems, socket }) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const onLogoutHandler = async () => {
    dispatch(logOut());
    Navigate("/");
  };

  return (
    <NavSection>
      <Div1>
        <MenuItem>
          {!user ? (
            <>
              <NavItem>
                <Link
                  style={{ textDecoration: "none", color: "#062C30" }}
                  to={`/login`}
                >
                  Login
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  style={{ textDecoration: "none", color: "#062C30" }}
                  to={`/register`}
                >
                  Register
                </Link>
              </NavItem>
            </>
          ) : (
            <NavItem onClick={onLogoutHandler}>
              <Link
                style={{ textDecoration: "none", color: "#062C30" }}
                to={`/login`}
              >
                Logout
              </Link>
            </NavItem>
          )}
          <NavItem>
            <Link
              style={{ textDecoration: "none", color: "#062C30" }}
              to={`/contributers-corner`}
            >
              Contribute Corner
            </Link>
          </NavItem>
          {/*<NavItem> Contact Us</NavItem>
           <ContactButton>
            <i className="fa-solid fa-phone"></i> +91 12345678
          </ContactButton> */}
        </MenuItem>
      </Div1>
      <NavDiv>
        <LogoContainer>
          {user?.type ? (
            <Link style={{ textDecoration: "none", color: "#062C30" }} to={`/`}>
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
                to="/professionals"
              >
                For Professionals
              </Link>
            </NavItem>
            <NavItem>
              <Link
                style={{ textDecoration: "none", color: "#062C30" }}
                to={`/mentors-club`}
              >
                Mentors Club
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
            {/* <NavItem>
              <Link
                style={{ textDecoration: "none", color: "#062C30" }}
                to={`/resources`}
              >
                Resources
              </Link>
            </NavItem> */}
            {user && (
              <>
                <NavItem>
                  <NavbarProfile onLogoutHandler={onLogoutHandler} />
                </NavItem>
              </>
            )}
          </MenuItem>
        </MenuContainer>
        <MenuBarContainer onClick={toggleMenuItems}>
          {user && (
            <NavItem>
              <NavbarProfile />
            </NavItem>
          )}
          <FaBars />
        </MenuBarContainer>
      </NavDiv>
    </NavSection>
  );
};
export default Navbar;
