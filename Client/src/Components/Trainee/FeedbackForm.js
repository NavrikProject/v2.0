import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import {
  TraineeFeedbackQuestion1,
  TraineeFeedbackQuestion11,
  TraineeFeedbackQuestion2,
  TraineeFeedbackQuestion3,
  TraineeFeedbackQuestion4,
  TraineeFeedbackQuestion5,
  TraineeFeedbackQuestion6,
  TraineeFeedbackQuestion7,
  TraineeFeedbackQuestion8,
} from "../Data/FeedbackQuestion";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../utils/LoadingSpinner";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10000020;
  background-color: rgba(0, 0, 0, 0.75);
`;
const Modal = styled.div`
  position: fixed;
  top: 20vh;
  left: 5%;
  width: 90%;
  height: 400px;
  overflow: scroll;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 1004;
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
const WrapperDiv = styled.div`
  padding: 40px 10px 0 10px;
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
const FeedbackForm = (props) => {
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
      question8: data.question8,
      question9: data.question9,
      question10: data.question10,
      question11: data.question11,
      bookingId: props.mentor.bookingId,
      userEmail: user?.email,
      mentorEmail: props.mentor.mentorEmail,
      userFullName: user?.firstname + " " + user?.lastname,
      mentorFullname: props.mentor.mentorFullName,
    };

    try {
      setLoading(true);
      const result = await axios.post("/feedback", newData, {
        headers: { authorization: "Bearer " + token },
      });
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
    } catch (error) {}
  };
  return (
    <Backdrop>
      {loading && <LoadingSpinner />}
      <Modal>
        <CloseButtonDiv onClick={props.showFeedBackMentorHandler}>
          <CloseButton></CloseButton>
        </CloseButtonDiv>
        <WrapperDiv>
          {error && <p style={{ color: "red", fontSize: "20px" }}>{error}</p>}
          {success && (
            <p style={{ color: "green", fontSize: "20px" }}>{success}</p>
          )}
          <form action="" onSubmit={handleSubmit(feedbackSubmitHandler)}>
            <QuestionDiv>
              {TraineeFeedbackQuestion1.map((question) => (
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
              {TraineeFeedbackQuestion2.map((question) => (
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
              {TraineeFeedbackQuestion3.map((question) => (
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
              {TraineeFeedbackQuestion4.map((question) => (
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
              {TraineeFeedbackQuestion5.map((question) => (
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
                          {...register("question5", {
                            required: "Question five answer is Required",
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
              {errors.question5 && (
                <ErrorMessage>{errors.question5.message}</ErrorMessage>
              )}
            </QuestionDiv>
            <QuestionDiv>
              {TraineeFeedbackQuestion6.map((question) => (
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
                          {...register("question6", {
                            required: "Question six answer is Required",
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
              {errors.question6 && (
                <ErrorMessage>{errors.question6.message}</ErrorMessage>
              )}
            </QuestionDiv>
            <QuestionDiv>
              {TraineeFeedbackQuestion7.map((question) => (
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
            </QuestionDiv>
            <QuestionDiv>
              {TraineeFeedbackQuestion8.map((question) => (
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
                          {...register("question8", {
                            required: "Question eight answer is Required",
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
              {errors.question8 && (
                <ErrorMessage>{errors.question8.message}</ErrorMessage>
              )}
            </QuestionDiv>
            <QuestionDiv>
              <QuestionDivBox>
                <QuestionDivH3>
                  9) What aspects of the teaching/training were particularly
                  good?
                </QuestionDivH3>
                <RadioWrapper>
                  <TextArea
                    placeholder="Describe about yourself in brief words"
                    {...register("question9", {
                      required: "Must be required",
                      minLength: {
                        value: 50,
                        message: "More than 50 characters at least",
                      },
                    })}
                  ></TextArea>
                </RadioWrapper>
                {errors.question9 && (
                  <ErrorMessage>{errors.question9.message}</ErrorMessage>
                )}
              </QuestionDivBox>
            </QuestionDiv>
            <QuestionDiv>
              <QuestionDivBox>
                <QuestionDivH3>
                  10) What aspects of the mentor could be improved?
                </QuestionDivH3>
                <RadioWrapper>
                  <TextArea
                    placeholder="Describe about yourself in brief words"
                    {...register("question10", {
                      required: "Must be required",
                    })}
                  ></TextArea>
                </RadioWrapper>
                {errors.question10 && (
                  <ErrorMessage>{errors.question10.message}</ErrorMessage>
                )}
              </QuestionDivBox>
            </QuestionDiv>
            <QuestionDiv>
              {TraineeFeedbackQuestion11.map((question) => (
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
                          {...register("question11", {
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
              {errors.question11 && (
                <ErrorMessage>{errors.question11.message}</ErrorMessage>
              )}
              <ButtonDiv>
                <SubmitButton type="submit">Submit</SubmitButton>
              </ButtonDiv>
            </QuestionDiv>
          </form>
        </WrapperDiv>
      </Modal>
    </Backdrop>
  );
};

export default FeedbackForm;
