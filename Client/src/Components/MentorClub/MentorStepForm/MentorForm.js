import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Form,
  FormBtn,
  FormDiv,
  FormFlex,
  FormInputDiv,
  FormLabel,
  FormOption,
  FormSelect,
  SingleProfileSect,
  SingleProfileSection,
  SingleProfileWrapper,
  FormInputFile,
  Field,
  Input,
  PwdField,
  PwdIcons,
  ShowIcon,
  HideIcon,
  PasswordDiv,
  MentorFormSlotDiv,
  MentorSlotTimerInput,
} from "../MentorFormElements";
import GoToTop from "../../GoToTop";
import { mentorshipAreas, mentorSkills } from "../../Data/MentorData";

const MentorForm = () => {
  const [specialty, setSpecialty] = useState("");
  const [image, setImage] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [mentorshipArea, setMentorshipArea] = useState("");
  const [error, setError] = useState("");
  const [availability, setAvailability] = useState("");
  const [fromTiming, setFromTiming] = useState("");
  const [toTiming, setToTiming] = useState("");
  const [success, setSuccess] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  
  let pwdMinCharLen = password.length >= 8;
  let pwdHasLowChar = /(.*?[a-z].*)/.test(password);
  let pwdHasCapChar = /(?=.*?[A-Z].*)/.test(password);
  let pwdHasSplChar = /(?=.*?[#?!@$%^&*-].*)/.test(password);
  let pwdHasNumChar = /(?=.*?[0-9].*)/.test(password);
  let pwdMaxCharLen = password.length <= 16;
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;

  const profileSubmitHandler = async (event) => {
    event.preventDefault();
    if (
      !image &&
      !password &&
      !skills &&
      !experience &&
      !specialty &&
      !firstName &&
      !lastName &&
      !mentorshipArea &&
      !fromTiming &&
      !toTiming &&
      !availability
    ) {
      setError("All details must be required");
      toast.error("All details must be required", { position: "top-center" });
    }
    let data = new FormData();
    data.append("image", image);
    data.append("skills", skills);
    data.append("experience", experience);
    data.append("specialty", specialty);
    data.append("email", email);
    data.append("firstname", firstName);
    data.append("lastname", lastName);
    data.append("password", password);
    data.append("mentorshipArea", mentorshipArea);
    data.append("from", fromTiming);
    data.append("to", toTiming);
    data.append("availability", availability);

    try {
      const res = await axios.post(`/mentor/register`, data, {
        headers: { authorization: "Bearer " + token },
      });
      if (res.data.success) {
        setSuccess(res.data.success);
        toast.success(res.data.success, { position: "top-center" });
        setEmail("");
        setSpecialty("");
        setImage("");
        setSkills("");
        setExperience("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setMentorshipArea("");
        setAvailability("");
        setFromTiming("");
        setToTiming("");
      }
      if (res.data.error) {
        setError(res.data.error);
        toast.error(res.data.error, { position: "top-center" });
      }
    } catch (error) {
      return;
    }
  };
  setTimeout(() => {
    setError("");
    setSuccess("");
  }, 7000);

  const showCalenderHandler = (event) => {
    if (event.target.value === "specific") {
      setShowCalender(true);
    } else {
      setShowCalender(false);
    }
  };
  return (
    <SingleProfileSect>
      <SingleProfileSection>
        <SingleProfileWrapper>
          {error && (
            <p style={{ color: "red", fontSize: "20px", textAlign: "center" }}>
              {error}
            </p>
          )}
          {success && (
            <p
              style={{ color: "green", fontSize: "20px", textAlign: "center" }}
            >
              {success}
            </p>
          )}
          <FormDiv>
            <Form onSubmit={profileSubmitHandler}>
              <Field>
                <Input
                  value={email}
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Input
                  value={firstName}
                  type="text"
                  placeholder="Enter your First Name"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Field>
              <Field>
                <Input
                  value={lastName}
                  type="text"
                  placeholder="Enter your Last Name"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Field>
              <PwdField>
                <Input
                  value={password}
                  type={showIcon ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
                    <p style={{ color: "green" }}>Password contains Numbers</p>
                  ) : (
                    <p style={{ color: "red" }}>
                      Password must be at lease one number
                    </p>
                  )}
                </PasswordDiv>
              )}
              <FormFlex>
                <FormLabel>Specialty:</FormLabel>
                <FormSelect
                  required
                  name="specialty"
                  onChange={(event) => setSpecialty(event.target.value)}
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
              </FormFlex>
              <FormFlex>
                <FormLabel>Availability:</FormLabel>
                <FormSelect
                  name="specialty"
                  required
                  onChange={(event) => setAvailability(event.target.value)}
                  onClick={(event) => {
                    showCalenderHandler(event);
                  }}
                >
                  <FormOption>Choose a below option</FormOption>
                  <FormOption value="weekdays">Week Days</FormOption>
                  <FormOption value="weekends">
                    Weekends(Saturday and Sunday)
                  </FormOption>
                  <FormOption value="saturday">Saturday</FormOption>
                  <FormOption value="sunday">Sunday</FormOption>
                  <FormOption value="specific">Specific Date</FormOption>
                </FormSelect>
              </FormFlex>
              {showCalender && (
                <>
                  <span>Choose the Specific date:</span>
                  <input
                    minDate={new Date()}
                    type="date"
                    onChange={(event) => setAvailability(event.target.value)}
                  />
                </>
              )}
              <div>
                <FormLabel>
                  Choose the Time Slots (Minimum 60 minutes)
                </FormLabel>
                <MentorFormSlotDiv>
                  From:
                  <MentorSlotTimerInput
                    required
                    type="time"
                    min="1"
                    step="1800"
                    onChange={(event) => setFromTiming(event.target.value)}
                  />
                  <br /> To:
                  <MentorSlotTimerInput
                    required
                    type="time"
                    step="1800"
                    onChange={(event) => setToTiming(event.target.value)}
                  />
                </MentorFormSlotDiv>
              </div>
              <FormFlex>
                <FormLabel>Experience:</FormLabel>
                <FormSelect
                  required
                  name="experience"
                  onChange={(event) => setExperience(event.target.value)}
                >
                  <FormOption>Choose a below option</FormOption>
                  <FormOption value="0">0</FormOption>
                  <FormOption value="1">1</FormOption>
                  <FormOption value="2">2</FormOption>
                  <FormOption value="3">3</FormOption>
                  <FormOption value="4">4</FormOption>
                  <FormOption value="5">5</FormOption>
                </FormSelect>
              </FormFlex>
              <FormInputDiv>
                <FormFlex>
                  <FormLabel>Skills:</FormLabel>
                  <FormSelect
                    required
                    name="skills"
                    onChange={(event) => setSkills(event.target.value)}
                  >
                    <FormOption>Choose a below option</FormOption>
                    {mentorSkills.map((skill) => (
                      <FormOption key={skill.id} value={skill.skills}>
                        {skill.skills}
                      </FormOption>
                    ))}
                  </FormSelect>
                </FormFlex>
              </FormInputDiv>
              <FormInputDiv>
                <FormFlex>
                  <FormLabel>Mentorship Area:</FormLabel>
                  <FormSelect
                    required
                    name="mentorArea"
                    onChange={(event) => setMentorshipArea(event.target.value)}
                  >
                    <FormOption>Choose a below option</FormOption>
                    {mentorshipAreas.map((mentorArea) => (
                      <FormOption key={mentorArea.id} value={mentorArea.area}>
                        {mentorArea.area}
                      </FormOption>
                    ))}
                  </FormSelect>
                </FormFlex>
              </FormInputDiv>
              <FormInputDiv>
                <FormFlex>
                  <FormLabel>Profile Picture:</FormLabel>
                  <FormInputFile
                    required
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </FormFlex>
              </FormInputDiv>
              <FormBtn>Join as a Mentor</FormBtn>
            </Form>
          </FormDiv>
        </SingleProfileWrapper>
      </SingleProfileSection>
      <GoToTop />
    </SingleProfileSect>
  );
};

export default MentorForm;
