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
  PasswordDiv,
} from "./ContributerFormElements";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import GoToTop from "../GoToTop";
const ContributerRegister = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [confirmShowIcon, setConfirmShowIcon] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let pwdMinCharLen = password.length >= 8;
  let pwdHasLowChar = /(.*?[a-z].*)/.test(password);
  let pwdHasCapChar = /(?=.*?[A-Z].*)/.test(password);
  let pwdHasSplChar = /(?=.*?[#?!@$%^&*-].*)/.test(password);
  let pwdHasNumChar = /(?=.*?[0-9].*)/.test(password);
  let pwdMaxCharLen = password.length <= 16;
  const contributerRegistrationHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`/contributers/register`, {
        email: email,
        firstname: firstName,
        lastname: lastName,
        password: password,
      });
      if (res.data.success) {
        setSuccess(res.data.success);
        toast.success(res.data.success, { position: "top-center" });
        setLoading(false);
      }
      if (res.data.error) {
        setError(res.data.error);
        toast.error(res.data.error, { position: "top-center" });
        setLoading(false);
      }
    } catch (error) {
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
                  <Form action="" onSubmit={contributerRegistrationHandler}>
                    <FormHeading>Contributer registration</FormHeading>
                    <Field>
                      <Input
                        value={email}
                        type="email"
                        placeholder="Enter your email....."
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </Field>
                    <Field>
                      <Input
                        value={firstName}
                        type="text"
                        placeholder="Enter your Firstname"
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                      />
                    </Field>
                    <Field>
                      <Input
                        value={lastName}
                        type="text"
                        placeholder="Enter your Lastname"
                        onChange={(event) => setLastName(event.target.value)}
                        required
                      />
                    </Field>
                    <PwdField>
                      <Input
                        type={showIcon ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
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
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        required={true}
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
