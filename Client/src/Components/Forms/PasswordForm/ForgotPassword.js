import React, { useState } from "react";
import {
  Field,
  Form,
  PwdSectionSection,
  Input,
  PwdSectionDiv,
  PwdSectionWrapper,
  InputButton,
} from "./PwdResetElements";
import GoToTop from "../../GoToTop.js";
import Loading from "../../utils/Loading";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const forgotpasswordHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const res = await axios.post("/auth/forgot-password", { email: email });
    if (res.data.success) {
      setSuccess(res.data.success);
      setLoading(false);
    }
    if (res.data.error) {
      setError(res.data.error);
      setLoading(false);
    }
    setEmail("");
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
            <Field>
              <Input
                required
                value={email}
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field>
              <InputButton type="submit" disabled={!email}>
                Forgot Password
              </InputButton>
            </Field>
          </Form>
        </PwdSectionWrapper>
      </PwdSectionDiv>
      <GoToTop />
    </PwdSectionSection>
  );
};

export default ForgotPassword;
