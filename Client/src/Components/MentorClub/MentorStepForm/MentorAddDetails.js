import React from "react";
import { Field, Input } from "./MentorRegisterStepELements";

const MentorAddDetails = ({ formData, setFormData, setImage }) => {
  return (
    <>
      <Field>
        <Input
          value={formData.website}
          type="text"
          placeholder="Your website address"
          onChange={(event) =>
            setFormData({ ...formData, website: event.target.value })
          }
        />
      </Field>
      <Field>
        <Input
          value={formData.linkedInProfile}
          type="text"
          placeholder="Your linkedin address"
          onChange={(event) =>
            setFormData({ ...formData, linkedInProfile: event.target.value })
          }
        />
      </Field>
      <Field>
        <Input
          type="file"
          name="image"
          placeholder="Choose the profile picture"
          onChange={(event) => setImage(event.target.files[0])}
        />
      </Field>
    </>
  );
};

export default MentorAddDetails;
