import styled from "styled-components";
export const MyContributionSection = styled.section``;
export const MyContributionDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const MyContributionDivWrapper = styled.div``;
export const MyContributionDivFlex = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const MyContributionFlexItems = styled.div`
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  width: 100%;
  text-align: center;
  border-right: 1px solid #111;
  &:nth-child(3) {
    border-right: none;
  }
`;
export const MyContributionFlexItem1 = styled.div`
  background: ${({ isActive }) => (isActive ? "lightgrey" : "none")};
  padding: 10px;
`;
export const MyContributionFlexItem2 = styled.div`
  background: ${({ isActive1 }) => (isActive1 ? "lightgrey" : "none")};
  padding: 10px;
`;
export const MyContributionFlexItem3 = styled.div`
  background: ${({ isActive2 }) => (isActive2 ? "lightgrey" : "none")};
  padding: 10px;
`;
export const MyContributionFlexItemTitle = styled.p``;
export const ContributionTitle = styled.h1`
  color: #111;
  opacity: 0.7;
  padding-bottom: 10px;
`;
