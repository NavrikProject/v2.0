import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
export const DropDownContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #0d0d0d;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: all 0.5s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0%")};
  top: ${({ isOpen }) => (isOpen ? "0%" : "-100%")};
`;

export const CloseIcon = styled(FaTimes)`
  color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
`;
export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
`;
export const DropDownWrapper = styled.div``;
export const DropDownMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(7, 70px);
`;
export const DropDownLink = styled.li`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-in-out;
  list-style: none;
  cursor: pointer;
  font-size: 21px;
  font-weight: 500;
  &:hover {
    color: #01bf71;
    transition: all 0.4s ease-in-out;
  }
`;
