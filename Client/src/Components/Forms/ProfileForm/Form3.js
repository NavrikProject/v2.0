import React, { useState } from "react";
import {
  CloseButton,
  ErrorMessage,
  Form,
  FormBtn,
  FormDiv,
  FormInput,
  HideIcon,
  PwdField,
  PwdIcons,
  ShowIcon,
} from "./FormProfileElements";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../utils/Loading.js";
import { useForm } from "react-hook-form";
const Form3 = (props) => {
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
  const password = watch("password");

  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;
  const onChangePasswordHandler = async (data) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `/auth/change-password/${user?.id}`,
        {
          password: data.password,
          email: user.email,
        },
        { headers: { authorization: "Bearer " + token } }
      );
      if (res.data.success) {
        setSuccess(res.data.success);
        toast.success(res.data.success, {
          position: "top-center",
        });
        setLoading(false);
        reset();
      }
      if (res.data.error) {
        setError(res.data.error);
        setSuccess("");
        setLoading(false);
        reset();
      }
    } catch (error) {}

    setLoading(false);
  };

  setTimeout(() => {
    setError("");
    setSuccess("");
  }, 15000);
  return (
    <>
      <CloseButton onClick={props.personal} />
      <FormDiv>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        {loading && <Loading />}
        <Form onSubmit={handleSubmit(onChangePasswordHandler)}>
          <PwdField>
            <FormInput
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
            <FormInput
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
          <FormBtn>Save</FormBtn>
        </Form>
      </FormDiv>
    </>
  );
};

export default Form3;
