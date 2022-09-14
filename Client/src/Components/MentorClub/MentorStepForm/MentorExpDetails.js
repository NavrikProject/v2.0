import axios from "axios";
import React, { useEffect, useState } from "react";
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
  const [skills, setSkills] = useState([]);
  const [showOthersInput, setShowOthersInput] = useState(false);
  useEffect(() => {
    const getSkillsData = async () => {
      const res = await axios.get(
        `/get/skills/master?name=${formData?.specialty}`
      );
      setSkills(res.data);
    };
    getSkillsData();
  }, [formData.specialty]);

  const formSkillHandler = (event) => {
    if (event.target.value === "others") {
      setShowOthersInput(true);
    } else {
      setShowOthersInput(false);
    }
    setFormData({ ...formData, skills: event.target.value });
  };
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
          <FormOption value="0-5">7- 10</FormOption>
          <FormOption value="5-10">10-15</FormOption>
          <FormOption value="15-20">15-20</FormOption>
          <FormOption value="20-25">20-25</FormOption>
          <FormOption value="25+">25+</FormOption>
        </FormSelect>
        <ErrorMessage>{errorData.experience}</ErrorMessage>
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
          <FormOption value="">Choose a Skills Category</FormOption>
          <FormOption value="technology">Technology</FormOption>
          <FormOption value="domain">Domain</FormOption>
          <FormOption value="business-skills">Business skills</FormOption>
        </FormSelect>
        <ErrorMessage>{errorData.specialty}</ErrorMessage>
      </Field>
      <Field>
        <FormSelect
          required
          name="skills"
          value={formData.skills}
          onChange={(event) => formSkillHandler(event)}
          onFocus={() => setErrorData({ ...errorData, skills: "" })}
        >
          <FormOption value="">Choose your skill</FormOption>
          {skills?.map((skill) => (
            <FormOption
              key={skill.skill_master_id}
              value={skill.skill_master_skill_name}
            >
              {skill.skill_master_skill_name}
            </FormOption>
          ))}
          <FormOption value="others">Others</FormOption>
        </FormSelect>
        <ErrorMessage>{errorData.skills}</ErrorMessage>
      </Field>
      {showOthersInput && (
        <Field>
          <Input
            value={formData.otherSkills}
            name="skills"
            type="text"
            placeholder="Enter your other skills"
            onChange={(event) =>
              setFormData({ ...formData, otherSkills: event.target.value })
            }
            required
          />
        </Field>
      )}
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
