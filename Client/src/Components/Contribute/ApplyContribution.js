import axios from "axios";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";
import LoadingSpinner from "../utils/LoadingSpinner";
import {
  Field,
  Form,
  FormLabel,
  FormOption,
  FormSelect,
  Input,
  NextButton,
  RegisterFormSect,
  RegisterFormSection,
  RegisterFormWrapper,
} from "./ApplyContributionELements";
import "./PhoneNumbers.css";
import { useSelector } from "react-redux";

const ApplyContribution = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [masterCourses, setMasterCourses] = useState([]);
  const [masterCourseNameId, setMasterCourseNameId] = useState("");
  const [experience, setExperience] = useState("");
  const [qualification, setQualification] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();
  const [contentDer, setContentDer] = useState();
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const getCourseByTitles = async () => {
      const res = await axios.get(`/courses/master?category=${courseCategory}`);
      if (res.data.master) {
        setMasterCourses(res.data.master);
      } else {
        return;
      }
    };
    getCourseByTitles();
  }, [courseCategory]);

  const requestForContribution = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`/contributers/request-contribution`, {
        email: user?.email,
        fullname: user?.firstname + " " + user?.lastname,
        courseCategory,
        experience,
        masterCourseNameId,
        qualification,
        value,
        contentDer,
      });
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
  return (
    <RegisterFormSect>
      <RegisterFormSection>
        <RegisterFormWrapper>
          <Form onSubmit={requestForContribution}>
            <Field>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
              {loading && <LoadingSpinner />}
            </Field>
            <Field>
              <FormLabel>Choose the course Category :</FormLabel>
              <FormSelect
                value={courseCategory}
                onChange={(e) => setCourseCategory(e.target.value)}
              >
                <FormOption>Choose an option</FormOption>
                <FormOption value="it-skills">It Skills</FormOption>
                <FormOption value="domain-skills">Domain</FormOption>
                <FormOption value="software-development">
                  Software Development
                </FormOption>
              </FormSelect>
            </Field>
            <Field>
              <FormLabel>Choose the Course Name :</FormLabel>
              <FormSelect
                value={masterCourseNameId}
                onChange={(e) => setMasterCourseNameId(e.target.value)}
              >
                <FormOption>Choose an option</FormOption>
                {masterCourses?.length > 0 ? (
                  masterCourses?.map((course) => (
                    <>
                      <FormOption
                        key={course.course_master_name_id}
                        value={course.course_master_name_id}
                      >
                        {course.course_master_course_name}
                      </FormOption>
                    </>
                  ))
                ) : (
                  <FormOption>No courses to display</FormOption>
                )}
              </FormSelect>
            </Field>
            <Field>
              <FormLabel>Choose one below :</FormLabel>
              <FormSelect
                required
                value={contentDer}
                onChange={(e) => setContentDer(e.target.value)}
              >
                <FormOption>Choose an option</FormOption>
                <FormOption value="add">Add resource or content</FormOption>
                <FormOption value="improve">Improve content</FormOption>
                <FormOption value="remove">Remove content</FormOption>
              </FormSelect>
            </Field>
            <Field>
              <FormLabel>Min Years of Experience :</FormLabel>
              <Input
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                type="number"
                placeholder="Minimum 10 years of experience"
                min="8"
              />
            </Field>
            <Field>
              <PhoneInput
                defaultCountry="in"
                style={{ border: "none " }}
                required
                className="phone"
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
              />
            </Field>
            <Field>
              <FormLabel>Your Qualification :</FormLabel>
              <FormSelect
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              >
                <FormOption>Choose an option</FormOption>
                <FormOption value="graduation">Graduation</FormOption>
                <FormOption value="post-graduation">Post Graduation</FormOption>
                <FormOption value="ph-d">Ph D</FormOption>
                <FormOption value="others">Others</FormOption>
              </FormSelect>
            </Field>
            <Field>
              <NextButton>Submit</NextButton>
            </Field>
          </Form>
        </RegisterFormWrapper>
      </RegisterFormSection>
    </RegisterFormSect>
  );
};

export default ApplyContribution;
