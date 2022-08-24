import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../utils/LoadingSpinner";
import {
  ErrorMessage,
  Field,
  Form,
  FormLabel,
  FormOption,
  FormSelect,
  FormTextArea,
  Input,
  NextButton,
  RegisterFormSect,
  RegisterFormSection,
  RegisterFormWrapper,
} from "./ApplyContributionELements";
import "./PhoneNumbers.css";
import { useSelector } from "react-redux";
import {
  ContributionData,
  ContributionReasons,
} from "../Data/ContributionData";
import { useForm } from "react-hook-form";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const ApplyContribution = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [masterCourses, setMasterCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const courseCategory = watch("courseCategory");
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

  const requestForContribution = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`/contributers/request-contribution`, {
        email: user?.email,
        fullname: user?.firstname + " " + user?.lastname,
        data: data,
        phoneNumber: phoneNumber,
      });
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
        reset();
      }
    } catch (error) {
      return;
    }
  };
  return (
    <RegisterFormSect>
      <RegisterFormSection>
        <RegisterFormWrapper>
          <Form onSubmit={handleSubmit(requestForContribution)}>
            <Field>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
              {loading && <LoadingSpinner />}
            </Field>
            <Field>
              <FormLabel>Choose the course Category :</FormLabel>
              <FormSelect
                name="courseCategory"
                {...register("courseCategory", {
                  required: "select the course category",
                })}
              >
                <FormOption value="">Choose an option</FormOption>
                <FormOption value="it-skills">It Skills</FormOption>
                <FormOption value="domain-skills">Domain</FormOption>
                <FormOption value="software-development">
                  Software Development
                </FormOption>
              </FormSelect>
              {errors.courseCategory && (
                <ErrorMessage>{errors.courseCategory.message}</ErrorMessage>
              )}
            </Field>
            <Field>
              <FormLabel>Choose the Course Name :</FormLabel>
              <FormSelect
                name="courseMaster"
                {...register("courseMasterNameId", {
                  required: "select one option",
                })}
              >
                <FormOption value="">Choose an option</FormOption>
                {masterCourses?.length > 0 ? (
                  masterCourses?.map((course) => (
                    <FormOption
                      key={course.course_master_name_id}
                      value={course.course_master_name_id}
                    >
                      {course.course_master_course_name}
                    </FormOption>
                  ))
                ) : (
                  <FormOption>No courses to display</FormOption>
                )}
              </FormSelect>
              {errors.courseMasterNameId && (
                <ErrorMessage>{errors.courseMasterNameId.message}</ErrorMessage>
              )}
            </Field>
            <Field>
              <FormLabel>Select the chapter :</FormLabel>
              <FormSelect
                name="courseChapter"
                {...register("courseChapter", {
                  required: "select the course chapter",
                })}
              >
                {ContributionData.map((data) => (
                  <FormOption key={data.id} value={data.chapter}>
                    {data.chapter}
                  </FormOption>
                ))}
              </FormSelect>
              {errors.courseChapter && (
                <ErrorMessage>{errors.courseChapter.message}</ErrorMessage>
              )}
            </Field>
            <Field>
              <FormLabel>Choose the course content category :</FormLabel>
              <FormSelect
                name="courseContentCategory"
                {...register("courseContentCategory", {
                  required: "select the course content category",
                })}
              >
                <FormOption value="">Choose an option</FormOption>
                <FormOption value="add">Add resource or content</FormOption>
                <FormOption value="improve">Improve content</FormOption>
                <FormOption value="remove">Remove content</FormOption>
              </FormSelect>
              {errors.courseContentCategory && (
                <ErrorMessage>
                  {errors.courseContentCategory.message}
                </ErrorMessage>
              )}
            </Field>
            <Field>
              <FormLabel>
                Select the Reason for adding/removing/suggesting ?
              </FormLabel>
              <FormSelect
                name="selectReason"
                {...register("selectReason", {
                  required: "select the reason for adding/removing/suggesting",
                })}
              >
                {ContributionReasons.map((data) => (
                  <FormOption key={data.id} value={data.reason}>
                    {data.reason}
                  </FormOption>
                ))}
              </FormSelect>
              {errors.selectReason && (
                <ErrorMessage>{errors.selectReason.message}</ErrorMessage>
              )}
            </Field>
            <Field>
              <FormLabel>Min Years of Experience :</FormLabel>
              <Input
                type="number"
                placeholder="Minimum 10 years of experience"
                {...register("experience", {
                  required: "Experience must be required",
                  min: {
                    value: 10,
                    message: "Minimum experience must be at least 10 Years",
                  },
                })}
              />
              {errors.experience && (
                <ErrorMessage>{errors.experience.message}</ErrorMessage>
              )}
            </Field>
            <Field>
              <FormLabel>Enter your mobile number :</FormLabel>
              <PhoneInput2
                country="in"
                inputStyle={{ width: "100%", padding: "5px 10px" }}
                onChange={(phone) => setPhoneNumber(phone)}
              />
            </Field>
            <Field>
              <FormLabel>Your Qualification :</FormLabel>
              <FormSelect
                {...register("qualification", {
                  required: "Qualification must be required",
                })}
              >
                <FormOption value="">Choose an option</FormOption>
                <FormOption value="graduation">Graduation</FormOption>
                <FormOption value="post-graduation">Post Graduation</FormOption>
                <FormOption value="ph-d">Ph D</FormOption>
                <FormOption value="others">Others</FormOption>
              </FormSelect>
              {errors.qualification && (
                <ErrorMessage>{errors.qualification.message}</ErrorMessage>
              )}
            </Field>
            <Field>
              <FormLabel>
                Give the brief explanation of the contribution, Why you are
                adding/removing/suggestion in the course ?
              </FormLabel>
              <FormTextArea
                {...register("expReason", {
                  required: "Explain in details",
                  minLength: {
                    value: 30,
                    error: "Please enter at least 30 words",
                  },
                })}
                onKeyUp={() => {
                  trigger("expReason");
                }}
              ></FormTextArea>
              {errors.expReason && (
                <ErrorMessage>{errors.expReason.message}</ErrorMessage>
              )}
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
