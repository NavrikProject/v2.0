import React from "react";
import { Link } from "react-router-dom";
import {
  Center,
  ContactItem,
  Desc,
  FooterSect,
  FooterSection,
  FooterText,
  FooterWrapper,
  IconSpan,
  Left,
  List,
  ListItem,
  Logo,
  Payment,
  Right,
  SocialContainer,
  SocialIcon,
  Title,
} from "./FooterElements";
import logo from "../../images/practiwiz-logo.png";
import PaymentImage from "../../images/payment.png";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      <FooterSect>
        <FooterSection>
          <FooterWrapper>
            <Left>
              <Logo src={logo} />
              <Desc>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don’t look even
                slightly believable.
              </Desc>
              <SocialContainer>
                <SocialIcon color="3B5999"></SocialIcon>
                <SocialIcon color="E4405F"></SocialIcon>
                <SocialIcon color="55ACEE"></SocialIcon>
                <SocialIcon color="E60023"></SocialIcon>
              </SocialContainer>
            </Left>
            <Center>
              <Title>Useful Links</Title>
              <List>
                <ListItem>
                  <Link
                    style={{ textDecoration: "none", color: "#111" }}
                    to="/"
                  >
                    Home
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    style={{ textDecoration: "none", color: "#111" }}
                    to="/our-methodology"
                  >
                    Our Methodology
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    style={{ textDecoration: "none", color: "#111" }}
                    to="/blogs"
                  >
                    Blogs
                  </Link>
                </ListItem>
                <ListItem>My learning</ListItem>
                <ListItem>My Wishlist</ListItem>
                <ListItem>
                  <Link
                    style={{ textDecoration: "none", color: "#111" }}
                    to={`/${user?.type}/profile/update/${user?.id}`}
                  >
                    My Account
                  </Link>
                </ListItem>
                <ListItem>Resume course</ListItem>
                <ListItem>Courses</ListItem>
                <ListItem>
                  <Link
                    to="/privacy"
                    style={{ textDecoration: "none", color: "#111" }}
                  >
                    Privacy & Policies
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    to="/terms-conditions"
                    style={{ textDecoration: "none", color: "#111" }}
                  >
                    Terms & Conditions
                  </Link>
                </ListItem>
              </List>
            </Center>
            <Right>
              <Title>Contact Us</Title>
              <ContactItem>
                <IconSpan>
                  <i className="fa-solid fa-location-dot"></i>
                </IconSpan>
                B 1/5 Safdarjung Enclave Africa Avenue New Delhi Pin-110029
              </ContactItem>
              <ContactItem>
                <IconSpan>
                  <i className="fas fa-phone"></i>
                </IconSpan>
                (120) 3569310
              </ContactItem>
              <ContactItem>
                <IconSpan>
                  <i className="fas fa-envelope"></i>
                </IconSpan>
                contact@practiwiz.com
              </ContactItem>
              <Payment src={PaymentImage} />
            </Right>
          </FooterWrapper>
          <FooterText>
            Practiwiz © 2022 | This site is developed by Navrik Team. All rights
            reserved.
          </FooterText>
        </FooterSection>
      </FooterSect>
    </>
  );
};

export default Footer;
