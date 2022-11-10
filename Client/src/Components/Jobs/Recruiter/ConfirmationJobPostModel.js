import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
const FormLabel = styled.label`
  font-size: 19px;
`;
const FormSelect = styled.select`
  width: 100%;
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  padding: 10px 10px;
  &:focus {
    border-color: #fc83bb;
  }
`;
const ErrorMessage = styled.p`
  color: red;
  margin: 0 0 10px 10px;
`;
const Field = styled.div`
  width: 100%;
  margin-bottom: 15px;
  margin-right: 10px;
`;
const FormOption = styled.option``;
const WarnText = styled.p`
  color: red;
  margin-top: 12px;
`;
const ConfirmationJobPostModel = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateJobToClosePositionHandler = async (data) => {
    const res = await axios.put(
      `/recruiter/update/to-closed-position/${props.jobDetails.job_post_dtls_id}`
    );
    if (res.data.success) {
      setSuccess(res.data.success);
      reset();
    }
    if (res.data.error) {
      setError(res.data.error);
      reset();
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
          <form
            action=""
            onSubmit={handleSubmit(updateJobToClosePositionHandler)}
          >
            <Field>
              <FormLabel>Hiring Status:</FormLabel>
              <FormSelect
                name="hiringStatus"
                {...register("hiringStatus", {
                  required: "Choose hiring status",
                })}
              >
                <FormOption value="">Choose below</FormOption>
                <FormOption value="recruited">Recruited</FormOption>
              </FormSelect>
              {errors.hiringStatus && (
                <ErrorMessage>{errors.hiringStatus.message}</ErrorMessage>
              )}
            </Field>
            <Field>
              <FormLabel>Job open positions:</FormLabel>
              <FormSelect
                name="openPosition"
                {...register("openPosition", {
                  required: "Choose the job position",
                })}
              >
                <FormOption value="">Choose below</FormOption>
                <FormOption value="closed">Close this job post</FormOption>
              </FormSelect>
              {errors.openPosition && (
                <ErrorMessage>{errors.openPosition.message}</ErrorMessage>
              )}
            </Field>
            <ConfirmButton type="submit">Confirm</ConfirmButton>
            <CancelButton onClick={props.showModalHandler} type="btn">
              Cancel
            </CancelButton>
          </form>
          <WarnText>
            If you confirm this job post will not displayed in the all the jobs
            in the Home page and will no longer accept the applications and job
            post will be closed.
          </WarnText>
        </MentorBoxDiv>
      </Modal>
    </Backdrop>
  );
};

export default ConfirmationJobPostModel;
