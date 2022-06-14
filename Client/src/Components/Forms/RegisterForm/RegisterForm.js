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
  PasswordDiv,
  PwdField,
  PwdIcons,
  ShowIcon,
  HideIcon,
  RegisterFormLeft,
  InputRadio,
  RadioWrapper,
  InputRadLabel,
} from "./RegisterFormElements";
import GoToTop from "../../GoToTop";
import { toast } from "react-toastify";
import Loading from "../../utils/Loading";
const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("trainee");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [loading, setLoading] = useState(false);
  let pwdMinCharLen = password.length >= 8;
  let pwdHasLowChar = /(.*?[a-z].*)/.test(password);
  let pwdHasCapChar = /(?=.*?[A-Z].*)/.test(password);
  let pwdHasSplChar = /(?=.*?[#?!@$%^&*-].*)/.test(password);
  let pwdHasNumChar = /(?=.*?[0-9].*)/.test(password);
  let pwdMaxCharLen = password.length <= 16;
  const typeHandler = (event) => {
    setType(event.target.value);
  };
  const registerSubmitHandler = async (event) => {
    event.preventDefault();
    // http:localhost:5000/api/auth/register
    try {
      setLoading(true);
      const res = await axios.post("/auth/email-register", {
        email: email,
        firstName: firstName,
        lastName: lastName,
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
      setEmail("");
      setPassword("");
      setType("");
      setFirstName("");
      setLastName("");
      setConfirmPassword("");
      setLoading(false);
    } catch (error) {
      return;
    }
  };
  setTimeout(() => {
    setError("");
  }, 7000);

  return (
    <React.Fragment>
      <RegisterFormSect>
        <RegisterFormSection>
          <RegisterFormWrapper>
            <RegisterFormLeft>
              <FormInner>
                <Form onSubmit={registerSubmitHandler}>
                  {success && <p style={{ color: "green" }}>{success}</p>}
                  {error ? <p style={{ color: "red" }}>{error}</p> : null}
                  {loading && <Loading />}
                  <Field>
                    <Input
                      value={email}
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <Input
                      value={firstName}
                      required
                      type="text"
                      placeholder="Enter your First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <Input
                      required
                      value={lastName}
                      type="text"
                      placeholder="Enter your Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Field>
                  <PwdField>
                    <Input
                      value={password}
                      required={true}
                      type={showIcon ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
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
                      value={confirmPassword}
                      required={true}
                      type={showIcons ? "text" : "password"}
                      placeholder="Confirm Your Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <PwdIcons onClick={() => setShowIcons(!showIcons)}>
                      {showIcons ? <ShowIcon /> : <HideIcon />}
                    </PwdIcons>
                  </PwdField>

                  {password && confirmPassword && (
                    <PasswordDiv>
                      {password !== confirmPassword ? (
                        <p style={{ color: "red" }}>Password does not match</p>
                      ) : (
                        <p style={{ color: "green" }}>Password matched</p>
                      )}
                    </PasswordDiv>
                  )}
                  <Field>
                    <RadioWrapper>
                      <RadioWrapper>
                        <InputRadio
                          type="radio"
                          id="trainee"
                          value="trainee"
                          checked={type === "trainee"}
                          onChange={typeHandler}
                        />
                        <InputRadLabel for="trainee">Trainee</InputRadLabel>
                      </RadioWrapper>

                      <RadioWrapper>
                        <InputRadio
                          type="radio"
                          id="trainer"
                          value="trainer"
                          checked={type === "trainer"}
                          onChange={typeHandler}
                        />
                        <InputRadLabel for="trainee">Trainer</InputRadLabel>
                      </RadioWrapper>
                      <RadioWrapper>
                        <InputRadio
                          type="radio"
                          id="job-seeker"
                          value="job-seeker"
                          checked={type === "job-seeker"}
                          onChange={typeHandler}
                        />
                        <InputRadLabel for="trainee">Job-seeker</InputRadLabel>
                      </RadioWrapper>
                      <RadioWrapper>
                        <InputRadio
                          type="radio"
                          id="recruiter"
                          value="recruiter"
                          checked={type === "recruiter"}
                          onChange={typeHandler}
                        />
                        <InputRadLabel for="trainee">Recruiter</InputRadLabel>
                      </RadioWrapper>
                    </RadioWrapper>
                  </Field>
                  {/* <Field>
                    <FormLabel>Choose One Option </FormLabel>
                    <FormSelect
                      required
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <FormOption>Choose a below option</FormOption>
                      <FormOption value="trainee">Trainee</FormOption>
                      <FormOption value="trainer">Trainer</FormOption>
                      <FormOption value="job-seeker">Job Seeker</FormOption>
                      <FormOption value="recruiter">Recruiter</FormOption>
                    </FormSelect>
                  </Field> */}
                  <FormLabelDiv>
                    <FormInput type="checkbox" required />
                    <FormLabel>
                      I have read all
                      <Link
                        to="/terms-conditions"
                        style={{ textDecoration: "none", color: " #fa4299" }}
                      >
                        Terms & Conditions.
                      </Link>
                    </FormLabel>
                  </FormLabelDiv>
                  <Field>
                    <InputButton type="submit" disabled={!email || !password}>
                      Register
                    </InputButton>
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
          </RegisterFormWrapper>
        </RegisterFormSection>
      </RegisterFormSect>
      <GoToTop />
    </React.Fragment>
  );
};

export default RegisterForm;
