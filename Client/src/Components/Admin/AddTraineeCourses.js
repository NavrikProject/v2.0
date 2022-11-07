import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LinearBuffer from "../utils/Loading";
import {
  Button,
  ErrorMessage,
  Field,
  FormOption,
  FormSelect,
  Input,
  LabelTitle,
} from "./AdminPanelElements";
const AddTraineeCourses = () => {
  const [users, setUsers] = useState([]);
  const [speciality, setSpeciality] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axios.get("/users/get/trainee", {
        headers: { authorization: "Bearer " + user?.accessToken },
      });
      setUsers(res.data);
    };
    getAllUsers();
  }, [user?.accessToken]);
  useEffect(() => {
    const getSkillsData = async () => {
      const res = await axios.get(
        `/trainee/courses/get-courses-by-category/master?name=${speciality}`
      );
      if (res.data.success) {
        setSkills(res.data.success);
      } else {
        setSkills([]);
      }
    };
    getSkillsData();
  }, [speciality]);

  const addTraineeCourseHandler = async (data) => {
    setLoading(true);
    const res = await axios.post(
      `/trainee/courses/add-trainee-course/${data.userId}`,
      {
        courseNameId: data.courseName,
        courseCategory: speciality,
        startsDate: data.startsDate,
      },
      {
        headers: { authorization: "Bearer " + user?.accessToken },
      }
    );
    if (res.data.success) {
      return (
        toast.success(res.data.success, { position: "top-center" }),
        reset(),
        setSuccess(res.data.success),
        setLoading(false)
      );
    }
    if (res.data.error) {
      return (
        toast.error(res.data.error, { position: "top-center" }),
        setError(res.data.error),
        setLoading(false)
      );
    }
    setLoading(false);
  };
  return (
    <div>
      {error && (
        <p style={{ color: "red", fontSize: "17px", textAlign: "center" }}>
          {error}
        </p>
      )}
      {success && (
        <p style={{ color: "green", fontSize: "17px", textAlign: "center" }}>
          {success}
        </p>
      )}
      {loading && <LinearBuffer />}
      <>
        <form action="" onSubmit={handleSubmit(addTraineeCourseHandler)}>
          <Field>
            <LabelTitle htmlFor="speciality">
              Choose course category :
            </LabelTitle>
            <FormSelect
              required
              value={speciality}
              name="specialty"
              onChange={(event) => setSpeciality(event.target.value)}
            >
              <FormOption value="">Choose a course category</FormOption>
              <FormOption value="technology">Technology</FormOption>
              <FormOption value="domain">Domain</FormOption>
              <FormOption value="business-skills">Business skills</FormOption>
            </FormSelect>
          </Field>
          <br />
          <Field>
            <LabelTitle htmlFor="speciality">Choose course name : </LabelTitle>
            <FormSelect
              name="skills"
              {...register("courseName", {
                required: "Choose the course name",
              })}
            >
              <FormOption value="">Choose your course name</FormOption>
              {skills?.map((course) => (
                <FormOption key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </FormOption>
              ))}
            </FormSelect>
            {errors.courseName && (
              <ErrorMessage>{errors.courseName.message}</ErrorMessage>
            )}
          </Field>
          <br />
          <Field>
            <LabelTitle htmlFor="">Choose the trainee email :</LabelTitle>
            <FormSelect
              name=""
              id=""
              {...register("userId", {
                required: "Choose the user email address",
              })}
            >
              <FormOption value="">Choose the email</FormOption>
              {users?.map((user) => (
                <FormOption key={user.userDtlsId} value={user.userDtlsId}>
                  {user.userEmail}
                </FormOption>
              ))}
            </FormSelect>
            {errors.userId && (
              <ErrorMessage>{errors.userId.message}</ErrorMessage>
            )}
          </Field>
          <br />
          <Field>
            <LabelTitle htmlFor="">Select the joining date :</LabelTitle>
            <Input
              type="date"
              {...register("startsDate", {
                required: "Select the starts Date",
              })}
            />
            {errors.startsDate && (
              <ErrorMessage>{errors.startsDate.message}</ErrorMessage>
            )}
          </Field>
          <br />
          <Button>Add Trainee course Details</Button>
        </form>
      </>
    </div>
  );
};

export default AddTraineeCourses;
