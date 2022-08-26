import React from "react";
import { mentorSkills } from "../../Data/MentorData";
import {
  ErrorMessage,
  Field,
  FormOption,
  FormSelect,
  Input,
} from "./MentorRegisterStepELements";
const MentorExpDetails = ({
  formData,
  setFormData,
  errorData,
  setErrorData,
}) => {
  return (
    <>
      <Field>
        <FormSelect
          onFocus={() => setErrorData({ ...errorData, experience: "" })}
          required
          value={formData.experience}
          name="experience"
          onChange={(event) =>
            setFormData({ ...formData, experience: event.target.value })
          }
        >
          <FormOption value="">Choose your experience</FormOption>
          <FormOption value="0">0</FormOption>
          <FormOption value="1">1</FormOption>
          <FormOption value="2">2</FormOption>
          <FormOption value="3">3</FormOption>
          <FormOption value="4">4</FormOption>
          <FormOption value="5">5</FormOption>
        </FormSelect>
        <ErrorMessage>{errorData.experience}</ErrorMessage>
      </Field>
      <Field>
        <FormSelect
          required
          name="skills"
          value={formData.skills}
          onChange={(event) =>
            setFormData({ ...formData, skills: event.target.value })
          }
          onFocus={() => setErrorData({ ...errorData, skills: "" })}
        >
          <FormOption value="">Choose your skill</FormOption>
          {mentorSkills.map((skill) => (
            <FormOption key={skill.id} value={skill.skills}>
              {skill.skills}
            </FormOption>
          ))}
        </FormSelect>
        <ErrorMessage>{errorData.skills}</ErrorMessage>
      </Field>
      <Field>
        <FormSelect
          required
          value={formData.specialty}
          name="specialty"
          onChange={(event) =>
            setFormData({ ...formData, specialty: event.target.value })
          }
          onFocus={() => setErrorData({ ...errorData, specialty: "" })}
        >
          <FormOption value="">Choose a below option</FormOption>
          <FormOption value="software-development">
            Software Development
          </FormOption>
          <FormOption value="business-management">
            Business Management
          </FormOption>
          <FormOption value="rpa">RPA</FormOption>
          <FormOption value="commerce">Commerce</FormOption>
        </FormSelect>
        <ErrorMessage>{errorData.specialty}</ErrorMessage>
      </Field>
      <Field>
        <Input
          value={formData.firm}
          type="text"
          placeholder="Enter your Current Company name"
          onChange={(event) =>
            setFormData({ ...formData, firm: event.target.value })
          }
          required
          onFocus={() => setErrorData({ ...errorData, firm: "" })}
        />
        {<ErrorMessage>{errorData.firm}</ErrorMessage>}
      </Field>
      <Field>
        <Input
          value={formData.currentRole}
          type="text"
          placeholder="Enter your Role"
          onChange={(event) =>
            setFormData({ ...formData, currentRole: event.target.value })
          }
          required
          onFocus={() => setErrorData({ ...errorData, currentRole: "" })}
        />
        {<ErrorMessage>{errorData.currentRole}</ErrorMessage>}
      </Field>
      <Field>
        <Input
          value={formData.previousRole}
          type="text"
          placeholder="Enter your previous Role"
          onChange={(event) =>
            setFormData({ ...formData, previousRole: event.target.value })
          }
          required
          onFocus={() => setErrorData({ ...errorData, previousRole: "" })}
        />
        {<ErrorMessage>{errorData.previousRole}</ErrorMessage>}
      </Field>
    </>
  );
};

export default MentorExpDetails;
