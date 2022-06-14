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
  PasswordDiv,
  PassLink,
  PassLinkA,
} from "./PwdResetElements";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import GoToTop from "../../GoToTop.js";
import Loading from "../../utils/Loading";

const ResetPassword = () => {
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
  const params = useParams();
  const token = params.id;
  const navigate = useNavigate();
  const forgotpasswordHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return setError("Password must be matched the criteria");
    }
    setLoading(true);
    const res = await axios.put(
      `/auth/reset-password/${token}`,
      { password: password },
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    if (res.data.success) {
      setSuccess(res.data.success);
      toast.success("Successfully update the password ,Please log in", {
        position: "top-center",
      });
      setLoading(false);
      navigate("/login");
    }
    if (res.data.token || res.data.error) {
      setError(res.data.token);
      toast.error(res.data.token);
      setLoading(false);
    }
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <PwdSectionSection>
      <PwdSectionDiv>
        <PwdSectionWrapper>
          <Form onSubmit={forgotpasswordHandler}>
            {error && <p style={{ color: "red", fontSize: "20px" }}>{error}</p>}
            {success && (
              <p style={{ color: "green", fontSize: "20px" }}>{success}</p>
            )}
            {loading && <Loading />}
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
                  <p style={{ color: "green" }}>Password contains Numbers</p>
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
              <InputButton
                type="submit"
                disabled={!password || !confirmPassword}
              >
                Reset Password
              </InputButton>
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
