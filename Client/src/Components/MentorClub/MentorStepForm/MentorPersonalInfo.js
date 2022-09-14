import React from "react";
import {
  ErrorMessage,
  Field,
  Input,
  TextArea,
} from "./MentorRegisterStepELements";
import "rc-time-picker/assets/index.css";
const MentorPersonalInfo = ({
  formData,
  setFormData,
  errorData,
  setErrorData,
}) => {
  return (
    <>
      <Field>
        <Input
          onFocus={() => setErrorData({ ...errorData, firstName: "" })}
          value={formData.firstName}
          type="text"
          placeholder="Enter your Firstname"
          onChange={(event) =>
            setFormData({ ...formData, firstName: event.target.value })
          }
          required
        />
        <ErrorMessage>
          {!formData.firstName && errorData.firstName}
        </ErrorMessage>
      </Field>
      <Field>
        <Input
          onFocus={() => setErrorData({ ...errorData, lastName: "" })}
          value={formData.lastName}
          type="text"
          placeholder="Enter your Lastname"
          onChange={(event) =>
            setFormData({ ...formData, lastName: event.target.value })
          }
          required
        />
        <ErrorMessage>{!formData.lastName && errorData.lastName}</ErrorMessage>
      </Field>
      <Field>
        <TextArea
          onFocus={() => setErrorData({ ...errorData, bio: "" })}
          value={formData.bio}
          onChange={(event) =>
            setFormData({ ...formData, bio: event.target.value })
          }
          placeholder="Describe about yourself in brief words"
          required
        ></TextArea>
        <ErrorMessage>{errorData.bio}</ErrorMessage>
      </Field>
    </>
  );
};

export default MentorPersonalInfo;
