import React, { Suspense, useState } from "react";

import styled from "styled-components";
import GoToTop from "../Components/GoToTop";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Components/utils/Loading";
import LoadingSpinner from "../Components/utils/LoadingSpinner";
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const NavbarRes = React.lazy(() => import("../Components/Navbar/NavbarRes"));
const PwdSectionSection = styled.section`
  height: 50vh;
  width: 100%;
`;
const PwdSectionDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 50px 0px;
`;
const PwdSectionWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    width: 90%;
  }
`;
const Form = styled.form`
  width: 100%;
  padding: 100px 0px;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;
const Field = styled.div`
  height: 50px;
  width: 100%;
  margin-top: 20px;
`;
const InputButton = styled.button`
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 15px;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  color: #fff;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  font-size: 20px;
  font-weight: 500;
  padding-left: 0;
  border: none;
  cursor: pointer;
  background: -webkit-linear-gradient(left, #3e5ce4, #4282fa);
  &:disabled {
    cursor: not-allowed;
  }
`;
const SignInP = styled.p`
  text-decoration: none;
  color: #fa4299;
  cursor: pointer;
  font-size: 21px;
  &:hover {
    text-decoration: underline;
  }
`;
const ActivateAccountPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const activateAccount = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:1100/api/auth/email-account-activate/${params.id}`,
        { signUpToken: params.id }
      );
      if (res.data.token) {
        setError(res.data.error);
        toast.success(res.data.success, { position: "top-center" });
        // navigate(`/login`);
        setLoading(false);
      }
      if (res.data.success) {
        setSuccess(res.data.success);
        toast.success(res.data.success, { position: "top-center" });
        setLoading(false);
      }
      if (res.data.error) {
        setError(res.data.error);
        toast.error(res.data.error, { position: "top-center" });
        // navigate(`/login`);        setLoading(false);
      }
    } catch (error) {
      return;
    }
  };
  setTimeout(() => {
    setError("");
    setSuccess("");
  }, 7000);
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <NavbarRes />
        <PwdSectionSection>
          <PwdSectionDiv>
            <PwdSectionWrapper>
              <Form onSubmit={activateAccount}>
                {error && (
                  <p style={{ color: "red", fontSize: "20px" }}>{error}</p>
                )}
                {success && (
                  <p style={{ color: "green", fontSize: "20px" }}>{success}</p>
                )}
                {loading && <Loading />}
                <Field>
                  <InputButton>Activate Account</InputButton>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <SignInP> sign in</SignInP>
                  </Link>
                </Field>
              </Form>
            </PwdSectionWrapper>
          </PwdSectionDiv>
          <GoToTop />
        </PwdSectionSection>
        <Footer />
      </Suspense>
    </>
  );
};

export default ActivateAccountPage;
