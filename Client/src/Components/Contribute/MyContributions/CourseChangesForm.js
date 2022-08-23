import React from "react";
import { useState } from "react";
import {
  ContributionData,
  ContributionReasons,
} from "../../Data/ContributionData";
import {
  CloseButton,
  CloseButtonDiv,
  ContributionButtonDiv,
  ContributionInput,
  ContributionOptions,
  ContributionSelection,
  ContributionSubmitButton,
  ContributionTextArea,
  Field,
  FormDiv,
  FormLabel,
} from "./CourseChangeElements";

const CourseChangesForm = (props) => {
  const [chapter, setChapter] = useState("");
  const [selectReason, setSelectReason] = useState("");
  const [expReason, setExpReason] = useState("");
  const [courseContent, setCourseContent] = useState("");
  const [pdfFile, setPdfFile] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const courseChangeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(
      chapter,
      selectReason,
      expReason,
      courseContent,
      pdfFile,
      videoFile
    );
  };
  return (
    <div>
      <CloseButtonDiv onClick={props.showModalHandler}>
        <CloseButton />
      </CloseButtonDiv>
      <FormDiv>
        <form onSubmit={courseChangeSubmitHandler}>
          <Field>
            <FormLabel>Select the chapter</FormLabel>
            <ContributionSelection
              onChange={(event) => setChapter(event.target.value)}
            >
              {ContributionData.map((data) => (
                <ContributionOptions key={data.id} value={data.chapter}>
                  {data.chapter}
                </ContributionOptions>
              ))}
            </ContributionSelection>
          </Field>
          <Field>
            <FormLabel>
              Select the Reason for adding/removing/suggesting ?
            </FormLabel>
            <ContributionSelection
              onChange={(event) => setSelectReason(event.target.value)}
            >
              {ContributionReasons.map((data) => (
                <ContributionOptions key={data.id} value={data.reason}>
                  {data.reason}
                </ContributionOptions>
              ))}
            </ContributionSelection>
          </Field>
          <Field>
            <FormLabel>
              Give the brief explanation of the contribution, Why you are
              adding/removing/suggestion in the course ?
            </FormLabel>
            <ContributionTextArea
              onChange={(event) => setExpReason(event.target.value)}
              name=""
              id=""
              cols="30"
              rows="07"
            ></ContributionTextArea>
          </Field>
          <Field>
            <FormLabel>
              Describe course content in words that you want to
              add/remove/suggest.
            </FormLabel>
            <ContributionTextArea
              onChange={(event) => setCourseContent(event.target.value)}
              name=""
              id=""
              cols="30"
              rows="07"
            ></ContributionTextArea>
          </Field>
          <Field>
            <FormLabel>Choose the file adding/removing/suggesting ?</FormLabel>
            <ContributionInput
              type="file"
              onChange={(event) => setPdfFile(event.target.files[0])}
            />
            *only pdf files accepted
          </Field>
          <Field>
            <FormLabel>
              Choose the video for adding/removing/suggesting ?
            </FormLabel>
            <ContributionInput
              type="file"
              onChange={(event) => setVideoFile(event.target.files[0])}
            />
          </Field>
          <ContributionButtonDiv>
            <ContributionSubmitButton>Submit</ContributionSubmitButton>
          </ContributionButtonDiv>
        </form>
      </FormDiv>
    </div>
  );
};

export default CourseChangesForm;
