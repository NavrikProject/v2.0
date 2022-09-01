import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  FormBtn,
  FormDiv,
  FormLabel,
  FormOption,
  FormSelect,
  SingleProfileSect,
  SingleProfileSection,
  SingleProfileWrapper,
  CloseButtonDiv,
  CloseButton,
  Field,
  Input,
  TextArea,
} from "./SingleProfileElements";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "./FormProfileElements";
const SingleProfile = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;

  const profileSubmitHandler = async (newData) => {
    let data = new FormData();
    data.append("image", image);
    data.append("mobile", phoneNumber);
    data.append("dob", newData.date);
    data.append("address", newData.address);
    data.append("experience", newData.experience);
    data.append("graduate", newData.graduate);
    data.append("profession", newData.profession);
    try {
      const res = await axios.post(
        `/trainee/profile/create/${user?.id}`,
        data,
        { headers: { authorization: "Bearer " + token } }
      );
      if (res.data.success) {
        setSuccess(res.data.success);
        toast.success(res.data.success, { position: "top-center" });
        reset();
      }
      if (res.data.error) {
        setError(res.data.error);
        toast.error(res.data.error, { position: "top-center" });
      }
    } catch (error) {
      return;
    }
  };

  return (
    <SingleProfileSect>
      <CloseButtonDiv>
        <CloseButton onClick={props.personal} />
      </CloseButtonDiv>
      <SingleProfileSection>
        <SingleProfileWrapper>
          <FormDiv>
            {error && (
              <p
                style={{ color: "red", fontSize: "20px", textAlign: "center" }}
              >
                {error}
              </p>
            )}
            {success && (
              <p
                style={{
                  color: "green",
                  fontSize: "20px",
                  textAlign: "center",
                }}
              >
                {success}
              </p>
            )}
            <Form onSubmit={handleSubmit(profileSubmitHandler)}>
              <Field>
                <FormLabel>Enter your mobile number :</FormLabel>
                <PhoneInput2
                  country="in"
                  inputStyle={{ width: "100%", padding: "5px 10px" }}
                  onChange={(phone) => setPhoneNumber(phone)}
                />
              </Field>
              <Field>
                <FormLabel htmlFor="">Enter your Dob :</FormLabel>
                <Input
                  type="date"
                  name="date"
                  {...register("date", {
                    required: "Choose the Date of birth",
                  })}
                />
              </Field>
              {errors.date && (
                <ErrorMessage>{errors.date.message}</ErrorMessage>
              )}
              <Field>
                <FormLabel>Education:</FormLabel>
                <FormSelect
                  name="graduate"
                  {...register("graduate", {
                    required: "Choose your education",
                  })}
                >
                  <FormOption value="">Choose a below option</FormOption>
                  <FormOption value="Pursing">Pursing</FormOption>
                  <FormOption value="Graduate">Graduate</FormOption>
                  <FormOption value="Under Graduate">Under Graduate</FormOption>
                  <FormOption value="Post Graduate">Post Graduate</FormOption>
                </FormSelect>
              </Field>
              {errors.graduate && (
                <ErrorMessage>{errors.graduate.message}</ErrorMessage>
              )}
              <Field>
                <FormLabel> Profession:</FormLabel>
                <FormSelect
                  name="profession"
                  {...register("profession", {
                    required: "select your profession",
                  })}
                >
                  <FormOption value="">Choose a below option</FormOption>
                  <FormOption value="Completed the graduation">
                    Completed the graduation
                  </FormOption>
                  <FormOption value="Looking for a trainer">
                    Looking for a trainer
                  </FormOption>
                  <FormOption value="Seeking for a job">
                    Seeking for a job
                  </FormOption>
                  <FormOption value="Learning a new skills">
                    Learning a new skills
                  </FormOption>
                  <FormOption value="Working Professional">
                    Working Professional
                  </FormOption>
                </FormSelect>
              </Field>
              {errors.profession && (
                <ErrorMessage>{errors.profession.message}</ErrorMessage>
              )}
              <Field>
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
              </Field>
              {errors.experience && (
                <ErrorMessage>{errors.experience.message}</ErrorMessage>
              )}
              <Field>
                <FormLabel>Address:</FormLabel>
                <TextArea
                  {...register("address", {
                    required: "Please add the address",
                  })}
                ></TextArea>
                {errors.address && (
                  <ErrorMessage>{errors.address.message}</ErrorMessage>
                )}
              </Field>
              <Field>
                <FormLabel>Profile Picture:</FormLabel>
                <Input
                  required
                  type="file"
                  name="image"
                  placeholder="Choose the profile picture"
                  onChange={(event) => setImage(event.target.files[0])}
                />
              </Field>
              <FormBtn>Update Profile</FormBtn>
            </Form>
          </FormDiv>
        </SingleProfileWrapper>
      </SingleProfileSection>
    </SingleProfileSect>
  );
};

export default SingleProfile;
