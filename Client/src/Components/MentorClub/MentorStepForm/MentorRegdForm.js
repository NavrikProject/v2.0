import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import GoToTop from "../../GoToTop";
import {
  MentorRegisterDiv,
  MentorRegisterSection,
  MentorRegisterDiv1,
  MentorRegisterFlex,
  MentorRegisterLeftDiv,
  MentorRegisterRightDiv,
  FormDivFlex,
  Form,
  FormDiv,
  Field,
  Input,
  PwdField,
  PwdIcons,
  ShowIcon,
  HideIcon,
  PasswordDiv,
  SignUpButton,
} from "./MentorRegisterStepELements";
import GoogleLogin from "react-google-login";

import signupImg from "../../../images/default-removebg-preview.png";
import Loading from "../../utils/LoadingSpinner";
import { loginFailure, loginSuccess } from "../../../redux/userRedux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const MentorRegdForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmShowIcon, setConfirmShowIcon] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let pwdMinCharLen = password.length >= 8;
  let pwdHasLowChar = /(.*?[a-z].*)/.test(password);
  let pwdHasCapChar = /(?=.*?[A-Z].*)/.test(password);
  let pwdHasSplChar = /(?=.*?[#?!@$%^&*-].*)/.test(password);
  let pwdHasNumChar = /(?=.*?[0-9].*)/.test(password);
  let pwdMaxCharLen = password.length <= 16;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profileSubmitHandler = async (event) => {
    event.preventDefault();
    const type = "mentor";
    try {
      setLoading(true);
      const res = await axios.post("/auth/email-register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        type: type,
      });
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
      }
      if (res.data.success) {
        setSuccess(res.data.success);
        toast.success(res.data.success, { position: "top-center" });
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      return;
    }
  };
  setTimeout(() => {
    setError("");
    setSuccess("");
  }, 7000);

  const responseSuccessGoogle = async (response) => {
    const type = "mentor";
    try {
      await axios
        .post("/google/sign-up", { tokenId: response.tokenId, type: type })
        .then((res) => {
          if (res.data.found) {
            dispatch(loginSuccess(res.data.found));
            navigate(`/`);
            setLoading(false);
          }
          if (res.data.success) {
            dispatch(loginSuccess(res.data.success));
            navigate(`/mentor/registration-success`);
            setLoading(false);
          }
          if (res.data.notFound) {
            dispatch(loginFailure(res.data.notFound));
            setError(res.data.notFound);
            // navigate(`/login`);      ;
            setLoading(false);
          }
          if (res.data.wrong) {
            dispatch(loginFailure(res.data.wrong));
            setError("");
            // navigate(`/login`);
            setLoading(false);
          }
        });
    } catch (error) {}
  };
  const responseErrorGoogle = (response) => {};
  return (
    <MentorRegisterSection>
      {loading && <Loading />}
      <MentorRegisterDiv>
        <MentorRegisterDiv1>
          <MentorRegisterFlex>
            <MentorRegisterLeftDiv>
              <FormDiv>
                <FormDivFlex>
                  <Form action="" onSubmit={profileSubmitHandler}>
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
                      <p
                        style={{
                          color: "green",
                          textAlign: "center",
                          fontSize: "20px",
                        }}
                      >
                        {success}
                      </p>
                    )}
                    <Field>
                      <Input
                        value={email}
                        type="email"
                        placeholder="Enter your email....."
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </Field>
                    <Field>
                      <Input
                        type="text"
                        placeholder="Enter your First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Field>
                    <Field>
                      <Input
                        type="text"
                        placeholder="Enter your Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Field>
                    <PwdField>
                      <Input
                        // onFocus={() =>
                        //   setErrorData({ ...errorData, password: "" })
                        // }
                        type={showIcon ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
                      />
                      <PwdIcons onClick={(e) => setShowIcon(!showIcon)}>
                        {showIcon ? <ShowIcon /> : <HideIcon />}
                      </PwdIcons>
                    </PwdField>
                    {password && (
                      <PasswordDiv>
                        {pwdMinCharLen && pwdMaxCharLen ? (
                          <p style={{ color: "green" }}>
                            Password is between 8 and 16 characters
                          </p>
                        ) : (
                          <p style={{ color: "red" }}>
                            Password must more than 8 and less than 16
                          </p>
                        )}

                        {pwdHasLowChar ? (
                          <p style={{ color: "green" }}>
                            Password contains small letters
                          </p>
                        ) : (
                          <p style={{ color: "red" }}>
                            Password must be contain small letters
                          </p>
                        )}
                        {pwdHasCapChar ? (
                          <p style={{ color: "green" }}>
                            Password contains capital letters
                          </p>
                        ) : (
                          <p style={{ color: "red" }}>
                            Password must be contain capital letters
                          </p>
                        )}
                        {pwdHasSplChar ? (
                          <p style={{ color: "green" }}>
                            Password contains Special characters
                          </p>
                        ) : (
                          <p style={{ color: "red" }}>
                            Password must be contain Special characters
                          </p>
                        )}
                        {pwdHasNumChar ? (
                          <p style={{ color: "green" }}>
                            Password contains Numbers
                          </p>
                        ) : (
                          <p style={{ color: "red" }}>
                            Password must be at lease one number
                          </p>
                        )}
                      </PasswordDiv>
                    )}
                    <PwdField>
                      <Input
                        // onFocus={() =>
                        //   setErrorData({ ...errorData, confirmPassword: "" })
                        // }
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        type={confirmShowIcon ? "text" : "password"}
                        placeholder="Confirm Your Password"
                      />
                      <PwdIcons
                        onClick={() => setConfirmShowIcon(!confirmShowIcon)}
                      >
                        {confirmShowIcon ? <ShowIcon /> : <HideIcon />}
                      </PwdIcons>
                    </PwdField>
                    {password && confirmPassword && (
                      <PasswordDiv>
                        {password !== confirmPassword ? (
                          <p style={{ color: "red" }}>
                            Password does not match
                          </p>
                        ) : (
                          <p style={{ color: "green" }}>Password matched</p>
                        )}
                      </PasswordDiv>
                    )}
                    <Field>
                      <SignUpButton>Signup</SignUpButton>
                    </Field>
                    <Field>
                      <p style={{ textAlign: "center" }}>Or</p>
                    </Field>
                    <Field>
                      <GoogleLogin
                        className="form-control"
                        clientId="891191045055-s1oqh8ebas7ul36fh4lvvm4ejg1m8fb5.apps.googleusercontent.com"
                        buttonText="Sign Up with google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                    </Field>
                  </Form>
                </FormDivFlex>
              </FormDiv>
            </MentorRegisterLeftDiv>
            <MentorRegisterRightDiv>
              <img src={signupImg} alt="" />
            </MentorRegisterRightDiv>
          </MentorRegisterFlex>
        </MentorRegisterDiv1>
      </MentorRegisterDiv>
      <GoToTop />
    </MentorRegisterSection>
  );
};

export default MentorRegdForm;
