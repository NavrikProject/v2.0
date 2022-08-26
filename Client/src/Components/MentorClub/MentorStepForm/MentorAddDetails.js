import React from "react";
import { ErrorMessage, Field, Input } from "./MentorRegisterStepELements";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const MentorAddDetails = ({
  formData,
  setFormData,
  setImage,
  errorData,
  setErrorData,
  phoneNumber,
  setPhoneNumber,
}) => {
  return (
    <>
      <Field>
        <PhoneInput2
          value={phoneNumber}
          country="in"
          inputStyle={{ width: "100%", padding: "5px 10px" }}
          onChange={(phone) => setPhoneNumber(phone)}
        />
      </Field>
      <Field>
        <Input
          onFocus={() => setErrorData({ ...errorData, website: "" })}
          required
          value={formData.website}
          type="text"
          placeholder="Your website address"
          onChange={(event) =>
            setFormData({ ...formData, website: event.target.value })
          }
        />{" "}
        <ErrorMessage>{errorData.website}</ErrorMessage>
      </Field>
      <Field>
        <Input
          onFocus={() => setErrorData({ ...errorData, linkedInProfile: "" })}
          required
          value={formData.linkedInProfile}
          type="text"
          placeholder="Your linkedin address"
          onChange={(event) =>
            setFormData({ ...formData, linkedInProfile: event.target.value })
          }
        />
        <ErrorMessage>{errorData.linkedInProfile}</ErrorMessage>
      </Field>
      <Field>
        <Input
          onFocus={() => setErrorData({ ...errorData, linkedInProfile: "" })}
          required
          type="file"
          name="image"
          placeholder="Choose the profile picture"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <ErrorMessage>{errorData.image}</ErrorMessage>
      </Field>
    </>
  );
};

export default MentorAddDetails;
