import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import {
  TraineeCourseFeedbackQuestion1,
  TraineeCourseFeedbackQuestion2,
  TraineeCourseFeedbackQuestion3,
  TraineeCourseFeedbackQuestion4,
  TraineeCourseFeedbackQuestion7,
} from "../../Data/FeedbackQuestion.js";
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
const FormDiv = styled.div`
  padding: 0px 0px;
  width: 80%;
  margin: 0 auto;
`;
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
  top: 20vh;
  left: 5%;
  width: 90%;
  height: auto;
  overflow: scroll;

  max-height: 500px;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 100000;
  animation: slide-down 300ms ease-out forwards;
  @media (min-width: 768px) {
    width: 40rem;
    left: calc(50% - 20rem);
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
const RadioWrapper = styled.div`
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const InputRadio = styled.input`
  width: 20px;
  height: 20px;
  &:focus {
    border-color: #fc83bb;
  }
`;
const InputRadLabel = styled.label`
  font-size: 16px;
  margin-left: 7px;
  color: #111;
  opacity: 0.8;
`;

const QuestionDiv = styled.div`
  padding: 15px 0;
`;
const QuestionDivBox = styled.div``;
const QuestionDivH3 = styled.h3`
  font-weight: 500;
  font-size: 19px;
  color: #111;
`;
const TextArea = styled.textarea`
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  margin-bottom: 10px;
  width: 100%;
  padding: 10px 20px;
  &:focus {
    border-color: #fc83bb;
  }
`;
const ErrorMessage = styled.p`
  color: red;
  margin: 0 0 10px 10px;
`;
const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
`;
const SubmitButton = styled.button`
  margin: 0 auto;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  background-color: #1363df;
  color: #fff;
  border-radius: 5px;
  &:hover {
    opacity: 0.7;
    transition: all 0.5s ease-in-out;
  }
  :disabled {
    cursor: not-allowed;
  }
`;
const TraineeCourseFeedbackForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const user = useSelector((state) => state.user.currentUser);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const token = user?.accessToken;
  const feedbackSubmitHandler = async (data) => {
    let newData = {
      question1: data.question1,
      question2: data.question2,
      question3: data.question3,
      question4: data.question4,
      question5: data.question5,
      question6: data.question6,
      question7: data.question7,
      traineeCourseDtlsId: props.traineeCourse.trainee_course_dtls_id,
      userEmail: user?.email,
      userFullName: user?.firstname + " " + user?.lastname,
      instructorFullname: props.traineeCourse.trainee_course_instructor_name,
      traineeCourseId: props.traineeCourse.trainee_course_id,
      courseName: props.traineeCourse.trainee_course_name,
    };
    try {
      setLoading(true);
      const result = await axios.post(
        "/trainee/courses/progress/course/feedback",
        newData,
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      if (result.data.success) {
        return (
          toast.success(result.data.success, {
            position: "top-center",
          }),
          setSuccess(result.data.success),
          setLoading(false),
          reset()
        );
      }
      if (result.data.error) {
        return (
          toast.error(result.data.error, {
            position: "top-center",
          }),
          setLoading(false),
          setError(result.data.error),
          reset()
        );
      }
    } catch (error) {
      return (
        toast.error("There was an error processing the request", {
          position: "top-center",
        }),
        setLoading(false),
        setError("There was an error processing the request"),
        reset()
      );
    }
  };
  return (
    <Backdrop>
      <Modal>
        <div>
          <CloseButtonDiv onClick={props.showCourseFeedbackHandler}>
            <CloseButton />
          </CloseButtonDiv>
          {error && <p style={{ color: "red", fontSize: "20px" }}>{error}</p>}
          {success && (
            <p style={{ color: "green", fontSize: "20px" }}>{success}</p>
          )}
          {loading && <p>Please wait... loading...</p>}
          <FormDiv>
            <form action="" onSubmit={handleSubmit(feedbackSubmitHandler)}>
              <QuestionDiv>
                {TraineeCourseFeedbackQuestion1.map((question) => (
                  <QuestionDivBox key={question.qnId}>
                    <QuestionDivH3>
                      {question.qnId}) {question.question}
                    </QuestionDivH3>
                    <RadioWrapper>
                      {question.options.map((option) => (
                        <RadioWrapper key={option.optionId}>
                          <InputRadio
                            type="radio"
                            value={option.value}
                            {...register("question1", {
                              required: "Question one answer is Required",
                            })}
                          />
                          <InputRadLabel htmlFor={question.qnId}>
                            {option.value}
                          </InputRadLabel>
                        </RadioWrapper>
                      ))}
                    </RadioWrapper>
                  </QuestionDivBox>
                ))}
                {errors.question1 && (
                  <ErrorMessage>{errors.question1.message}</ErrorMessage>
                )}
              </QuestionDiv>
              <QuestionDiv>
                {TraineeCourseFeedbackQuestion2.map((question) => (
                  <QuestionDivBox key={question.qnId}>
                    <QuestionDivH3>
                      {question.qnId}) {question.question}
                    </QuestionDivH3>
                    <RadioWrapper>
                      {question.options.map((option) => (
                        <RadioWrapper key={option.optionId}>
                          <InputRadio
                            type="radio"
                            value={option.value}
                            {...register("question2", {
                              required: "Question two answer is Required",
                            })}
                          />
                          <InputRadLabel htmlFor={question.qnId}>
                            {option.value}
                          </InputRadLabel>
                        </RadioWrapper>
                      ))}
                    </RadioWrapper>
                  </QuestionDivBox>
                ))}
                {errors.question2 && (
                  <ErrorMessage>{errors.question2.message}</ErrorMessage>
                )}
              </QuestionDiv>
              <QuestionDiv>
                {TraineeCourseFeedbackQuestion3.map((question) => (
                  <QuestionDivBox key={question.qnId}>
                    <QuestionDivH3>
                      {question.qnId}) {question.question}
                    </QuestionDivH3>
                    <RadioWrapper>
                      {question.options.map((option) => (
                        <RadioWrapper key={option.optionId}>
                          <InputRadio
                            type="radio"
                            value={option.value}
                            {...register("question3", {
                              required: "Question three answer is Required",
                            })}
                          />
                          <InputRadLabel htmlFor={question.qnId}>
                            {option.value}
                          </InputRadLabel>
                        </RadioWrapper>
                      ))}
                    </RadioWrapper>
                  </QuestionDivBox>
                ))}
                {errors.question3 && (
                  <ErrorMessage>{errors.question3.message}</ErrorMessage>
                )}
              </QuestionDiv>
              <QuestionDiv>
                {TraineeCourseFeedbackQuestion4.map((question) => (
                  <QuestionDivBox key={question.qnId}>
                    <QuestionDivH3>
                      {question.qnId}) {question.question}
                    </QuestionDivH3>
                    <RadioWrapper>
                      {question.options.map((option) => (
                        <RadioWrapper key={option.optionId}>
                          <InputRadio
                            type="radio"
                            value={option.value}
                            {...register("question4", {
                              required: "Question four answer is Required",
                            })}
                          />
                          <InputRadLabel htmlFor={question.qnId}>
                            {option.value}
                          </InputRadLabel>
                        </RadioWrapper>
                      ))}
                    </RadioWrapper>
                  </QuestionDivBox>
                ))}
                {errors.question4 && (
                  <ErrorMessage>{errors.question4.message}</ErrorMessage>
                )}
              </QuestionDiv>
              <QuestionDiv>
                <QuestionDivBox>
                  <QuestionDivH3>
                    5)Did you think the content in the training material was
                    sufficient? What could be added or improved in the topics ?
                  </QuestionDivH3>
                  <RadioWrapper>
                    <TextArea
                      placeholder="Describe about improving of course..."
                      {...register("question5", {
                        required: "Must be required",
                        minLength: {
                          value: 30,
                          message: "Must be at least 30 characters at least",
                        },
                        maxLength: {
                          value: 120,
                          message: "Not More than 120 characters",
                        },
                      })}
                    ></TextArea>
                  </RadioWrapper>
                  {errors.question5 && (
                    <ErrorMessage>{errors.question5.message}</ErrorMessage>
                  )}
                </QuestionDivBox>
              </QuestionDiv>
              <QuestionDiv>
                <QuestionDivBox>
                  <QuestionDivH3>
                    6) What did you like the most about the training and did the
                    training meet your expectations ?
                  </QuestionDivH3>
                  <RadioWrapper>
                    <TextArea
                      placeholder="Describe about what did you like in the course..."
                      {...register("question6", {
                        required: "Must be required",
                        minLength: {
                          value: 30,
                          message: "Must be at least 30 characters at least",
                        },
                        maxLength: {
                          value: 120,
                          message: "Not More than 120 characters",
                        },
                      })}
                    ></TextArea>
                  </RadioWrapper>
                  {errors.question6 && (
                    <ErrorMessage>{errors.question6.message}</ErrorMessage>
                  )}
                </QuestionDivBox>
              </QuestionDiv>
              <QuestionDiv>
                {TraineeCourseFeedbackQuestion7.map((question) => (
                  <QuestionDivBox key={question.qnId}>
                    <QuestionDivH3>
                      {question.qnId}) {question.question}
                    </QuestionDivH3>
                    <RadioWrapper>
                      {question.options.map((option) => (
                        <RadioWrapper key={option.optionId}>
                          <InputRadio
                            type="radio"
                            value={option.value}
                            {...register("question7", {
                              required: "Question seven answer is Required",
                            })}
                          />
                          <InputRadLabel htmlFor={question.qnId}>
                            {option.value}
                          </InputRadLabel>
                        </RadioWrapper>
                      ))}
                    </RadioWrapper>
                  </QuestionDivBox>
                ))}
                {errors.question7 && (
                  <ErrorMessage>{errors.question7.message}</ErrorMessage>
                )}
                <ButtonDiv>
                  <SubmitButton type="submit">Submit</SubmitButton>
                </ButtonDiv>
              </QuestionDiv>
            </form>
          </FormDiv>
        </div>
      </Modal>
    </Backdrop>
  );
};

export default TraineeCourseFeedbackForm;
