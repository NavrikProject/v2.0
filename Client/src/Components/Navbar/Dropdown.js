import React from "react";
import {
  CloseIcon,
  DropDownContainer,
  DropDownLink,
  DropDownMenu,
  DropDownWrapper,
  Icon,
} from "./DropdownElements";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Dropdown = ({ isOpen, toggleMenuItems }) => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <DropDownContainer isOpen={isOpen} onClick={toggleMenuItems}>
      <Icon toggleMenuItems={toggleMenuItems}>
        <CloseIcon>
          <FaTimes />
        </CloseIcon>
      </Icon>
      <DropDownWrapper>
        <DropDownMenu>
          <DropDownLink>
            {user?.type ? (
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/${user?.type}`}
              >
                Home
              </Link>
            ) : (
              <Link style={{ textDecoration: "none", color: "white" }} to={`/`}>
                Home
              </Link>
            )}
          </DropDownLink>
          <DropDownLink>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/about`}
            >
              About us
            </Link>
          </DropDownLink>
          <DropDownLink>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/courses"
            >
              Courses
            </Link>
          </DropDownLink>
          <DropDownLink>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/trainers"
            >
              Trainers
            </Link>
          </DropDownLink>
          <DropDownLink>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/job-seeker"
            >
              Jobs
            </Link>
          </DropDownLink>
          <DropDownLink>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/recruiter"
            >
              Recruiter
            </Link>
          </DropDownLink>
          <DropDownLink>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/register`}
            >
              Register
            </Link>
          </DropDownLink>
        </DropDownMenu>
      </DropDownWrapper>
    </DropDownContainer>
  );
};

export default Dropdown;
