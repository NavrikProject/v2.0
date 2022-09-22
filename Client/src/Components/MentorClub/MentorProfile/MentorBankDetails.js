import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ifsc from "ifsc";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "../../utils/Loading.js";
const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
const FormInput = styled.input`
  margin-top: 10px;
  height: 45px;
  width: 100%;
  outline: none;
  padding-left: 15px;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  &:focus {
    border-color: #fc83bb;
  }
`;
const FormBtn = styled.button`
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 10px 30px;
  margin-top: 20px;
  background-color: blue;
  color: white;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
const FormDiv = styled.div`
  padding: 50px;
  margin-left: 20px;
  @media only screen and (max-width: 868px) {
    padding: 30px 20px;
    margin-left: 0px;
  }
  @media only screen and (max-width: 468px) {
    padding: 20px 10px;
    margin-left: 0px;
  }
`;
const FormLabel = styled.label`
  font-size: 21px;
  width: 100%;
  margin-bottom: 10px;
`;
const ForDiv = styled.div`
  padding-bottom: 20px;
  &:nth-child(4) {
    padding-bottom: 10px;
  }
`;
const FormFlex = styled.div`
  display: flex;
  align-items: center;
`;
const FormInputCheck = styled.input`
  width: 40px;
  height: 25px;
  margin: 0 10px 10px;
`;

const CloseButton = styled(AiOutlineClose)`
  font-size: 25px;
  color: #111;
  cursor: pointer;
  position: absolute;
  top: 14px;
  right: 16px;
`;
const MentorBankDetails = (props) => {
  const [ifscCode, setIfscCode] = useState("");
  const [validIfscCode, setValidIfscCode] = useState(false);
  const [confirmValidIfscCode, setConfirmValidIfscCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(false);
  const [showErrorMessage, setErrorShowMessage] = useState(false);
  const [showSuccessMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  let upperLetters = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/.test(ifscCode);
  const user = useSelector((state) => state.user.currentUser);
  const verifyIfscCode = async (event) => {
    event.preventDefault();
    if (
      !accountNumber ||
      !confirmAccountNumber ||
      !ifscCode ||
      !confirmValidIfscCode ||
      !fullName ||
      accountNumber !== confirmAccountNumber ||
      ifscCode !== confirmValidIfscCode
    ) {
      setErrorShowMessage(true);
    } else {
      setLoading(true);
      const response = await axios.post(
        `/mentor/profile/bank/details/add/${user?.id}`,
        {
          accountNumber: accountNumber,
          ifscCode: ifscCode,
          fullName: fullName,
        },
        { headers: { authorization: "Bearer " + user?.accessToken } }
      );
      if (response.data.success) {
        setSuccessMessage(response.data.success);
        toast.success(response.data.success, {
          position: "top-center",
        });
        setLoading(false);
      }
      if (response.data.error) {
        setErrorShowMessage(response.data.error);
        toast.error(response.data.error, {
          position: "top-center",
        });
        setLoading(false);
      }
    }
    setAccountNumber("");
    setConfirmAccountNumber("");
    setIfscCode("");
    setConfirmValidIfscCode("");
    setFullName("");
  };

  useEffect(() => {
    if (ifscCode) {
      ifsc.validate(ifscCode);
      ifsc
        .fetchDetails(ifscCode)
        .then((response) => {
          setValidIfscCode(response);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [ifscCode]);

  return (
    <>
      <CloseButton onClick={props.personal} />
      <FormDiv>
        <Form onSubmit={verifyIfscCode}>
          <ForDiv>
            {showErrorMessage && (
              <p style={{ color: "red", fontSize: "20px" }}>
                {showErrorMessage}
              </p>
            )}
            {showSuccessMessage && (
              <p style={{ color: "green", fontSize: "20px" }}>
                {showSuccessMessage}
              </p>
            )}
            {loading && <Loading />}
          </ForDiv>

          <ForDiv>
            <FormLabel htmlFor="">Enter Your Full Name :</FormLabel>
            <FormInput
              value={fullName}
              required
              onChange={(event) => setFullName(event.target.value)}
              type="text"
              placeholder="Enter Your Full Name"
            />
          </ForDiv>
          <ForDiv>
            <FormLabel htmlFor="">Enter Your account Number :</FormLabel>
            <FormInput
              required
              value={accountNumber}
              onChange={(event) => setAccountNumber(event.target.value)}
              type="number"
              placeholder="Enter Your Account Number"
            />
          </ForDiv>
          <ForDiv>
            <FormLabel htmlFor="">Confirm Your account Number :</FormLabel>
            <FormInput
              value={confirmAccountNumber}
              required
              onChange={(event) => setConfirmAccountNumber(event.target.value)}
              type="number"
              placeholder="Confirm Your Account Number"
            />
            {accountNumber && confirmAccountNumber && (
              <>
                {accountNumber === confirmAccountNumber ? (
                  <p style={{ color: "green", fontSize: "20px" }}>
                    Account number is matched
                  </p>
                ) : (
                  <p style={{ color: "red" }}>Account number is not matched</p>
                )}
              </>
            )}
          </ForDiv>
          <ForDiv>
            <FormLabel htmlFor="">Enter Your IFSC code : </FormLabel>
            <FormInput
              required
              value={ifscCode}
              onChange={(event) => setIfscCode(event.target.value)}
              type="text"
              placeholder="Enter your IFSC Code"
            />

            {ifscCode && (
              <>
                {validIfscCode && upperLetters ? (
                  <p style={{ color: "green", fontSize: "20px" }}>
                    {validIfscCode.BANK +
                      "," +
                      validIfscCode.BRANCH +
                      "," +
                      validIfscCode.CITY +
                      "," +
                      validIfscCode.STATE}
                  </p>
                ) : (
                  <p style={{ color: "red", fontSize: "20px" }}>{error}</p>
                )}
              </>
            )}
            {ifscCode && (
              <>
                {upperLetters ? (
                  <p style={{ color: "green", fontSize: "20px" }}>
                    Valid IFSC Code
                  </p>
                ) : (
                  <p style={{ color: "red", fontSize: "20px" }}>
                    Must be a valid IFSC Code
                  </p>
                )}
              </>
            )}
          </ForDiv>
          <ForDiv>
            <FormLabel htmlFor="">Confirm Your IFSC code : </FormLabel>
            <FormInput
              value={confirmValidIfscCode}
              required
              onChange={(event) => setConfirmValidIfscCode(event.target.value)}
              type="text"
              placeholder="Confirm Your IFSC Code"
            />
            {ifscCode && confirmValidIfscCode && (
              <>
                {ifscCode === confirmValidIfscCode ? (
                  <p style={{ color: "green", fontSize: "20px" }}>
                    IFSC code is matched
                  </p>
                ) : (
                  <p style={{ color: "red", fontSize: "20px" }}>
                    IFSC code is not matched
                  </p>
                )}
              </>
            )}
          </ForDiv>
          <FormFlex>
            <FormInputCheck type="checkbox" required />
            <FormLabel>
              I have read all
              <Link
                to="/terms-conditions"
                style={{ textDecoration: "none", color: " #fa4299" }}
              >
                Terms & Conditions.
              </Link>
            </FormLabel>
          </FormFlex>
          <FormBtn
            disabled={
              !accountNumber ||
              !confirmAccountNumber ||
              !ifscCode ||
              !confirmValidIfscCode ||
              !fullName ||
              accountNumber !== confirmAccountNumber ||
              ifscCode !== confirmValidIfscCode
            }
          >
            Add Bank Details
          </FormBtn>
        </Form>
      </FormDiv>
    </>
  );
};

export default MentorBankDetails;
