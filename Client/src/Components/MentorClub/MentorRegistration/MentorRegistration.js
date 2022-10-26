import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import GoToTop from "../../GoToTop";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  MentorRegisterDiv,
  MentorRegisterSection,
  FormDivFlex,
  Form,
  FormDiv,
  Field,
  Input,
  PwdField,
  PwdIcons,
  ShowIcon,
  HideIcon,
  SignUpButton,
  TextArea,
  FormSelect,
  FormOption,
  MentorRegisterDiv1,
  ErrorMessage,
} from "./MentorRegistrationElements.js";
import "./MentorRegistration.css";
import Loading from "../../utils/LoadingSpinner";
import { mentorshipAreas } from "../../Data/MentorData";
import { useForm } from "react-hook-form";
const MentorRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm();
  const [speciality, setSpeciality] = useState();
  const [skillsSet, setSkillsSet] = useState([]);
  const [showOthersInput, setShowOthersInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [skills, setSkills] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const formSkillHandler = (event) => {
    if (event.target.value === "Others") {
      setShowOthersInput(true);
      setSkills(event.target.value);
    } else {
      setSkills(event.target.value);
      setShowOthersInput(false);
    }
  };
  const [image, setImage] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSkillsData = async () => {
      const res = await axios.get(`/get/skills/master?name=${speciality}`);
      setSkillsSet(res.data);
    };
    getSkillsData();
  }, [speciality]);

  const profileSubmitHandler = async (newData) => {
    const type = "mentor";
    let data = new FormData();
    data.append("image", image);
    data.append("email", newData.email);
    data.append("firstName", newData.firstName);
    data.append("lastName", newData.lastName);
    data.append("password", newData.password);
    data.append("phoneNumber", phoneNumber);
    data.append("bio", newData.bio);
    data.append("experience", newData.experience);
    data.append("speciality", speciality);
    data.append("skills", skills);
    data.append("otherSkills", newData.otherSkills);
    data.append("firm", newData.firm);
    data.append("currentRole", newData.currentRole);
    data.append("previousRole", newData.previousRole);
    data.append("website", newData.website);
    data.append("linkedInProfile", newData.linkedInProfile);
    data.append("mentorshipArea", newData.mentorshipArea);
    data.append("mentorAvailability", newData.mentorAvailability);
    data.append("startTime", startTime);
    data.append("endTime", endTime);
    data.append("type", type);
    try {
      setLoading(true);
      const res = await axios.post(`/mentor/register/all-details`, data);
      if (res.data.success) {
        setSuccess(res.data.success);
        toast.success(res.data.success, { position: "top-center" });
        setLoading(false);
        reset();
      }
      if (res.data.error) {
        setError(res.data.error);
        toast.error(res.data.error, { position: "top-center" });
        setLoading(false);
      }
    } catch (error) {
      return;
    }
  };

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
  function onTimeSelectChangeValue(value) {
    let startTime = value?.format(str);
    let minutes = startTime?.split(":")[1];
    if (minutes === "00" || minutes === "15") {
      let hour = startTime?.split(":")[0];
      minutes = parseInt(minutes) + 30;
      minutes = minutes.toString();
      let newTime = `${hour}:${minutes.toString()}`;
      setEndTime(newTime);
    } else if (minutes === "30") {
      let hour = startTime?.split(":")[0];
      hour = parseInt(hour) + 1;
      minutes = "00";
      let newTime = `${hour}:${minutes.toString()}`;
      setEndTime(newTime);
    } else if (minutes === "45") {
      let hour = startTime?.split(":")[0];
      hour = parseInt(hour) + 1;
      minutes = "15";
      let newTime = `${hour}:${minutes.toString()}`;
      setEndTime(newTime);
    } else {
    }
    setStartTime(startTime);
  }

  const password = watch("password");

  return (
    <MentorRegisterSection>
      {loading ? (
        <MentorRegisterDiv>
          <MentorRegisterDiv1>
            <Loading />
          </MentorRegisterDiv1>
        </MentorRegisterDiv>
      ) : (
        <MentorRegisterDiv>
          <MentorRegisterDiv1>
            <FormDiv>
              <FormDivFlex>
                <Form action="" onSubmit={handleSubmit(profileSubmitHandler)}>
                  {error && (
                    <p
                      style={{
                        color: "red",
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                    >
                      {error}
                    </p>
                  )}
                  {success && (
                    <p
                      style={{
                        color: "green",
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                    >
                      {success}
                    </p>
                  )}
                  <Field>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Email must be Required for registration",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("email");
                      }}
                    />
                    {errors.email && (
                      <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                  </Field>
                  <Field>
                    <Input
                      type="text"
                      placeholder="Enter your First Name"
                      {...register("firstName", {
                        required: "firstname is Required",
                        minLength: {
                          value: 4,
                          message: "Must be 4 characters at least",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("firstName");
                      }}
                    />
                    {errors.firstName && (
                      <ErrorMessage>{errors.firstName.message}</ErrorMessage>
                    )}
                  </Field>
                  <Field>
                    <Input
                      type="text"
                      placeholder="Enter your Last Name"
                      //onChange={(e) => setLastName(e.target.value)}
                      {...register("lastName", {
                        required: "last name is Required",
                        minLength: {
                          value: 4,
                          message: "Must be 4 characters at least",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("lastName");
                      }}
                    />
                    {errors.lastName && (
                      <ErrorMessage>{errors.lastName.message}</ErrorMessage>
                    )}
                  </Field>
                  <PwdField>
                    <Input
                      type={showIcon ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is Required",
                        pattern: {
                          value:
                            /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                          message:
                            "A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required special characters like @ _ $ ! % * ? &",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("password");
                      }}
                    />
                    {errors.password && (
                      <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                    <PwdIcons onClick={(e) => setShowIcon(!showIcon)}>
                      {showIcon ? <ShowIcon /> : <HideIcon />}
                    </PwdIcons>
                  </PwdField>
                  <PwdField>
                    <Input
                      type={showIcon ? "text" : "password"}
                      placeholder="Confirm Your Password"
                      //onChange={(e) => setConfirmPassword(e.target.value)}
                      {...register("confirmPassword", {
                        required: "Enter confirm password",
                        validate: (value) =>
                          value === password || "Password must be matched",
                      })}
                      onKeyUp={() => {
                        trigger("confirmPassword");
                      }}
                    />
                    {errors.confirmPassword && (
                      <ErrorMessage>
                        {errors.confirmPassword.message}
                      </ErrorMessage>
                    )}
                    <PwdIcons onClick={() => setShowIcons(!showIcons)}>
                      {showIcons ? <ShowIcon /> : <HideIcon />}
                    </PwdIcons>
                  </PwdField>
                  <Field>
                    <PhoneInput2
                      value={phoneNumber}
                      country="in"
                      inputStyle={{ width: "100%", padding: "5px 10px" }}
                      onChange={(phone) => setPhoneNumber(phone)}
                    />
                  </Field>
                  <Field>
                    <TextArea
                      {...register("bio", {
                        required: "Enter your bio",
                        minLength: {
                          value: 50,
                          message: "Must be 50 characters at least",
                        },
                        maxLength: {
                          value: 200,
                          message: "Not more than 150 characters",
                        },
                      })}
                      placeholder="Enter your bio"
                    ></TextArea>
                    {errors.bio && (
                      <ErrorMessage>{errors.bio.message}</ErrorMessage>
                    )}
                  </Field>
                  <Field>
                    <FormSelect
                      {...register("experience", {
                        required: "Choose from the experience dropdown",
                      })}
                      name="experience"
                    >
                      <FormOption value="">Choose your experience</FormOption>
                      <FormOption value="0-5">7- 10</FormOption>
                      <FormOption value="5-10">10-15</FormOption>
                      <FormOption value="15-20">15-20</FormOption>
                      <FormOption value="20-25">20-25</FormOption>
                      <FormOption value="25+">25+</FormOption>
                    </FormSelect>
                    {errors.experience && (
                      <ErrorMessage>{errors.experience.message}</ErrorMessage>
                    )}
                  </Field>
                  <Field>
                    <FormSelect
                      required
                      value={speciality}
                      name="specialty"
                      onChange={(event) => setSpeciality(event.target.value)}
                    >
                      <FormOption value="">Choose a Skills Category</FormOption>
                      <FormOption value="technology">Technology</FormOption>
                      <FormOption value="domain">Domain</FormOption>
                      <FormOption value="business-skills">
                        Business skills
                      </FormOption>
                    </FormSelect>
                  </Field>
                  <Field>
                    <FormSelect
                      required
                      name="skills"
                      value={skills}
                      onChange={(event) => formSkillHandler(event)}
                    >
                      <FormOption value="">Choose your skill</FormOption>
                      {skillsSet?.map((skill) => (
                        <FormOption
                          key={skill.skill_master_id}
                          value={skill.skill_master_skill_name}
                        >
                          {skill.skill_master_skill_name}
                        </FormOption>
                      ))}
                    </FormSelect>
                  </Field>
                  {showOthersInput && (
                    <Field>
                      <Input
                        name="skills"
                        type="text"
                        {...register("otherSkills", {
                          required: "other Skills is Required",
                          minLength: {
                            value: 4,
                            message: "Must be 4 characters at least",
                          },
                        })}
                      />
                    </Field>
                  )}
                  <Field>
                    <Input
                      type="text"
                      placeholder="Enter your Firm name"
                      {...register("firm", {
                        required: "firm is Required",
                        minLength: {
                          value: 4,
                          message: "Must be 4 characters at least",
                        },
                      })}
                    />
                    {errors.firm && (
                      <ErrorMessage>{errors.firm.message}</ErrorMessage>
                    )}
                  </Field>
                  <Field>
                    <Input
                      type="text"
                      placeholder="Enter your current Role"
                      {...register("currentRole", {
                        required: "current Role is Required",
                        minLength: {
                          value: 4,
                          message: "Must be 4 characters at least",
                        },
                      })}
                    />
                    {errors.currentRole && (
                      <ErrorMessage>{errors.currentRole.message}</ErrorMessage>
                    )}
                  </Field>
                  <Field>
                    <Input
                      type="text"
                      placeholder="Enter your previous Role"
                      {...register("previousRole", {
                        required: "previous Role is Required",
                        minLength: {
                          value: 4,
                          message: "Must be 4 characters at least",
                        },
                      })}
                    />
                    {errors.previousRole && (
                      <ErrorMessage>{errors.previousRole.message}</ErrorMessage>
                    )}
                  </Field>
                  <Field>
                    <FormSelect
                      {...register("mentorshipArea", {
                        required: "Choose the mentorship area dropdown",
                      })}
                      name="mentorshipArea"
                    >
                      <FormOption value="">Choose Mentorship Area</FormOption>
                      {mentorshipAreas.map((mentorArea) => (
                        <FormOption key={mentorArea.id} value={mentorArea.area}>
                          {mentorArea.area}
                        </FormOption>
                      ))}
                    </FormSelect>
                    {errors.mentorshipArea && (
                      <ErrorMessage>
                        {errors.mentorshipArea.message}
                      </ErrorMessage>
                    )}
                  </Field>
                  <Field>
                    <FormSelect
                      {...register("mentorAvailability", {
                        required:
                          "Choose the mentor availability area dropdown",
                      })}
                      name="mentorAvailability"
                    >
                      <FormOption value="">Choose availability</FormOption>
                      <FormOption value="weekdays">Week Days</FormOption>
                      <FormOption value="weekends">
                        Weekends(Saturday and Sunday)
                      </FormOption>
                      <FormOption value="saturday">Saturday</FormOption>
                      <FormOption value="sunday">Sunday</FormOption>
                    </FormSelect>
                    {errors.mentorAvailability && (
                      <ErrorMessage>
                        {errors.mentorAvailability.message}
                      </ErrorMessage>
                    )}
                  </Field>
                  <Field>
                    <p>
                      Choose the Time Slots (Ex: 12:15 OR 12:30 OR 12:45 ) From
                      :
                    </p>
                    <TimePicker
                      showSecond={showSecond}
                      className="time"
                      onChange={onTimeSelectChangeValue}
                      disabledMinutes={disabledMinutes}
                      disabledSeconds={disabledSeconds}
                      disabledHours={disabledHours}
                    />
                    <p>
                      Your slot timings {startTime} to {endTime}
                    </p>
                  </Field>
                  <Field>
                    <Input
                      type="text"
                      placeholder="Enter your website"
                      {...register("website", {
                        required: "website is Required",
                        maxLength: {
                          value: 100,
                          message: "Must be less than 100 characters at least",
                        },
                      })}
                    />
                    {errors.website && (
                      <ErrorMessage>{errors.website.message}</ErrorMessage>
                    )}
                  </Field>
                  <Field>
                    <Input
                      type="text"
                      placeholder="Enter your linkedIn Profile"
                      {...register("linkedInProfile", {
                        required: "linkedIn Profile is Required",
                        maxLength: {
                          value: 100,
                          message: "Must be less than 100 characters at least",
                        },
                      })}
                    />
                    {errors.linkedInProfile && (
                      <ErrorMessage>
                        {errors.linkedInProfile.message}
                      </ErrorMessage>
                    )}
                  </Field>
                  <Field>
                    Choose the Profile Picture
                    <Input
                      required
                      type="file"
                      name="image"
                      placeholder="Choose the profile picture"
                      onChange={(event) => setImage(event.target.files[0])}
                    />
                  </Field>
                  <Field>
                    <SignUpButton type="submit">Signup</SignUpButton>
                  </Field>
                </Form>
              </FormDivFlex>
            </FormDiv>
          </MentorRegisterDiv1>
        </MentorRegisterDiv>
      )}
      <GoToTop />
    </MentorRegisterSection>
  );
};

export default MentorRegistration;
