import React from "react";
import CookieConsent from "react-cookie-consent";
const CookieNotice = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept Cookies"
      cookieName="myAwesomeCookieName2"
      style={{
        background: "#2B373B",
        marginBottom: "20px",
      }}
      buttonStyle={{ color: "#4e503b", fontSize: "17px" }}
      expires={150}
    >
      This website uses cookies to enhance the user experience.
    </CookieConsent>
  );
};

export default CookieNotice;
