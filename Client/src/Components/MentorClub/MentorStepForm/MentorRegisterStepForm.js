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
import MentorSignUpDetails from "./MentorSignUpDetails";
import MentorSlotDetails from "./MentorSlotDetails";
import MentorPersonalInfo from "./MentorPersonalInfo";
import MentorExpDetails from "./MentorExpDetails";
import MentorAddDetails from "./MentorAddDetails";
import signupImg from "../../../images/default-removebg-preview.png";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../utils/LoadingSpinner";
const MentorRegisterStepForm = () => {
  const [page, setPage] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
  });
  const [image, setImage] = useState();

  const FormTitles = [
    "Mentor Sign Up",
    "Personal Info",
    "Experience Details",
    "Availability Details",
    "Additional Information",
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <MentorSignUpDetails formData={formData} setFormData={setFormData} />
      );
    } else if (page === 1) {
      return (
        <MentorPersonalInfo formData={formData} setFormData={setFormData} />
      );
    } else if (page === 2) {
      return <MentorExpDetails formData={formData} setFormData={setFormData} />;
    } else if (page === 3) {
      return (
        <MentorSlotDetails formData={formData} setFormData={setFormData} />
      );
    } else {
      return (
        <MentorAddDetails
          setImage={setImage}
          formData={formData}
          setFormData={setFormData}
        /> 
      );
    }
  };

  const profileSubmitHandler = async (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append("image", image);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("firstname", formData.firstName);
    data.append("lastname", formData.lastName);
    data.append("bio", formData.bio);
    data.append("experience", formData.experience);
    data.append("skills", formData.skills);
    data.append("firm", formData.firm);
    data.append("currentRole", formData.currentRole);
    data.append("previousRole", formData.previousRole);
    data.append("mentorAvailability", formData.mentorAvailability);
    data.append("startTime", formData.startTime);
    data.append("endTime", formData.endTime);
    data.append("specialty", formData.specialty);
    data.append("mentorshipArea", formData.mentorshipArea);
    data.append("website", formData.website);
    data.append("linkedInProfile", formData.linkedInProfile);

    try {
      setLoading(true);
      const res = await axios.post(`/mentor/register/apply-now`, data);
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
  setTimeout(() => {
    setLoading(false);
    setError("");
    setSuccess("");
  }, 7000);
  return (
    <MentorRegisterSection>
      {loading && <Loading />}
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
        <p style={{ color: "green", textAlign: "center", fontSize: "20px" }}>
          {success}
        </p>
      )}
      <MentorRegisterDiv>
        <MentorRegisterDiv1>
          <MentorRegisterFlex>
            <MentorRegisterLeftDiv>
              <FormDiv>
                <FormDivFlex>
                  <Form action="" onSubmit={profileSubmitHandler}>
                    <FormHeading>{FormTitles[page]}</FormHeading>
                    {PageDisplay()}
                    <ButtonDiv>
                      <PrevButton
                        disabled={page === 0}
                        onClick={() => {
                          setPage((currPage) => currPage - 1);
                        }}
                      >
                        Prev
                      </PrevButton>
                      {page === FormTitles.length - 1 ? (
                        <JoinButton>Join As a Mentor</JoinButton>
                      ) : (
                        <NextButton
                          onClick={() => {
                            setPage((currPage) => currPage + 1);
                          }}
                        >
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
