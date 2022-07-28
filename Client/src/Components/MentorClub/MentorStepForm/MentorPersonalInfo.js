import React from "react";
import { Field, Input, TextArea } from "./MentorRegisterStepELements";
const MentorPersonalInfo = ({ formData, setFormData }) => {
  return (
    <>
      <Field>
        <Input
          value={formData.firstName}
          type="text"
          placeholder="Enter your Firstname"
          onChange={(event) =>
            setFormData({ ...formData, firstName: event.target.value })
          }
          required
        />
      </Field>
      <Field>
        <Input
          value={formData.lastName}
          type="text"
          placeholder="Enter your Lastname"
          onChange={(event) =>
            setFormData({ ...formData, lastName: event.target.value })
          }
          required
        />
      </Field>
      <Field>
        <TextArea
          value={formData.bio}
          onChange={(event) =>
            setFormData({ ...formData, bio: event.target.value })
          }
          placeholder="Describe about yourself in brief words"
          required
        ></TextArea>
      </Field>
    </>
  );
};

export default MentorPersonalInfo;
