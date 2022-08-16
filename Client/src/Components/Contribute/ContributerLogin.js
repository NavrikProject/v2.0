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

const ContributerLogin = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [wrongPwd, setWrongPwd] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contributerLoginHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`/contributers/login`, {
        email: email,
        password: password,
      });
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
                  <Form action="" onSubmit={contributerLoginHandler}>
                    <FormHeading>Contributer Login</FormHeading>
                    <Field>
                      <Input
                        value={email}
                        type="email"
                        placeholder="Enter your email....."
                        onChange={(event) => setEmail(event.target.value)}
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
                      />
                      <PwdIcons onClick={(e) => setShowIcon(!showIcon)}>
                        {showIcon ? <ShowIcon /> : <HideIcon />}
                      </PwdIcons>
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
