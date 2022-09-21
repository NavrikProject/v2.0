import React, { useState } from "react";
import {
  FaqAnswer,
  FaqBox,
  FaqContainer,
  FaqDiv,
  FaqQuestion,
  FaqSection,
  FaqTitle,
  FaqWrapper,
} from "./FaqElements";
import { mentorFaqData } from "../Data/MentorData";
const Faq = () => {
  const [selected, setSelected] = useState(null);
  const toggleAccordion = (index) => {
    if (selected === index) {
      return setSelected(null);
    }
    setSelected(index);
  };
  return (
    <FaqSection>
      <FaqDiv>
        <FaqWrapper>
          <FaqContainer>
            <FaqTitle>Here some Faq</FaqTitle>
            {mentorFaqData.map((faq, index) => (
              <FaqBox key={index}>
                <FaqQuestion onClick={() => toggleAccordion(index)}>
                  {faq.question}
                  <span>
                    {selected === index ? (
                      <i className="fa-solid fa-minus"></i>
                    ) : (
                      <i className="fa-solid fa-plus"></i>
                    )}
                  </span>
                </FaqQuestion>
                {selected === index ? (
                  <FaqAnswer>{faq.answer}</FaqAnswer>
                ) : null}
              </FaqBox>
            ))}
          </FaqContainer>
        </FaqWrapper>
      </FaqDiv>
    </FaqSection>
  );
};

export default Faq;
