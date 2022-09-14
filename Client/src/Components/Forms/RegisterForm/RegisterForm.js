import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  RegisterFormSect,
  RegisterFormSection,
  RegisterFormWrapper,
  FormInner,
  Form,
  Field,
  Input,
  InputButton,
  SignUpLink,
  SignLinkB,
  FormLabel,
  FormInput,
  FormLabelDiv,
  PwdField,
  PwdIcons,
  ShowIcon,
  HideIcon,
  RegisterFormLeft,
  InputRadio,
  RadioWrapper,
  InputRadLabel,
  ErrorMessage,
  RegisterFormRight,
  RegistrationImageDiv,
  RegistrationImage,
} from "./RegisterFormElements";
import GoToTop from "../../GoToTop";
import { toast } from "react-toastify";
import Loading from "../../utils/Loading";
import { useForm } from "react-hook-form";
import regImg from "../../../images/reg-img.jpg";
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const password = watch("password");

  const registerSubmitHandler = async (data) => {
    // // http:localhost:5000/api/auth/register
    console.log(data);
    try {
      setLoading(true);
      const res = await axios.post("/auth/email-register", data);
      if (res.data.required) {
        setError(res.data.required);
        toast.error(res.data.required, { position: "top-center" });
        setLoading(false);
      }
      if (res.data.exists) {
        setError(res.data.exists);
        toast.error(res.data.exists, { position: "top-center" });
        setLoading(false);
      }
      if (res.data.error) {
        setError(res.data.error);
        toast.error(res.data.error, { position: "top-center" });
        setLoading(false);
        reset();
      }
      if (res.data.success) {
        setSuccess(res.data.success);
        toast.success(res.data.success, { position: "top-center" });
        setLoading(false);
        reset();
      }
      setLoading(false);
    } catch (error) {
      return;
    }
  };
  setTimeout(() => {
    setError("");
  }, 7000);

  const UploadFile = async (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append("image", image);
    try {
      const res = await axios.post("/feedback/upload", data);
    } catch (error) {}
  };
  return (
    <React.Fragment>
      <RegisterFormSect>
        <RegisterFormSection>
          <RegisterFormWrapper>
            <RegisterFormLeft>
              <FormInner>
                <Form onSubmit={handleSubmit(registerSubmitHandler)}>
                  {success && <p style={{ color: "green" }}>{success}</p>}
                  {error ? <p style={{ color: "red" }}>{error}</p> : null}
                  {loading && <Loading />}
                  <Field>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Email must be Required for registration",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("email");
                      }}
                    />
                    {errors.email && (
                      <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                  </Field>
                  <Field>
                    <Input
                      type="text"
                      placeholder="Enter your First Name"
                      {...register("firstName", {
                        required: "firstname is Required",
                        minLength: {
                          value: 4,
                          message: "Must be 4 characters at least",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("firstName");
                      }}
                    />
                    {errors.firstName && (
                      <ErrorMessage>{errors.firstName.message}</ErrorMessage>
                    )}
                  </Field>
                  <Field>
                    <Input
                      type="text"
                      placeholder="Enter your Last Name"
                      //onChange={(e) => setLastName(e.target.value)}
                      {...register("lastName", {
                        required: "last name is Required",
                        minLength: {
                          value: 4,
                          message: "Must be 4 characters at least",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("lastName");
                      }}
                    />
                    {errors.lastName && (
                      <ErrorMessage>{errors.lastName.message}</ErrorMessage>
                    )}
                  </Field>
                  <PwdField>
                    <Input
                      type={showIcon ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is Required",
                        pattern: {
                          value:
                            /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                          message:
                            "A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("password");
                      }}
                    />
                    {errors.password && (
                      <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                    <PwdIcons onClick={(e) => setShowIcon(!showIcon)}>
                      {showIcon ? <ShowIcon /> : <HideIcon />}
                    </PwdIcons>
                  </PwdField>
                  <PwdField>
                    <Input
                      type={showIcons ? "text" : "password"}
                      placeholder="Confirm Your Password"
                      //onChange={(e) => setConfirmPassword(e.target.value)}
                      {...register("confirmPassword", {
                        required: "Enter confirm password",
                        validate: (value) =>
                          value === password || "Password must be matched",
                      })}
                      onKeyUp={() => {
                        trigger("confirmPassword");
                      }}
                    />
                    {errors.confirmPassword && (
                      <ErrorMessage>
                        {errors.confirmPassword.message}
                      </ErrorMessage>
                    )}
                    <PwdIcons onClick={() => setShowIcons(!showIcons)}>
                      {showIcons ? <ShowIcon /> : <HideIcon />}
                    </PwdIcons>
                  </PwdField>
                  <Field>
                    <RadioWrapper>
                      <RadioWrapper>
                        <InputRadio
                          type="radio"
                          id="trainee"
                          value="trainee"
                          {...register("type", {
                            required: "User type  is Required",
                          })}
                        />
                        <InputRadLabel htmlFor="trainee">Trainee</InputRadLabel>
                      </RadioWrapper>
                      <RadioWrapper>
                        <InputRadio
                          type="radio"
                          id="trainer"
                          value="trainer"
                          {...register("type", {
                            required: "User type  is Required",
                          })}
                        />
                        <InputRadLabel htmlFor="trainee">Trainer</InputRadLabel>
                      </RadioWrapper>
                      <RadioWrapper>
                        <InputRadio
                          type="radio"
                          id="job-seeker"
                          value="job-seeker"
                          {...register("type", {
                            required: "User type  is Required",
                          })}
                        />
                        <InputRadLabel htmlFor="trainee">
                          Job-seeker
                        </InputRadLabel>
                      </RadioWrapper>
                      <RadioWrapper>
                        <InputRadio
                          type="radio"
                          id="recruiter"
                          value="recruiter"
                          {...register("type", {
                            required: "User type  is Required",
                          })}
                        />
                        <InputRadLabel htmlFor="trainee">
                          Recruiter
                        </InputRadLabel>
                      </RadioWrapper>
                    </RadioWrapper>
                    {errors.type && (
                      <ErrorMessage>{errors.type.message}</ErrorMessage>
                    )}
                  </Field>
                  <FormLabelDiv>
                    <FormInput
                      type="checkbox"
                      {...register("checkBox", {
                        required: "Must be checked before submission",
                      })}
                    />
                    <FormLabel>
                      I have read all
                      <Link
                        to="/terms-conditions"
                        style={{ textDecoration: "none", color: " #fa4299" }}
                      >
                        Terms & Conditions.
                      </Link>
                    </FormLabel>
                  </FormLabelDiv>{" "}
                  {errors.checkBox && (
                    <ErrorMessage>{errors.checkBox.message}</ErrorMessage>
                  )}
                  <Field>
                    <InputButton type="submit">Register</InputButton>
                  </Field>
                  <SignUpLink>
                    Have An account ?
                    <Link to={`/login`} style={{ textDecoration: "none" }}>
                      <SignLinkB> Sign in Right now</SignLinkB>
                    </Link>
                  </SignUpLink>
                </Form>
              </FormInner>
            </RegisterFormLeft>
            <RegisterFormRight>
              <RegistrationImageDiv>
                {/* <RegistrationImage src={regImg} /> */}
                <input
                  type="file"
                  name="image"
                  onChange={(event) => setImage(event.target.files[0])}
                />
                <button type="submit" onClick={UploadFile}>
                  Upload
                </button>
              </RegistrationImageDiv>
            </RegisterFormRight>
          </RegisterFormWrapper>
        </RegisterFormSection>
      </RegisterFormSect>
      <GoToTop />
    </React.Fragment>
  );
};

export default RegisterForm;
