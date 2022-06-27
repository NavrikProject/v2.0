import React from "react";
import { Link, Navigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import {
  ContactButton,
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
import logo from "../../images/practi-logo.png";
import { useDispatch, useSelector } from "react-redux";
import CorporateTrainingMenu from "./CorporateTrainingMenu";
import IndividualTrainingMenu from "./IndividualTrainingMenu";
import { logOut } from "../../redux/userRedux";
const Navbar = ({ toggleMenuItems }) => {
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
          <NavItem> Contact Us</NavItem>
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
                to={`/mentors-club`}
              >
                Mentors Club
              </Link>
            </NavItem>
            <NavItem>
              <Link
                style={{ textDecoration: "none", color: "#062C30" }}
                to="/faq"
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
      </NavDiv>
      <Div1>
        <MenuItem>
          {user && (
            <>
              <NavItem>
                {user?.role === 1 && (
                  <Link
                    style={{ textDecoration: "none", color: "#062C30" }}
                    to={`/user/admin/dashboard`}
                  >
                    <i className="fa-solid fa-user"></i>Dashboard
                  </Link>
                )}
              </NavItem>
              <NavItem>
                <Link
                  style={{ textDecoration: "none", color: "#062C30" }}
                  to={`/${user?.type}/profile`}
                >
                  <i className="fa-solid fa-user"></i>Profile
                </Link>
              </NavItem>
            </>
          )}
          <NavItem>
            <ContactButton>
              <i className="fa-solid fa-phone"></i> +91 12345678
            </ContactButton>
          </NavItem>
        </MenuItem>
      </Div1>
    </NavSection>
  );
};
export default Navbar;
