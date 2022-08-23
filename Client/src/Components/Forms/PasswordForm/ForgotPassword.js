import React, { useState } from "react";
import {
  Field,
  Form,
  PwdSectionSection,
  Input,
  PwdSectionDiv,
  PwdSectionWrapper,
  InputButton,
  ErrorMessage,
} from "./PwdResetElements";
import { useForm } from "react-hook-form";
import GoToTop from "../../GoToTop.js";
import Loading from "../../utils/Loading";
import axios from "axios";
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const forgotpasswordHandler = async (data) => {
    setLoading(true);
    const res = await axios.post("/auth/forgot-password", data);
    if (res.data.success) {
      setSuccess(res.data.success);
      setLoading(false);
      reset();
    }
    if (res.data.error) {
      setError(res.data.error);
      setLoading(false);
      reset();
    }
  };
  return (
    <PwdSectionSection>
      <PwdSectionDiv>
        <PwdSectionWrapper>
          <Form onSubmit={handleSubmit(forgotpasswordHandler)}>
            {error && <p style={{ color: "red", fontSize: "20px" }}>{error}</p>}
            {success && (
              <p style={{ color: "green", fontSize: "20px" }}>{success}</p>
            )}
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
              <InputButton type="submit">Forgot Password</InputButton>
            </Field>
          </Form>
        </PwdSectionWrapper>
      </PwdSectionDiv>
      <GoToTop />
    </PwdSectionSection>
  );
};

export default ForgotPassword;
