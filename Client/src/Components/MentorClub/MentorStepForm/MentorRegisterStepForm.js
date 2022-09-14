import React, { useState } from "react";
import {
  MentorRegisterDiv,
  MentorRegisterSection,
  MentorRegisterDiv1,
  MentorRegisterFlex,
  MentorRegisterLeftDiv,
  MentorRegisterRightDiv,
  FormDiv,
  FormDivFlex,
  Form,
  FormHeading,
  ButtonDiv,
  PrevButton,
  JoinButton,
  NextButton,
} from "./MentorRegisterStepELements";
import MentorSlotDetails from "./MentorSlotDetails";
import MentorPersonalInfo from "./MentorPersonalInfo";
import MentorExpDetails from "./MentorExpDetails";
import MentorAddDetails from "./MentorAddDetails";
import signupImg from "../../../images/default-removebg-preview.png";
import axios from "axios";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import Loading from "../../utils/LoadingSpinner";
const MentorRegisterStepForm = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [page, setPage] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);
  const [formData, setFormData] = useState({
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
  const [image, setImage] = useState();
  const [endTime, setEndTime] = useState("");

  const [errorData, setErrorData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    bio: "",
    experience: "",
    skills: "",
    specialty: "",
    firm: "",
    currentRole: "",
    previousRole: "",
    mentorshipArea: "",
    mentorAvailability: "",
    startTime: "",
    endTime: "",
    website: "",
    linkedInProfile: "",
    image: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const FormTitles = [
    "Personal Info",
    "Experience Details",
    "Availability Details",
    "Additional Information",
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <MentorPersonalInfo
          errorData={errorData}
          formData={formData}
          setFormData={setFormData}
          setErrorData={setErrorData}
        />
      );
    } else if (page === 1) {
      return (
        <MentorExpDetails
          errorData={errorData}
          formData={formData}
          setFormData={setFormData}
          setErrorData={setErrorData}
        />
      );
    } else if (page === 2) {
      return (
        <MentorSlotDetails
          errorData={errorData}
          formData={formData}
          setFormData={setFormData}
          setErrorData={setErrorData}
          endTime={endTime}
          setEndTime={setEndTime}
        />
      );
    } else {
      return (
        <MentorAddDetails
          setImage={setImage}
          errorData={errorData}
          formData={formData}
          setFormData={setFormData}
          setErrorData={setErrorData}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      );
    }
  };
  const profileSubmitHandler = async (event) => {
    event.preventDefault();
    if (
      !phoneNumber &&
      !formData.website &&
      !formData.linkedInProfile &&
      !image &&
      !endTime
    ) {
      return setError("Please fill all details");
    }
    if (!phoneNumber) {
      return setErrorData({
        ...errorData,
        phoneNumber: "please enter your last mobile number",
      });
    }
    if (!formData.website) {
      return setErrorData({
        ...errorData,
        website: "please enter your website",
      });
    }
    if (!formData.linkedInProfile) {
      return setErrorData({
        ...errorData,
        linkedInProfile: "please paste your linked in profile",
      });
    }
    let data = new FormData();
    data.append("image", image);
    data.append("email", user?.email);
    data.append("firstname", formData.firstName);
    data.append("lastname", formData.lastName);
    data.append("bio", formData.bio);
    data.append("experience", formData.experience);
    data.append("skills", formData.skills);
    data.append("otherSkills", formData.otherSkills);
    data.append("firm", formData.firm);
    data.append("currentRole", formData.currentRole);
    data.append("previousRole", formData.previousRole);
    data.append("mentorAvailability", formData.mentorAvailability);
    data.append("startTime", formData.startTime);
    data.append("endTime", endTime);
    data.append("specialty", formData.specialty);
    data.append("mentorshipArea", formData.mentorshipArea);
    data.append("website", formData.website);
    data.append("linkedInProfile", formData.linkedInProfile);
    data.append("phoneNumber", phoneNumber);
    try {
      setLoading(true);
      const res = await axios.post(`/mentor/register/additional-details`, data);
      if (res.data.success) {
        setSuccess(res.data.success);
        toast.success(res.data.success, { position: "top-center" });
        setLoading(false);
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

  function bioLength(bio) {
    if (bio.length < 50) {
      return true;
    } else {
      return false;
    }
  }
  const setPageCount = (event) => {
    event.preventDefault();
    if (page === 0) {
      if (!formData.firstName && !formData.lastName && !formData.bio) {
        return setError("Please fill all the required details");
      } else {
        if (!formData.firstName) {
          return setErrorData({
            ...errorData,
            firstName: "please enter your first name",
          });
        }
        if (!formData.lastName) {
          return setErrorData({
            ...errorData,
            lastName: "please enter your last name",
          });
        }
        if (!formData.bio) {
          return setErrorData({
            ...errorData,
            bio: "please enter your bio",
          });
        }
        if (bioLength(formData.bio) === true) {
          return setErrorData({
            ...errorData,
            bio: "please enter your at lease 50 characters long",
          });
        } else {
          setPage((currPage) => currPage + 1);
          setError("");
        }
      }
    } else if (page === 1) {
      if (
        !formData.experience &&
        !formData.skills &&
        !formData.currentRole &&
        !formData.previousRole &&
        !formData.firm &&
        !formData.specialty
      ) {
        return setError("Please fill all the required details");
      }
      if (!formData.experience || formData.experience === "") {
        return setErrorData({
          ...errorData,
          experience: "please select your skills",
        });
      }
      if (!formData.skills || formData.skills === "") {
        return setErrorData({
          ...errorData,
          skills: "please select your skills",
        });
      }
      if (!formData.specialty || formData.specialty === "") {
        return setErrorData({
          ...errorData,
          specialty: "please select your specialty",
        });
      }
      if (!formData.firm) {
        return setErrorData({
          ...errorData,
          firm: "please enter your firm name",
        });
      }
      if (!formData.currentRole) {
        return setErrorData({
          ...errorData,
          currentRole: "please enter your current role",
        });
      }
      if (!formData.previousRole) {
        return setErrorData({
          ...errorData,
          previousRole: "please enter your previous role",
        });
      } else {
        setPage((currPage) => currPage + 1);
        setError("");
      }
    } else if (page === 2) {
      if (!formData.mentorshipArea && !formData.mentorAvailability) {
        return setError("Please fill all details");
      }
      if (!formData.mentorshipArea || formData.mentorshipArea === "") {
        return setErrorData({
          ...errorData,
          mentorshipArea: "please select your mentorship area",
        });
      }
      if (!formData.mentorAvailability || formData.mentorAvailability === "") {
        return setErrorData({
          ...errorData,
          mentorAvailability: "please select your availability",
        });
      } else {
        setPage((currPage) => currPage + 1);
        setError("");
      }
    } else {
      setButtonEnable(true);
    }
  };
  return (
    <MentorRegisterSection>
      {loading && <Loading />}
      <MentorRegisterDiv>
        <MentorRegisterDiv1>
          <MentorRegisterFlex>
            <MentorRegisterLeftDiv>
              <FormDiv>
                <FormDivFlex>
                  <Form action="">
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
                    <FormHeading>{FormTitles[page]}</FormHeading>
                    {PageDisplay()}
                    <ButtonDiv>
                      <PrevButton
                        type="button"
                        disabled={page === 0}
                        onClick={() => {
                          setPage((currPage) => currPage - 1);
                        }}
                      >
                        Prev
                      </PrevButton>
                      {page === FormTitles.length - 1 ? (
                        <JoinButton
                          type="submit"
                          onClick={profileSubmitHandler}
                        >
                          Join As a Mentor
                        </JoinButton>
                      ) : (
                        <NextButton type="button" onClick={setPageCount}>
                          Next
                        </NextButton>
                      )}
                    </ButtonDiv>
                  </Form>
                </FormDivFlex>
              </FormDiv>
            </MentorRegisterLeftDiv>
            <MentorRegisterRightDiv>
              <img src={signupImg} alt="" />
            </MentorRegisterRightDiv>
          </MentorRegisterFlex>
        </MentorRegisterDiv1>
      </MentorRegisterDiv>
    </MentorRegisterSection>
  );
};

export default MentorRegisterStepForm;
