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
  PasswordDiv,
  SignUpButton,
  TextArea,
  FormSelect,
  FormOption,
  MentorRegisterDiv1,
} from "./MentorRegistrationElements.js";
import GoogleLogin from "react-google-login";

import signupImg from "../../../images/default-removebg-preview.png";
import Loading from "../../utils/LoadingSpinner";
import { loginFailure, loginSuccess } from "../../../redux/userRedux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mentorshipAreas } from "../../Data/MentorData";
const MentorRegistration = () => {
  const [skills, setSkills] = useState([]);
  const [showOthersInput, setShowOthersInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const formSkillHandler = (event) => {
    if (event.target.value === "Others") {
      setShowOthersInput(true);
      setFormData({ ...formData, skills: event.target.value });
    } else {
      setFormData({ ...formData, skills: event.target.value });
      setShowOthersInput(false);
    }
  };
  const [image, setImage] = useState();
  const [endTime, setEndTime] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmShowIcon, setConfirmShowIcon] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    bio: "",
    experience: "",
    skills: "",
    otherSkills: "",
    specialty: "",
    firm: "",
    currentRole: "",
    previousRole: "",
    mentorshipArea: "",
    mentorAvailability: "",
    startTime: "",
    website: "",
    linkedInProfile: "",
  });
  let pwdMinCharLen = password.length >= 8;
  let pwdHasLowChar = /(.*?[a-z].*)/.test(password);
  let pwdHasCapChar = /(?=.*?[A-Z].*)/.test(password);
  let pwdHasSplChar = /(?=.*?[#?!@$%^&*-].*)/.test(password);
  let pwdHasNumChar = /(?=.*?[0-9].*)/.test(password);
  let pwdMaxCharLen = password.length <= 16;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getSkillsData = async () => {
      const res = await axios.get(
        `/get/skills/master?name=${formData?.specialty}`
      );
      setSkills(res.data);
    };
    getSkillsData();
  }, [formData.specialty]);

  const profileSubmitHandler = async (event) => {
    event.preventDefault();
    const type = "mentor";
    // try {
    //   setLoading(true);
    //   const res = await axios.post("/auth/email-register", {
    //     firstName: firstName,
    //     lastName: lastName,
    //     email: email,
    //     password: password,
    //     type: type,
    //   });
    //   if (res.data.required) {
    //     setError(res.data.required);
    //     toast.error(res.data.required, { position: "top-center" });
    //     setLoading(false);
    //   }
    //   if (res.data.exists) {
    //     setError(res.data.exists);
    //     toast.error(res.data.exists, { position: "top-center" });
    //     setLoading(false);
    //   }
    //   if (res.data.error) {
    //     setError(res.data.error);
    //     toast.error(res.data.error, { position: "top-center" });
    //     setLoading(false);
    //   }
    //   if (res.data.success) {
    //     setSuccess(res.data.success);
    //     toast.success(res.data.success, { position: "top-center" });
    //     setLoading(false);
    //   }
    //   setLoading(false);
    // } catch (error) {
    //   return;
    // }
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
    } else if (minutes === "45") {
      let hour = startTime?.split(":")[0];
      hour = parseInt(hour) + 1;
      minutes = "15";
      let endTime = hour + ":" + minutes;
      let newTime = `${hour}:${minutes.toString()}`;
      setEndTime(newTime);
      setFormData({ ...formData, endTime: endTime });
    } else {
    }
    setFormData({ ...formData, startTime: startTime });
  }
  setTimeout(() => {
    setError("");
    setSuccess("");
  }, 7000);

  return (
    <MentorRegisterSection>
      {loading && <Loading />}
      <MentorRegisterDiv>
        <MentorRegisterDiv1>
          <FormDiv>
            <FormDivFlex>
              <Form action="" onSubmit={profileSubmitHandler}>
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
                    value={formData.email}
                    type="email"
                    placeholder="Enter your email....."
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        email: event.target.value,
                      })
                    }
                  />
                </Field>
                <Field>
                  <Input
                    value={formData.firstName}
                    type="text"
                    placeholder="Enter your First Name"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        firstName: event.target.value,
                      })
                    }
                  />
                </Field>
                <Field>
                  <Input
                    value={formData.lastName}
                    type="text"
                    placeholder="Enter your Last Name"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        lastName: event.target.value,
                      })
                    }
                  />
                </Field>
                <PwdField>
                  <Input
                    type={showIcon ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
                  />
                  <PwdIcons onClick={(e) => setShowIcon(!showIcon)}>
                    {showIcon ? <ShowIcon /> : <HideIcon />}
                  </PwdIcons>
                </PwdField>
                {password && (
                  <PasswordDiv>
                    {pwdMinCharLen && pwdMaxCharLen ? (
                      <p style={{ color: "green" }}>
                        Password is between 8 and 16 characters
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>
                        Password must more than 8 and less than 16
                      </p>
                    )}

                    {pwdHasLowChar ? (
                      <p style={{ color: "green" }}>
                        Password contains small letters
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>
                        Password must be contain small letters
                      </p>
                    )}
                    {pwdHasCapChar ? (
                      <p style={{ color: "green" }}>
                        Password contains capital letters
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>
                        Password must be contain capital letters
                      </p>
                    )}
                    {pwdHasSplChar ? (
                      <p style={{ color: "green" }}>
                        Password contains Special characters
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>
                        Password must be contain Special characters
                      </p>
                    )}
                    {pwdHasNumChar ? (
                      <p style={{ color: "green" }}>
                        Password contains Numbers
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>
                        Password must be at lease one number
                      </p>
                    )}
                  </PasswordDiv>
                )}
                <PwdField>
                  <Input
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    type={confirmShowIcon ? "text" : "password"}
                    placeholder="Confirm Your Password"
                  />
                  <PwdIcons
                    onClick={() => setConfirmShowIcon(!confirmShowIcon)}
                  >
                    {confirmShowIcon ? <ShowIcon /> : <HideIcon />}
                  </PwdIcons>
                </PwdField>
                {password && confirmPassword && (
                  <PasswordDiv>
                    {password !== confirmPassword ? (
                      <p style={{ color: "red" }}>Password does not match</p>
                    ) : (
                      <p style={{ color: "green" }}>Password matched</p>
                    )}
                  </PasswordDiv>
                )}
                <Field>
                  <TextArea
                    value=""
                    placeholder="Describe about yourself in brief words"
                    required
                  ></TextArea>
                </Field>
                <Field>
                  <FormSelect
                    required
                    value={formData.experience}
                    name="experience"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        experience: event.target.value,
                      })
                    }
                  >
                    <FormOption value="">Choose your experience</FormOption>
                    <FormOption value="0-5">7- 10</FormOption>
                    <FormOption value="5-10">10-15</FormOption>
                    <FormOption value="15-20">15-20</FormOption>
                    <FormOption value="20-25">20-25</FormOption>
                    <FormOption value="25+">25+</FormOption>
                  </FormSelect>
                </Field>
                <Field>
                  <FormSelect
                    required
                    value={formData.specialty}
                    name="specialty"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        specialty: event.target.value,
                      })
                    }
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
                    value={formData.skills}
                    onChange={(event) => formSkillHandler(event)}
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
                  </FormSelect>
                </Field>
                {showOthersInput && (
                  <Field>
                    <Input
                      value={formData.otherSkills}
                      name="skills"
                      type="text"
                      placeholder="Enter your other skills"
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          otherSkills: event.target.value,
                        })
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
                  />
                </Field>
                <Field>
                  <Input
                    value={formData.currentRole}
                    type="text"
                    placeholder="Enter your Role"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        currentRole: event.target.value,
                      })
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
                      setFormData({
                        ...formData,
                        previousRole: event.target.value,
                      })
                    }
                    required
                  />
                </Field>
                <Field>
                  <FormSelect
                    value={formData.mentorshipArea}
                    required
                    name="mentorshipArea"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        mentorshipArea: event.target.value,
                      })
                    }
                  >
                    <FormOption value="">Choose Mentorship Area</FormOption>
                    {mentorshipAreas.map((mentorArea) => (
                      <FormOption key={mentorArea.id} value={mentorArea.area}>
                        {mentorArea.area}
                      </FormOption>
                    ))}
                  </FormSelect>
                </Field>
                <Field>
                  <FormSelect
                    value={formData.mentorAvailability}
                    name="availability"
                    required
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        mentorAvailability: event.target.value,
                      })
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
                </Field>
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
                </Field>{" "}
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
                    required
                    value={formData.website}
                    type="text"
                    placeholder="Your website address"
                    onChange={(event) =>
                      setFormData({ ...formData, website: event.target.value })
                    }
                  />{" "}
                </Field>
                <Field>
                  <Input
                    required
                    value={formData.linkedInProfile}
                    type="text"
                    placeholder="Your linkedin address"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        linkedInProfile: event.target.value,
                      })
                    }
                  />
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
                  <SignUpButton>Signup</SignUpButton>
                </Field>
              </Form>
            </FormDivFlex>
          </FormDiv>
        </MentorRegisterDiv1>
      </MentorRegisterDiv>
      <GoToTop />
    </MentorRegisterSection>
  );
};

export default MentorRegistration;
