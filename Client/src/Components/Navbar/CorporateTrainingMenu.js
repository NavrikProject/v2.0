import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ContainerDiv = styled.div`
  position: relative;
  i {
    margin-left: 5px;
  }
`;

const SubmenuList = styled.ul`
  position: absolute;
  top: 30px;
  left: 30px;
  width: 300px;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;
const SubmenuListItem = styled.li`
  list-style-type: none;
  padding: 10px 20px;
  font-size: 17px;
  &:hover {
    background-color: #f2f2f2;
  }
`;
const CorporateTrainingMenu = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <ContainerDiv>
      <p onClick={(e) => setIsActive(!isActive)}>
        Corporate Training
        {isActive ? (
          <i className="fa-solid fa-angle-up"></i>
        ) : (
          <i className="fa-solid fa-angle-down"></i>
        )}
      </p>
      {isActive && (
        <SubmenuList onMouseLeave={(e) => setIsActive(false)}>
          <SubmenuListItem>
            <Link
              style={{ textDecoration: "none", color: "#062C30" }}
              to="/training/rpa-coe"
            >
              IMPLEMENTING RPA COE AT CORPORATE
            </Link>
          </SubmenuListItem>
          <SubmenuListItem>
            <Link
              style={{ textDecoration: "none", color: "#062C30" }}
              to="/training/managers"
            >
              RPA FOR MANAGERS
            </Link>
          </SubmenuListItem>{" "}
          <SubmenuListItem>
            <Link
              style={{ textDecoration: "none", color: "#062C30" }}
              to="/training/developer"
            >
              RPA DEVELOPER BASICS PRACTICAL
            </Link>
          </SubmenuListItem>
        </SubmenuList>
      )}
    </ContainerDiv>
  );
};

export default CorporateTrainingMenu;
