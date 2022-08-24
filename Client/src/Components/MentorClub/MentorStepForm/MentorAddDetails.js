import React from "react";
import { Field, Input } from "./MentorRegisterStepELements";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const MentorAddDetails = ({ formData, setFormData, setImage }) => {
  return (
    <>
      <Field>
        <PhoneInput2
          country="in"
          inputStyle={{ width: "100%", padding: "5px 10px" }}
          onChange={(event) =>
            setFormData({ ...formData, phoneNumber: event.target.value })
          }
        />
      </Field>
      <Field>
        <Input
          required
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
          required
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
          required
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
