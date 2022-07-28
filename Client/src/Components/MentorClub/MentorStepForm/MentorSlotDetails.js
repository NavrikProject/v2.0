import React from "react";
import { mentorshipAreas } from "../../Data/MentorData";
import {
  Field,
  FormOption,
  FormSelect,
  Input,
} from "./MentorRegisterStepELements";

const MentorSlotDetails = ({ formData, setFormData }) => {
  return (
    <>
      <Field>
        <FormSelect
          required
          name="mentorshipArea"
          onChange={(event) =>
            setFormData({ ...formData, mentorshipArea: event.target.value })
          }
        >
          <FormOption>Choose Mentorship Area</FormOption>
          {mentorshipAreas.map((mentorArea) => (
            <FormOption key={mentorArea.id} value={mentorArea.area}>
              {mentorArea.area}
            </FormOption>
          ))}
        </FormSelect>
      </Field>
      <Field>
        <FormSelect
          name="availability"
          required
          onChange={(event) =>
            setFormData({ ...formData, mentorAvailability: event.target.value })
          }
        >
          <FormOption>Choose availability</FormOption>
          <FormOption value="weekdays">Week Days</FormOption>
          <FormOption value="weekends">
            Weekends(Saturday and Sunday)
          </FormOption>
          <FormOption value="saturday">Saturday</FormOption>
          <FormOption value="sunday">Sunday</FormOption>
        </FormSelect>
      </Field>
      <Field>
        <p>Choose the Time Slots (Minimum 60 minutes)</p>
        From:
        <Input
          value={formData.startTime}
          required
          type="time"
          min="1"
          step="1800"
          onChange={(event) =>
            setFormData({ ...formData, startTime: event.target.value })
          }
        />
        <br /> To:
        <Input
          value={formData.endTime}
          required
          type="time"
          step="1800"
          onChange={(event) =>
            setFormData({ ...formData, endTime: event.target.value })
          }
        />
      </Field>
    </>
  );
};

export default MentorSlotDetails;
