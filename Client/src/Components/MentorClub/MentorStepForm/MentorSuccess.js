import React from "react";
import {
  AdditionalButton,
  MentorSuccessDiv,
  MentorSuccessDivFlex,
  MentorSuccessSection,
} from "./MentorSuccessElelments";
import { Link } from "react-router-dom";
const MentorSuccess = () => {
  return (
    <MentorSuccessSection>
      <MentorSuccessDiv>
        <MentorSuccessDivFlex>
          <div>
            <h1>You have successfully completed the registration.</h1>
          </div>
          <AdditionalButton>
            <Link
              to="/mentor/add-details"
              style={{ textDecoration: "none", color: "white" }}
            >
              Fill the Mentor Application
            </Link>
          </AdditionalButton>
          <p>
            *It takes only few minutes to complete the mentor application
            registration.
          </p>
        </MentorSuccessDivFlex>
      </MentorSuccessDiv>
    </MentorSuccessSection>
  );
};

export default MentorSuccess;
