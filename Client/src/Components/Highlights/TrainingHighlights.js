import React from "react";
import {
  LineAfter,
  TrainerHighlightBox,
  TrainerHighlightImg,
  TrainerHighlightTitle,
  TrainingHighDiv,
  TrainingHighlightDiv,
  TrainingHighlightItems,
  TrainingHighSection,
  TrainingHighTitle,
  TrainingHighWrapper,
} from "./TrainingHighlightElements";

const TrainingHighlights = () => {
  return (
    <TrainingHighSection>
      <TrainingHighDiv>
        <TrainingHighTitle>OUR TRAINING HIGHLIGHTS</TrainingHighTitle>
        <LineAfter />
        <TrainingHighWrapper>
          <TrainingHighlightDiv>
            <TrainingHighlightItems>
              <TrainerHighlightTitle>Industry Projects</TrainerHighlightTitle>
              <TrainerHighlightBox>
                <TrainerHighlightImg src="https://www.projstream.com/hs-fs/hubfs/Stock%20images/Hand%20typing%20on%20modern%20laptop%20notebook%20computer%20with%20future%20graph%20icons%20and%20symbols.jpeg?width=365&name=Hand%20typing%20on%20modern%20laptop%20notebook%20computer%20with%20future%20graph%20icons%20and%20symbols.jpeg" />
              </TrainerHighlightBox>
            </TrainingHighlightItems>
            <TrainingHighlightItems>
              <TrainerHighlightTitle>Mentoring</TrainerHighlightTitle>
              <TrainerHighlightBox>
                <TrainerHighlightImg src="https://www.ccl.org/wp-content/uploads/2021/05/mentoring-at-work-how-to-implement-in-your-organization-ccl.jpg" />
              </TrainerHighlightBox>
            </TrainingHighlightItems>
            <TrainingHighlightItems>
              <TrainerHighlightTitle>Easy Content</TrainerHighlightTitle>
              <TrainerHighlightBox>
                <TrainerHighlightImg src="https://www.drupal.org/files/styles/case_studies_frontpage/public/OpenY%201%20big%20copy.png?itok=AQgcdpzE" />
              </TrainerHighlightBox>
            </TrainingHighlightItems>
          </TrainingHighlightDiv>
        </TrainingHighWrapper>
      </TrainingHighDiv>
    </TrainingHighSection>
  );
};

export default TrainingHighlights;
