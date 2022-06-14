import styled from "styled-components";
export const FooterSect = styled.section`
  height: auto;
  /* //background: linear-gradient(
    60deg,
    rgba(0, 172, 193, 1) 0%,
    rgba(84, 58, 183, 1) 100%
  );  */
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(245, 245, 245, 1) 32%,
    rgba(224, 251, 252, 1) 100%
  );
  width: 100%;
`;
export const FooterSection = styled.section`
  width: 90%;
  margin: 0 auto;
  padding: 50px 0px 30px 0px;
`;
export const FooterWrapper = styled.div`
  display: flex;
  @media only screen and (max-width: 968px) {
    display: block;
  }
`;
// page title

export const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
export const Logo = styled.img`
  width: 250px;
  height: 120px;
  cursor: pointer;
`;

export const Desc = styled.p`
  margin: 20px 0px;
  color: #111;
`;

export const SocialContainer = styled.div`
  display: flex;
`;

export const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;

export const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

export const Title = styled.h3`
  margin-bottom: 30px;
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

export const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
  color: #111;
`;

export const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

export const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  color: #111;
`;
export const IconSpan = styled.span`
  padding-right: 10px;
  font-size: 18px;
`;
export const Payment = styled.img`
  width: 50%;
`;
export const FooterText = styled.p`
  text-align: center;
  color: #111;
`;
export const SpaceDiv = styled.div`
  width: 100%;
  height: 80px;
`;
