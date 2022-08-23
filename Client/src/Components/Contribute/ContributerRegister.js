import React, { useState } from "react";
import LoadingSpinner from "../utils/LoadingSpinner";
import signupImg from "../../images/default-removebg-preview.png";

import {
  ContributerRegisterDiv,
  ContributerRegisterSection,
  ContributerRegisterDiv1,
  ContributerRegisterFlex,
  ContributerRegisterLeftDiv,
  ContributerRegisterRightDiv,
  FormDiv,
  FormDivFlex,
  Form,
  FormHeading,
  ButtonDiv,
  JoinButton,
  Field,
  Input,
  PwdField,
  PwdIcons,
  ShowIcon,
  HideIcon,
  ErrorMessage,
} from "./ContributerFormElements";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import GoToTop from "../GoToTop";
import { useForm } from "react-hook-form";
const ContributerRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm();
  const password = watch("password");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [loading, setLoading] = useState(false);

  const contributerRegistrationHandler = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`/contributers/register`, data);
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
      }
    } catch (error) {
      reset();
      return;
    }
  };
  return (
    <ContributerRegisterSection>
      {loading && <LoadingSpinner />}
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
      <ContributerRegisterDiv>
        <ContributerRegisterDiv1>
          <ContributerRegisterFlex>
            <ContributerRegisterLeftDiv>
              <FormDiv>
                <FormDivFlex>
                  <Form
                    action=""
                    onSubmit={handleSubmit(contributerRegistrationHandler)}
                  >
                    <FormHeading>Contributer registration</FormHeading>
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
                        {...register("firstname", {
                          required: "firstname is Required",
                          minLength: {
                            value: 4,
                            message: "Must be 4 characters at least",
                          },
                        })}
                        onKeyUp={() => {
                          trigger("firstname");
                        }}
                      />
                      {errors.firstname && (
                        <ErrorMessage>{errors.firstname.message}</ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        type="text"
                        placeholder="Enter your Last Name"
                        //onChange={(e) => setLastName(e.target.value)}
                        {...register("lastname", {
                          required: "last name is Required",
                          minLength: {
                            value: 4,
                            message: "Must be 4 characters at least",
                          },
                        })}
                        onKeyUp={() => {
                          trigger("lastname");
                        }}
                      />
                      {errors.lastname && (
                        <ErrorMessage>{errors.lastname.message}</ErrorMessage>
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
                    <ButtonDiv>
                      <JoinButton>Join As a Contributer</JoinButton> All ready
                      have a contributer account
                      <Link to="/contributers-corner/login"> login </Link>
                    </ButtonDiv>
                  </Form>
                </FormDivFlex>
              </FormDiv>
            </ContributerRegisterLeftDiv>
            <ContributerRegisterRightDiv>
              <img src={signupImg} alt="" />
            </ContributerRegisterRightDiv>
          </ContributerRegisterFlex>
        </ContributerRegisterDiv1>
      </ContributerRegisterDiv>
      <GoToTop />
    </ContributerRegisterSection>
  );
};

export default ContributerRegister;
