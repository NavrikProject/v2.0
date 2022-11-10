import axios from "axios";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10000000;
  background-color: rgba(0, 0, 0, 0.75);
`;
const Modal = styled.div`
  position: fixed;
  top: 15vh;
  left: 25%;
  width: 50%;
  height: auto;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 100000;
  animation: slide-down 300ms ease-out forwards;
  @media (min-width: 768px) {
    .modal {
      width: 90%;
    }
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
const CloseButton = styled(AiOutlineClose)`
  font-size: 25px;
  color: #111;
  cursor: pointer;
`;
const CloseButtonDiv = styled.div`
  height: 30px;
  width: 30px;
  position: absolute;
  top: 14px;
  right: 16px;
  cursor: pointer;
`;
const MentorBoxDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 30px 20px 20px;
`;
const ConfirmButton = styled.button`
  margin: 0 auto;
  width: 48%;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  margin-right: 10px;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  border-radius: 5px;
  background-color: lightblue;
  &:hover {
    transition: all 0.5s ease-in-out;
  }
`;
const CancelButton = styled.button`
  margin: 0 auto;
  width: 48%;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  margin-left: 10px;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    transition: all 0.5s ease-in-out;
  }
`;
const ConfirmationJobPostModel = (props) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateJobToActiveHandler = async () => {
    const res = await axios.put(
      `/jobs/put/job-posts/active-status/${props.jobDetails.job_post_dtls_id}`
    );
    if (res.data.success) {
      setSuccess(res.data.success);
    }
    if (res.data.error) {
      setError(res.data.error);
    }
  };
  const updateJobToInActiveHandler = async () => {
    const res = await axios.put(
      `/jobs/put/job-posts/inactive-status/${props.jobDetails.job_post_dtls_id}`
    );
    if (res.data.success) {
      setSuccess(res.data.success);
    }
    if (res.data.error) {
      setError(res.data.error);
    }
  };
  return (
    <Backdrop>
      <Modal>
        <CloseButtonDiv onClick={props.showModalHandler}>
          <CloseButton />
        </CloseButtonDiv>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {success && (
          <p style={{ color: "green", textAlign: "center" }}>{success}</p>
        )}
        <MentorBoxDiv>
          {props.jobDetails.job_post_status === "inactive" &&
          props.jobDetails.job_post_approve_status === "no" ? (
            <p>
              If you confirm this job post will displayed in the all the jobs in
              the Home page and will enabled to apply the candidates.
            </p>
          ) : (
            <p>
              If you confirm this job post will not displayed in the all the
              jobs in the Home page and will no longer accept the applications.
            </p>
          )}
        </MentorBoxDiv>
        <MentorBoxDiv>
          <ConfirmButton
            onClick={
              props.jobDetails.job_post_status === "inactive" &&
              props.jobDetails.job_post_approve_status === "no"
                ? updateJobToActiveHandler
                : updateJobToInActiveHandler
            }
            type="submit"
          >
            Confirm
          </ConfirmButton>
          <CancelButton onClick={props.showModalHandler} type="btn">
            Cancel
          </CancelButton>
        </MentorBoxDiv>
      </Modal>
    </Backdrop>
  );
};

export default ConfirmationJobPostModel;
