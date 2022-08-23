import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { NavItemProfile } from "./NavbarElements";
import { useSelector } from "react-redux";

const ContainerDiv = styled.div`
  position: relative;
`;

const SubmenuList = styled.ul`
  position: absolute;
  top: 40px;
  right: -90px;
  width: 300px;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  span {
    margin-right: 10px;
  }
`;
const SubmenuListItem = styled.li`
  list-style-type: none;
  padding: 10px 20px;
  font-size: 18px;
  &:hover {
    background-color: #f2f2f2;
  }
`;
const NotificationDiv = styled.div`
  position: relative;
  display: inline-block;
`;
const Notifications = styled.div`
  top: 5px;
  right: 8px;
  position: absolute;
  width: 8px;
  z-index: 10;
  height: 8px;
  border-radius: 50%;
  background-color: red;
`;
const NavbarProfile = (props) => {
  const [isActive, setIsActive] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  return (
    <ContainerDiv
      onMouseEnter={(e) => setIsActive(!isActive)}
      onMouseLeave={(e) => setIsActive(!isActive)}
    >
      <NavItemProfile>
        <Link style={{ textDecoration: "none", color: "#062C30" }} to={`/`}>
          {user?.firstname.charAt(0).toUpperCase() +
            user?.lastname.charAt(0).toUpperCase()}
        </Link>
      </NavItemProfile>
      {isActive && (
        <SubmenuList onMouseLeave={(e) => setIsActive(false)}>
          {user && (
            <>
              <SubmenuListItem>
                <NotificationDiv>
                  <Notifications></Notifications>
                  <span>
                    <i className="fa-solid fa-bell"></i>
                  </span>
                </NotificationDiv>
                Notifications
              </SubmenuListItem>
              {user?.role === 1 && (
                <SubmenuListItem>
                  <Link
                    style={{ textDecoration: "none", color: "#062C30" }}
                    to={`/user/admin/dashboard`}
                  >
                    <span>
                      <i className="fa-solid fa-chart-area"></i>
                    </span>
                    Dashboard
                  </Link>
                </SubmenuListItem>
              )}
              {user?.type === "trainee" && (
                <SubmenuListItem>
                  <Link
                    style={{ textDecoration: "none", color: "#062C30" }}
                    to={`/${user?.type}/profile/bookings`}
                  >
                    <span>
                      <i className="fa-solid fa-calendar-check"></i>
                    </span>
                    My Bookings
                  </Link>
                </SubmenuListItem>
              )}
              {user?.type === "mentor" && (
                <SubmenuListItem>
                  <Link
                    style={{ textDecoration: "none", color: "#062C30" }}
                    to={`/${user?.type}/profile/bookings`}
                  >
                    <span>
                      <i className="fa-solid fa-calendar-check"></i>
                    </span>
                    My Bookings
                  </Link>
                </SubmenuListItem>
              )}
              {user?.type === "contributer" && (
                <>
                  <SubmenuListItem>
                    <Link
                      style={{ textDecoration: "none", color: "#062C30" }}
                      to={`/${user?.type}/apply-for-contribution`}
                    >
                      Apply for contribution
                    </Link>
                  </SubmenuListItem>
                  <SubmenuListItem>
                    <Link
                      style={{ textDecoration: "none", color: "#062C30" }}
                      to={`/${user?.type}/my-contribution`}
                    >
                      My Contributions
                    </Link>
                  </SubmenuListItem>
                </>
              )}
              <SubmenuListItem>
                <Link
                  style={{ textDecoration: "none", color: "#062C30" }}
                  to={`/${user?.type}/profile`}
                >
                  <span>
                    <i className="fa-solid fa-user"></i>
                  </span>
                  Profile
                </Link>
              </SubmenuListItem>
              <SubmenuListItem onClick={props.onLogoutHandler}>
                <Link
                  style={{ textDecoration: "none", color: "#062C30" }}
                  to={`/login`}
                >
                  Logout
                </Link>
              </SubmenuListItem>
            </>
          )}
        </SubmenuList>
      )}
    </ContainerDiv>
  );
};

export default NavbarProfile;
