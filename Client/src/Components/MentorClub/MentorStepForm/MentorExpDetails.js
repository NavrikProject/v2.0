import React from "react";
import { mentorSkills } from "../../Data/MentorData";
import {
  Field,
  FormOption,
  FormSelect,
  Input,
} from "./MentorRegisterStepELements";
const MentorExpDetails = ({ formData, setFormData }) => {
  return (
    <>
      <Field>
        <FormSelect
          required
          name="experience"
          onChange={(event) =>
            setFormData({ ...formData, experience: event.target.value })
          }
        >
          <FormOption>Choose your experience</FormOption>
          <FormOption value="0">0</FormOption>
          <FormOption value="1">1</FormOption>
          <FormOption value="2">2</FormOption>
          <FormOption value="3">3</FormOption>
          <FormOption value="4">4</FormOption>
          <FormOption value="5">5</FormOption>
        </FormSelect>
      </Field>
      <Field>
        <FormSelect
          required
          name="skills"
          onChange={(event) =>
            setFormData({ ...formData, skills: event.target.value })
          }
        >
          <FormOption>Choose your skill</FormOption>
          {mentorSkills.map((skill) => (
            <FormOption key={skill.id} value={skill.skills}>
              {skill.skills}
            </FormOption>
          ))}
        </FormSelect>
      </Field>
      <Field>
        <FormSelect
          required
          name="specialty"
          onChange={(event) =>
            setFormData({ ...formData, specialty: event.target.value })
          }
        >
          <FormOption>Choose a below option</FormOption>
          <FormOption value="software-development">
            Software Development
          </FormOption>
          <FormOption value="business-management">
            Business Management
          </FormOption>
          <FormOption value="rpa">RPA</FormOption>
          <FormOption value="commerce">Commerce</FormOption>
        </FormSelect>
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
        />
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
        />
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
        />
      </Field>
    </>
  );
};

export default MentorExpDetails;
