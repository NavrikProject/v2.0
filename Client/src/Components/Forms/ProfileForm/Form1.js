import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  CloseButton,
  ErrorMessage,
  Form,
  FormAddress,
  FormBtn,
  FormDiv,
  FormFlex,
  FormInputDate,
  FormLabel,
  FormOption,
  FormSelect,
} from "./FormProfileElements";
import { toast } from "react-toastify";
import Loading from "../../utils/Loading";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";

const Form1 = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;

  const profileAccountHandler = async (data) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `/${user?.type}/profile/update/${user?.id}`,
        {
          mobile: phoneNumber,
          dob: data.date,
          address: data.address,
          experience: data.experience,
          graduate: data.graduate,
          profession: data.profession,
        },
        { headers: { authorization: "Bearer " + token } }
      );
      if (res.data.success) {
        setSuccess(res.data.success);
        toast.success("Successfully update your personal details", {
          position: "top-center",
        });
        setLoading(false);
        reset();
      }
      if (res.data.error) {
        setError(res.data.error);
        toast.error("There was a problem updating your personal details", {
          position: "top-center",
        });
        setLoading(false);
        reset();
      }
    } catch (error) {
      return;
    }

    setLoading(false);
  };
  setTimeout(() => {
    setError("");
    setSuccess("");
  }, 8000);
  return (
    <>
      <CloseButton onClick={props.personal} />
      <FormDiv>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}{" "}
        {loading && <Loading />}
        <Form onSubmit={handleSubmit(profileAccountHandler)}>
          <FormLabel>Enter your mobile number :</FormLabel>
          <PhoneInput2
            country="in"
            inputStyle={{ width: "100%", padding: "5px 10px" }}
            onChange={(phone) => setPhoneNumber(phone)}
          />
          <FormFlex>
            <FormLabel htmlFor="">Enter your Dob :</FormLabel>
            <FormInputDate
              type="date"
              name="date"
              {...register("date", {
                required: "Choose the Date of birth",
              })}
            />
          </FormFlex>
          {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
          <FormFlex>
            <FormLabel>Education:</FormLabel>
            <FormSelect
              name="graduate"
              {...register("graduate", {
                required: "Choose your education",
              })}
            >
              <FormOption value="">Choose a below option</FormOption>
              <FormOption value="1">Pursing</FormOption>
              <FormOption value="2">Graduate</FormOption>
              <FormOption value="2">Under Graduate</FormOption>
              <FormOption value="4">Post Graduate</FormOption>
            </FormSelect>
          </FormFlex>
          {errors.graduate && (
            <ErrorMessage>{errors.graduate.message}</ErrorMessage>
          )}
          <FormFlex>
            <FormLabel> Profession:</FormLabel>
            <FormSelect
              name="profession"
              {...register("profession", {
                required: "select your profession",
              })}
            >
              <FormOption value="">Choose a below option</FormOption>
              <FormOption value="graduation">
                Completed the graduation
              </FormOption>
              <FormOption value="trainer">Looking for a trainer</FormOption>
              <FormOption value="job">Seeking for a job</FormOption>
              <FormOption value="skills">Learning a new skills</FormOption>{" "}
            </FormSelect>
          </FormFlex>
          {errors.profession && (
            <ErrorMessage>{errors.profession.message}</ErrorMessage>
          )}
          <FormFlex>
            <FormLabel>Experience:</FormLabel>
            <FormSelect
              name="experience"
              {...register("experience", {
                required: "select the experience",
              })}
            >
              <FormOption value="">Choose a below option</FormOption>
              <FormOption value="0">0</FormOption>
              <FormOption value="1">1</FormOption>
              <FormOption value="2">2</FormOption>
              <FormOption value="3">3</FormOption>
              <FormOption value="4">4</FormOption>
              <FormOption value="5">5</FormOption>
            </FormSelect>
          </FormFlex>
          {errors.experience && (
            <ErrorMessage>{errors.experience.message}</ErrorMessage>
          )}
          <FormAddress
            {...register("address", {
              required: "Please add the address",
            })}
          ></FormAddress>
          {errors.address && (
            <ErrorMessage>{errors.address.message}</ErrorMessage>
          )}
          <FormBtn>Update Profile</FormBtn>
        </Form>
      </FormDiv>
    </>
  );
};

export default Form1;
