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
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
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
  const user = useSelector((state) => state.user.currentUser);
  const [question1, setQuestion1] = useState();
  const [question2, setQuestion2] = useState();
  const [question3, setQuestion3] = useState();
  const [question4, setQuestion4] = useState();
  const [question5, setQuestion5] = useState();
  const [question6, setQuestion6] = useState();
  const [question7, setQuestion7] = useState();
  const [question8, setQuestion8] = useState();
  const [question9, setQuestion9] = useState();
  const [question10, setQuestion10] = useState();
  const [question11, setQuestion11] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const question1Handler = (event) => {
    setQuestion1(event.target.value);
  };
  const question2Handler = (event) => {
    setQuestion2(event.target.value);
  };
  const question3Handler = (event) => {
    setQuestion3(event.target.value);
  };
  const question4Handler = (event) => {
    setQuestion4(event.target.value);
  };
  const question5Handler = (event) => {
    setQuestion5(event.target.value);
  };
  const question6Handler = (event) => {
    setQuestion6(event.target.value);
  };
  const question7Handler = (event) => {
    setQuestion7(event.target.value);
  };
  const question8Handler = (event) => {
    setQuestion8(event.target.value);
  };
  const question11Handler = (event) => {
    setQuestion11(event.target.value);
  };

  const token = user?.accessToken;
  console.log(props);
  const feedbackSubmitHandler = async (event) => {
    event.preventDefault();
    let data = {
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,
      question8,
      question9,
      question10,
      question11,
      bookingId: props.mentor.bookingId,
      userEmail: user?.email,
      mentorEmail: props.mentor.mentorEmail,
      userFullName: user?.firstname + " " + user?.lastname,
      mentorFullname: props.mentor.mentorFullName,
    };
    if (
      !question1 ||
      !question2 ||
      !question3 ||
      !question4 ||
      !question5 ||
      !question6 ||
      !question7 ||
      !question8 ||
      !question9 ||
      !question10 ||
      !question11
    ) {
      return (
        toast.error("All details must be required", {
          position: "top-center",
        }),
        setError("All details must be required")
      );
    }
    try {
      setLoading(true);
      const result = await axios.post("/feedback", data, {
        headers: { authorization: "Bearer " + token },
      });
      if (result.data.success) {
        return (
          toast.success(result.data.success, {
            position: "top-center",
          }),
          setSuccess(result.data.success),
          setLoading(false)
        );
      }
      if (result.data.error) {
        return (
          toast.error(result.data.error, {
            position: "top-center",
          }),
          setLoading(false),
          setError(result.data.error)
        );
      }
    } catch (error) {}
  };
  return (
    <Backdrop>
      {loading || <LoadingSpinner />}
      <Modal>
        <CloseButtonDiv onClick={props.showFeedBackMentorHandler}>
          <CloseButton></CloseButton>
        </CloseButtonDiv>
        <WrapperDiv>
          {error && <p style={{ color: "red", fontSize: "20px" }}>{error}</p>}
          {success && (
            <p style={{ color: "green", fontSize: "20px" }}>{success}</p>
          )}
          <form action="" onSubmit={feedbackSubmitHandler}>
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
                          required
                          type="radio"
                          id={question.qnId}
                          value={option.value}
                          checked={question1 === option.value}
                          onChange={question1Handler}
                        />
                        <InputRadLabel htmlFor={question.qnId}>
                          {option.value}
                        </InputRadLabel>
                      </RadioWrapper>
                    ))}
                  </RadioWrapper>
                </QuestionDivBox>
              ))}
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
                          required
                          type="radio"
                          id={question.qnId}
                          value={option.value}
                          checked={question2 === option.value}
                          onChange={question2Handler}
                        />
                        <InputRadLabel htmlFor={question.qnId}>
                          {option.value}
                        </InputRadLabel>
                      </RadioWrapper>
                    ))}
                  </RadioWrapper>
                </QuestionDivBox>
              ))}
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
                          required
                          type="radio"
                          id={question.qnId}
                          value={option.value}
                          checked={question3 === option.value}
                          onChange={question3Handler}
                        />
                        <InputRadLabel htmlFor={question.qnId}>
                          {option.value}
                        </InputRadLabel>
                      </RadioWrapper>
                    ))}
                  </RadioWrapper>
                </QuestionDivBox>
              ))}
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
                          required
                          type="radio"
                          id={question.qnId}
                          value={option.value}
                          checked={question4 === option.value}
                          onChange={question4Handler}
                        />
                        <InputRadLabel htmlFor={question.qnId}>
                          {option.value}
                        </InputRadLabel>
                      </RadioWrapper>
                    ))}
                  </RadioWrapper>
                </QuestionDivBox>
              ))}
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
                          required
                          id={question.qnId}
                          value={option.value}
                          checked={question5 === option.value}
                          onChange={question5Handler}
                        />
                        <InputRadLabel htmlFor={question.qnId}>
                          {option.value}
                        </InputRadLabel>
                      </RadioWrapper>
                    ))}
                  </RadioWrapper>
                </QuestionDivBox>
              ))}
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
                          required
                          id={question.qnId}
                          value={option.value}
                          checked={question6 === option.value}
                          onChange={question6Handler}
                        />
                        <InputRadLabel htmlFor={question.qnId}>
                          {option.value}
                        </InputRadLabel>
                      </RadioWrapper>
                    ))}
                  </RadioWrapper>
                </QuestionDivBox>
              ))}
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
                          required
                          type="radio"
                          id={question.qnId}
                          value={option.value}
                          checked={question7 === option.value}
                          onChange={question7Handler}
                        />
                        <InputRadLabel htmlFor={question.qnId}>
                          {option.value}
                        </InputRadLabel>
                      </RadioWrapper>
                    ))}
                  </RadioWrapper>
                </QuestionDivBox>
              ))}
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
                          required
                          id={question.qnId}
                          value={option.value}
                          checked={question8 === option.value}
                          onChange={question8Handler}
                        />
                        <InputRadLabel htmlFor={question.qnId}>
                          {option.value}
                        </InputRadLabel>
                      </RadioWrapper>
                    ))}
                  </RadioWrapper>
                </QuestionDivBox>
              ))}
            </QuestionDiv>
            <QuestionDiv>
              <QuestionDivBox>
                <QuestionDivH3>
                  9) What aspects of the teaching/training were particularly
                  good?
                </QuestionDivH3>
                <RadioWrapper>
                  <TextArea
                    value={question9}
                    onChange={(event) => setQuestion9(event.target.value)}
                    placeholder="Describe about yourself in brief words"
                    required
                  ></TextArea>
                </RadioWrapper>
              </QuestionDivBox>
            </QuestionDiv>
            <QuestionDiv>
              <QuestionDivBox>
                <QuestionDivH3>
                  10) What aspects of the mentor could be improved?
                </QuestionDivH3>
                <RadioWrapper>
                  <TextArea
                    value={question10}
                    onChange={(event) => setQuestion10(event.target.value)}
                    placeholder="Describe about yourself in brief words"
                    required
                  ></TextArea>
                </RadioWrapper>
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
                          required
                          id={question.qnId}
                          value={option.value}
                          checked={question11 === option.value}
                          onChange={question11Handler}
                        />
                        <InputRadLabel htmlFor={question.qnId}>
                          {option.value}
                        </InputRadLabel>
                      </RadioWrapper>
                    ))}
                  </RadioWrapper>
                </QuestionDivBox>
              ))}
              <ButtonDiv>
                <SubmitButton
                  disabled={
                    !question1 ||
                    !question2 ||
                    !question3 ||
                    !question4 ||
                    !question5 ||
                    !question6 ||
                    !question7 ||
                    !question8 ||
                    !question9 ||
                    !question10 ||
                    !question11
                  }
                  type="submit"
                >
                  Submit
                </SubmitButton>
              </ButtonDiv>
            </QuestionDiv>
          </form>
        </WrapperDiv>
      </Modal>
    </Backdrop>
  );
};

export default FeedbackForm;
