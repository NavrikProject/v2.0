import React from "react";
import { mentorshipAreas } from "../../Data/MentorData";
import {
  ErrorMessage,
  Field,
  FormOption,
  FormSelect,
 
} from "./MentorRegisterStepELements";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

const MentorSlotDetails = ({
  formData,
  setFormData,
  errorData,
  setErrorData,
  endTime,
  setEndTime,
}) => {
  const showSecond = false;
  const str = showSecond ? "HH:mm:ss" : "HH:mm";

  function disabledHours() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 23];
  }

  function generateOptions(length, excludedOptions) {
    const arr = [];
    for (let value = 0; value < length; value++) {
      if (excludedOptions.indexOf(value) < 0) {
        arr.push(value);
      }
    }
    return arr;
  }

  function disabledMinutes(h) {
    switch (h) {
      case 9:
        return generateOptions(60, [30]);
      case 21:
        return generateOptions(60, [0]);
      default:
        return generateOptions(60, [0, 15, 30, 45]);
    }
  }
  function disabledSeconds(h, m) {
    return [h + (m % 60)];
  }
  function onChangeValue(value) {
    let startTime = value?.format(str);
    let minutes = startTime?.split(":")[1];
    if (minutes === "00" || minutes === "15") {
      let hour = startTime?.split(":")[0];
      minutes = parseInt(minutes) + 30;
      minutes = minutes.toString();
      let newTime = `${hour}:${minutes.toString()}`;
      setEndTime(newTime);
      setFormData({ ...formData, endTime: newTime });
    } else if (minutes === "30") {
      let hour = startTime?.split(":")[0];
      hour = parseInt(hour) + 1;
      minutes = "00";
      let endTime = hour + ":" + minutes;
      let newTime = `${hour}:${minutes.toString()}`;
      setEndTime(newTime);
      setFormData({ ...formData, endTime: endTime });
    } else {
      let hour = startTime?.split(":")[0];
      hour = parseInt(hour) + 1;
      minutes = "15";
      let endTime = hour + ":" + minutes;
      let newTime = `${hour}:${minutes.toString()}`;
      setEndTime(newTime);
      setFormData({ ...formData, endTime: endTime });
    }
    setFormData({ ...formData, startTime: startTime });
  }
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
      {/* <Field>
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
      </Field> */}
      <Field>
        <p>Choose the Time Slots (Ex: 12:15 OR 12:30 OR 12:45 )</p>
        From
        <TimePicker
          showSecond={showSecond}
          className="xxx"
          onChange={onChangeValue}
          disabledMinutes={disabledMinutes}
          disabledSeconds={disabledSeconds}
          disabledHours={disabledHours}
        />
        <p>
          Your slot timings {formData?.startTime} to {endTime}
        </p>
      </Field>
    </>
  );
};

export default MentorSlotDetails;
