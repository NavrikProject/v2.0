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

import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../../utils/LoadingSpinner";
import JobSeekerPersonalDetails from "./JobSeekerPersonalDetails";
import JobSeekerEduDetails from "./JobSeekerEduDetails";
import JobSeekerExpDetails from "./JobSeekerExpDetails";
const JobsApplyStepForm = () => {
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

  const FormTitles = [
    "Personal Details",
    "Education Details",
    "Experience Details",
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <JobSeekerPersonalDetails
          formData={formData}
          setFormData={setFormData}
        />
      );
    } else if (page === 1) {
      return (
        <JobSeekerEduDetails formData={formData} setFormData={setFormData} />
      );
    } else {
      return (
        <JobSeekerExpDetails formData={formData} setFormData={setFormData} />
      );
    }
  };
  const profileSubmitHandler = async (event) => {
    event.preventDefault();
    let data = new FormData();
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
    data.append("specialty", formData.specialty);
    data.append("mentorshipArea", formData.mentorshipArea);
    data.append("website", formData.website);
    data.append("linkedInProfile", formData.linkedInProfile);
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
      setPage((currPage) => currPage + 1);
      setError("");
    } else if (page === 1) {
      setPage((currPage) => currPage + 1);
      setError("");
    } else if (page === 2) {
      setPage((currPage) => currPage + 1);
      setError("");
    }
  };
  return (
    <MentorRegisterSection>
      {loading ? (
        <Loading />
      ) : (
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
                            Apply now
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
              {/* <MentorRegisterRightDiv>
                <img src={signupImg} alt="" />
              </MentorRegisterRightDiv> */}
            </MentorRegisterFlex>
          </MentorRegisterDiv1>
        </MentorRegisterDiv>
      )}
    </MentorRegisterSection>
  );
};

export default JobsApplyStepForm;
