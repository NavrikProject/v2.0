import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Wrapper,
  FormContainer,
  FormInner,
  Form,
  Field,
  Input,
  InputButton,
  PassLink,
  PassLinkA,
  SignUpLink,
  SignLinkB,
  SlideControls,
  WrapperCenter,
  WrapperRight,
  WrapperLeft,
  WrapperLeftImg,
  SlideDiv1,
  SlideDiv2,
  SlideDiv3,
  SlideDiv4,
  PwdField,
  PwdIcons,
  ShowIcon,
  HideIcon,
  HomeSectionComponent,
  LoginWrapper,
  SuccessDiv,
  SlideDiv5,
  ErrorMessage,
} from "./LoginFormElements";
// import StudentImg from "../../../images/student-rm.png";
// import TraineeImg from "../../../images/trainer-rm.png";
// import HireImg from "../../../images/hire-rm.png";
// import TrainerImg from "../../../images/trainee-rm.png";
import GoToTop from "../../GoToTop";
import Loading from "../../utils/Loading";
// import jwtDecode from "jwt-decode";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../../redux/userRedux";
import { useForm } from "react-hook-form";

import axios from "axios";
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const [type, setType] = useState("trainee");
  const [error, setError] = useState("");
  const [wrongPwd, setWrongPwd] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // login function handler
  const loginFormSubmitHandler = async (data) => {
    try {
      dispatch(loginStart());
      setLoading(true);
      const res = await axios.post(
        "/auth/login",
        {
          data: data,
          type: type,
        },
        (err, data) => {
          if (err) {
            return;
          }
        }
      );
      if (res.data.success) {
        dispatch(loginSuccess(res.data.success));
        navigate(`/`);
        setLoading(false);
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
  setTimeout(() => {
    setError("");
    setWrongPwd("");
    setLoading(false);
  }, 7000);

  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const [isActive5, setIsActive5] = useState(false);

  const isActiveToggle1 = (e) => {
    setIsActive1(true);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    const name = e.target.innerHTML;
    setType(name.toLowerCase());
  };

  const isActiveToggle2 = (e) => {
    setIsActive2(true);
    setIsActive1(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    const name = e.target.innerHTML;
    setType(name.toLowerCase());
  };
  const isActiveToggle3 = (e) => {
    setIsActive3(true);
    setIsActive2(false);
    setIsActive1(false);
    setIsActive4(false);
    setIsActive5(false);
    const name = e.target.innerHTML;
    setType(name.toLowerCase());
  };
  const isActiveToggle4 = (e) => {
    setIsActive4(true);
    setIsActive2(false);
    setIsActive1(false);
    setIsActive3(false);
    setIsActive5(false);
    const name = e.target.innerHTML;
    setType(name.toLowerCase());
  };
  const isActiveToggle5 = (e) => {
    setIsActive5(true);
    setIsActive2(false);
    setIsActive1(false);
    setIsActive3(false);
    setIsActive4(false);
    const name = e.target.innerHTML;
    setType(name.toLowerCase());
  };
  return (
    <HomeSectionComponent>
      <LoginWrapper>
        <Wrapper>
          <WrapperRight>
            {/* <WrapperRightImg src={StudentImg} />
            <WrapperRightImg src={TraineeImg} /> */}
          </WrapperRight>
          <WrapperCenter>
            <SuccessDiv>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {wrongPwd && <p style={{ color: "red" }}>{wrongPwd}</p>}
              {loading && <Loading />}
            </SuccessDiv>
            <FormContainer>
              <SlideControls>
                <SlideDiv1
                  value="trainee"
                  isActive1={isActive1}
                  onClick={isActiveToggle1}
                >
                  Trainee
                </SlideDiv1>
                <SlideDiv2
                  value="trainer"
                  isActive2={isActive2}
                  onClick={isActiveToggle2}
                >
                  Trainer
                </SlideDiv2>
                <SlideDiv5
                  value="mentor"
                  isActive5={isActive5}
                  onClick={isActiveToggle5}
                >
                  Mentor
                </SlideDiv5>
                <SlideDiv3
                  value="jobseeker"
                  isActive3={isActive3}
                  onClick={isActiveToggle3}
                >
                  Job-Seeker
                </SlideDiv3>
                <SlideDiv4
                  value="hire"
                  isActive4={isActive4}
                  onClick={isActiveToggle4}
                >
                  Recruiter
                </SlideDiv4>
              </SlideControls>
              <FormInner>
                <Form onSubmit={handleSubmit(loginFormSubmitHandler)}>
                  <Field>
                    <Input
                      type="text"
                      placeholder="Enter your email"
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
                  </PwdField>
                  {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                  )}
                  <PassLink>
                    <PassLinkA>
                      <Link
                        to="/forgot-password"
                        style={{ textDecoration: "none", color: "#fa4299" }}
                      >
                        Forgot Password ?
                      </Link>
                    </PassLinkA>
                  </PassLink>
                  <Field>
                    <InputButton type="submit">Login</InputButton>
                  </Field>
                  <SignUpLink>
                    Not a Member yet ?
                    <Link to={`/register`} style={{ textDecoration: "none" }}>
                      <SignLinkB> Sign up Right now</SignLinkB>
                    </Link>
                  </SignUpLink>
                </Form>
              </FormInner>
            </FormContainer>
          </WrapperCenter>
          <WrapperLeft>
            <WrapperLeftImg />
            {/* <WrapperRightImg src={TrainerImg} />
            <WrapperRightImg src={HireImg} /> */}
          </WrapperLeft>
        </Wrapper>
      </LoginWrapper>
      <GoToTop />
    </HomeSectionComponent>
  );
};

export default LoginForm;
