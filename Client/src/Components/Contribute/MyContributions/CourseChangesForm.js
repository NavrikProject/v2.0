import React from "react";

import {
  CloseButton,
  CloseButtonDiv,
  ContributionButtonDiv,
  ContributionSubmitButton,
  Field,
  FormDiv,
} from "./CourseChangeElements";

const CourseChangesForm = (props) => {
  const courseChangeSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <CloseButtonDiv onClick={props.showModalHandler}>
        <CloseButton />
      </CloseButtonDiv>
      <FormDiv>
        <form onSubmit={courseChangeSubmitHandler}>
          <Field>
            <h1>Currently we are working on this process!</h1>
          </Field>
          <ContributionButtonDiv>
            <ContributionSubmitButton>Submit</ContributionSubmitButton>
          </ContributionButtonDiv>
        </form>
      </FormDiv>
    </div>
  );
};

export default CourseChangesForm;
