import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../utils/LoadingSpinner";
import {
  ButtonDiv,
  ContributerRegisterDiv,
  ContributerRegisterDiv1,
  ContributerRegisterFlex,
  ContributerRegisterLeftDiv,
  ContributerRegisterRightDiv,
  ContributerRegisterSection,
  ErrorMessage,
  Field,
  Form,
  FormDiv,
  FormDivFlex,
  FormHeading,
  HideIcon,
  Input,
  JoinButton,
  PwdField,
  PwdIcons,
  ShowIcon,
} from "./ContributerFormElements";
import signupImg from "../../images/default-removebg-preview.png";
import GoToTop from "../GoToTop";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../redux/userRedux";
import { useForm } from "react-hook-form";

const ContributerLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },

    trigger,
  } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [wrongPwd, setWrongPwd] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contributerLoginHandler = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`/contributers/login`, data);
      if (res.data.success) {
        dispatch(loginSuccess(res.data.success));
        navigate(`/`);
        setLoading(false);
        toast.success(res.data.success, { position: "top-center" });
      }
      if (res.data.notFound) {
        dispatch(loginFailure(res.data.notFound));
        setError(res.data.notFound);
        setWrongPwd("");
        // navigate(`/login`);      ;
        setLoading(false);
      }
      if (res.data.wrong) {
        dispatch(loginFailure(res.data.wrong));
        setWrongPwd(res.data.wrong);
        setError("");
        // navigate(`/login`);
        setLoading(false);
      }
    } catch (error) {
      return;
    }
  };
  return (
    <ContributerRegisterSection>
      {loading && <LoadingSpinner />}

      <ContributerRegisterDiv>
        <ContributerRegisterDiv1>
          <ContributerRegisterFlex>
            <ContributerRegisterLeftDiv>
              <FormDiv>
                <FormDivFlex>
                  <Form
                    action=""
                    onSubmit={handleSubmit(contributerLoginHandler)}
                  >
                    <FormHeading>Contributer Login</FormHeading>{" "}
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
                    )}{" "}
                    {wrongPwd && (
                      <p
                        style={{
                          color: "red",
                          textAlign: "center",
                          fontSize: "20px",
                        }}
                      >
                        {wrongPwd}
                      </p>
                    )}
                    <Field>
                      <Input
                        type="email"
                        placeholder="Enter your email....."
                        {...register("email", {
                          required: "Enter an email to login",
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
                    <PwdField>
                      <Input
                        type={showIcon ? "text" : "password"}
                        placeholder="Enter your password"
                        {...register("password", {
                          required: "Enter an Password to login",
                        })}
                        onKeyUp={() => {
                          trigger("password");
                        }}
                      />
                      <PwdIcons onClick={(e) => setShowIcon(!showIcon)}>
                        {showIcon ? <ShowIcon /> : <HideIcon />}
                      </PwdIcons>
                      {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                      )}
                    </PwdField>
                    <ButtonDiv>
                      <JoinButton>Login</JoinButton> Don't have a contributer
                      account
                      <Link to="/contributers-corner/register"> Register </Link>
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

export default ContributerLogin;
