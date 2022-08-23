import axios from "axios";
import React, { useState } from "react";
import { PwdIcons } from "../RegisterForm/RegisterFormElements";
import {
  Field,
  Form,
  PwdSectionSection,
  PwdSectionDiv,
  PwdSectionWrapper,
  InputButton,
  PwdField,
  Input,
  ShowIcon,
  HideIcon,
  PassLink,
  PassLinkA,
  ErrorMessage,
} from "./PwdResetElements";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import GoToTop from "../../GoToTop.js";
import Loading from "../../utils/Loading";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const token = params.id;
  const navigate = useNavigate();
  const password = watch("password");
  const forgotpasswordHandler = async (data) => {
    setLoading(true);
    const res = await axios.put(`/auth/reset-password/${token}`, data, {
      headers: { authorization: "Bearer " + token },
    });
    if (res.data.success) {
      setSuccess(res.data.success);
      toast.success("Successfully update the password ,Please log in", {
        position: "top-center",
      });
      setLoading(false);
      navigate("/login");
      reset();
    }
    if (res.data.token || res.data.error) {
      setError(res.data.token);
      toast.error(res.data.token);
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
                      "A minimum 8 to 16 characters password contains a combination of uppercase, lowercase letter , special character and number are required.",
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
                <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
              )}
              <PwdIcons onClick={() => setShowIcons(!showIcons)}>
                {showIcons ? <ShowIcon /> : <HideIcon />}
              </PwdIcons>
            </PwdField>
            <Field>
              <InputButton type="submit">Reset Password</InputButton>
            </Field>
            <PassLink>
              <PassLinkA>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#fa4299" }}
                >
                  Login
                </Link>
              </PassLinkA>
            </PassLink>
          </Form>
        </PwdSectionWrapper>
      </PwdSectionDiv>
      <GoToTop />
    </PwdSectionSection>
  );
};

export default ResetPassword;
