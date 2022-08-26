import React from "react";
import { mentorshipAreas } from "../../Data/MentorData";
import {
  ErrorMessage,
  Field,
  FormOption,
  FormSelect,
  Input,
} from "./MentorRegisterStepELements";

const MentorSlotDetails = ({
  formData,
  setFormData,
  errorData,
  setErrorData,
}) => {
  return (
    <>
      <Field>
        <FormSelect
          value={formData.mentorshipArea}
          onFocus={() => setErrorData({ ...errorData, mentorshipArea: "" })}
          required
          name="mentorshipArea"
          onChange={(event) =>
            setFormData({ ...formData, mentorshipArea: event.target.value })
          }
        >
          <FormOption value="">Choose Mentorship Area</FormOption>
          {mentorshipAreas.map((mentorArea) => (
            <FormOption key={mentorArea.id} value={mentorArea.area}>
              {mentorArea.area}
            </FormOption>
          ))}
        </FormSelect>
        <ErrorMessage>{errorData.mentorshipArea}</ErrorMessage>
      </Field>
      <Field>
        <FormSelect
          value={FormData.mentorAvailability}
          onFocus={() => setErrorData({ ...errorData, mentorAvailability: "" })}
          name="availability"
          required
          onChange={(event) =>
            setFormData({ ...formData, mentorAvailability: event.target.value })
          }
        >
          <FormOption value="">Choose availability</FormOption>
          <FormOption value="weekdays">Week Days</FormOption>
          <FormOption value="weekends">
            Weekends(Saturday and Sunday)
          </FormOption>
          <FormOption value="saturday">Saturday</FormOption>
          <FormOption value="sunday">Sunday</FormOption>
        </FormSelect>
        <ErrorMessage>{errorData.mentorAvailability}</ErrorMessage>
      </Field>
      <Field>
        <p>
          Choose the Time Slots (Minimum 60min Ex: 12:00 to 13:00 OR 12:30 to
          13:30)
        </p>
        From:
        <Input
          onFocus={() => setErrorData({ ...errorData, startTime: "" })}
          value={formData.startTime}
          required
          type="time"
          min="1"
          step="1800"
          onChange={(event) =>
            setFormData({ ...formData, startTime: event.target.value })
          }
        />
        <ErrorMessage>{errorData.startTime}</ErrorMessage>
        <br /> To:
        <Input
          onFocus={() => setErrorData({ ...errorData, endTime: "" })}
          value={formData.endTime}
          required
          type="time"
          step="1800"
          onChange={(event) =>
            setFormData({ ...formData, endTime: event.target.value })
          }
        />
        <ErrorMessage>{errorData.endTime}</ErrorMessage>
      </Field>
    </>
  );
};

export default MentorSlotDetails;
