import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
//import { AiOutlineClose } from "react-icons/ai";

const TrainerProfileSect = styled.section`
  height: auto;
  background-color: #fff;
  width: 100%;
  overflow: hidden;
  height: scroll;
`;
const TrainerProfileSection = styled.section`
  width: 100%;

  padding: 50px 0px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
`;
const TrainerProfileWrapper = styled.div``;
const Form = styled.form``;
const FormInputDiv = styled.div`
  width: 100%;
`;
const FormDiv = styled.div`
  padding: 30px;
  text-align: center;
  margin-left: 20px;
`;
const FormInput = styled.input`
  display: block;
  width: 80%;
  height: 40px;
  margin-bottom: 15px;
  font-size: 19px;
  margin-left: 25px;
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid #111;
  &::placeholder {
    color: #111;
    font-size: 15px;
    opacity: 0.9;
  }
`;
const FormInputDate = styled.input`
  display: block;
  width: 60%;
  height: 40px;
  margin-bottom: 15px;
  font-size: 19px;
  background: transparent;
  border: none;
  outline: none;
  margin-left: 25px;
  border-bottom: 1px solid #111;
  &::placeholder {
    color: #111;
    opacity: 0.9;
  }
`;
const FormLabel = styled.label`
  font-size: 21px;
  width: 40%;
`;
const FormFlex = styled.div`
  display: flex;
  align-items: center;
`;
const FormAddress = styled.textarea`
  display: block;
  width: 60%;
  outline: none;
  height: 70px;
  margin-left: 15px;
  font-size: 15px;
  &::placeholder {
    color: #111;
    opacity: 0.9;
  }
`;
const FormSelect = styled.select`
  height: 36px;
  width: 60%;
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  margin: 5px 0px 15px 15px;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  &:focus {
    border-color: #fc83bb;
  }
`;
const FormInputFile = styled.input`
  width: 55%;
  height: 40px;
  font-size: 19px;
  margin-top: 10px;
  border: none;
  outline: none;
  margin-left: 15px;
  &::placeholder {
    color: #111;
    opacity: 0.9;
  }
`;
const FormBtn = styled.button`
  border: none;
  outline: none;
  padding: 10px 30px;
  margin-top: 20px;
  background-color: blue;
  color: white;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  &:hover {
    opacity: 0.9;
  }
`;
// const CloseButton = styled(AiOutlineClose)`
//   font-size: 25px;
//   color: #111;
//   cursor: pointer;
//   position: absolute;
//   top: 14px;
//   right: 16px;
// `;
export const FormOption = styled.option``;
const EditCourse = () => {
  const [title, setTitle] = useState("");
  const [courseName, setCourseName] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [startsDate, setStartsDate] = useState("");
  const [endsDate, setEndsDate] = useState("");
  const [image, setImage] = useState("");
  const [spayeeLink, setSpayeeLink] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;

  const AddNewCourseHandler = async (event) => {
    event.preventDefault();

    let data = new FormData();
    data.append("image", image);
    data.append("title", title);
    data.append("courseName", courseName);
    data.append("price", price);
    data.append("category", category);
    data.append("tags", tags);
    data.append("startsDate", startsDate);
    data.append("endsDate", endsDate);
    data.append("spayeeLink", spayeeLink);
    data.append("description", description);
    try {
      const res = await axios.post(`/courses/new/add/${user?.id}`, data, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      if (res.data.success) {
        setSuccess(res.data.success);
      }
      if (res.data.error) {
        setError(res.data.error);
      }
    } catch (error) {
      return;
    }
  };

  return (
    <TrainerProfileSect>
      <TrainerProfileSection>
        <TrainerProfileWrapper>
          <FormDiv>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <Form
              onSubmit={AddNewCourseHandler}
              method="POST"
              encType="multipart/form-data"
            >
              <FormInputDiv>
                <FormFlex>
                  <FormLabel htmlFor="">Course Title</FormLabel>
                  <FormInput
                    required
                    type="text"
                    placeholder="Enter the Course Heading"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormFlex>
              </FormInputDiv>
              <FormInputDiv>
                <FormFlex>
                  <FormLabel htmlFor="">Course Name</FormLabel>
                  <FormInput
                    required
                    type="text"
                    placeholder="Enter the name of your course like python"
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </FormFlex>
              </FormInputDiv>
              <FormInputDiv>
                <FormFlex>
                  <FormLabel htmlFor="">Course Price:</FormLabel>
                  <FormInput
                    required
                    type="text"
                    placeholder="Enter the price for your course INR"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormFlex>
              </FormInputDiv>
              <FormInputDiv>
                <FormFlex>
                  <FormLabel htmlFor="">Course Starts Date</FormLabel>
                  <FormInputDate
                    required
                    type="date"
                    onChange={(e) => setStartsDate(e.target.value)}
                  />
                </FormFlex>
              </FormInputDiv>
              <FormInputDiv>
                <FormFlex>
                  <FormLabel htmlFor="">Course End Date</FormLabel>
                  <FormInputDate
                    required
                    type="date"
                    onChange={(e) => setEndsDate(e.target.value)}
                  />
                </FormFlex>
              </FormInputDiv>
              <FormFlex>
                <FormLabel>Choose the course Category</FormLabel>
                <FormSelect
                  required
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <FormOption>Choose a below option</FormOption>
                  <FormOption value="software-development">
                    Software Development
                  </FormOption>
                  <FormOption value="domain-skills">Domain Skills</FormOption>
                  <FormOption value="it-skills">It Skills</FormOption>
                </FormSelect>
              </FormFlex>
              <FormInputDiv>
                <FormFlex>
                  <FormLabel>Course Tags</FormLabel>
                  <FormAddress
                    required
                    placeholder="Add some tags to your course separated by commas"
                    onChange={(e) => setTags(e.target.value)}
                  ></FormAddress>
                </FormFlex>
              </FormInputDiv>
              <FormInputDiv>
                <FormFlex>
                  <FormLabel htmlFor="">Spayee Link</FormLabel>
                  <FormInputDate
                    required
                    type="text"
                    name="spayeeLink"
                    onChange={(e) => setSpayeeLink(e.target.value)}
                  />
                </FormFlex>
              </FormInputDiv>
              <FormInputDiv>
                <FormFlex>
                  <FormLabel>Course Image</FormLabel>
                  <FormInputFile
                    type="file"
                    name="image"
                    onChange={(event) => setImage(event.target.files[0])}
                  />
                </FormFlex>
              </FormInputDiv>
              <FormInputDiv>
                <FormFlex>
                  <FormLabel>Description</FormLabel>
                  <FormAddress
                    required
                    name="description"
                    placeholder=" Give a Brief Description about the course"
                    onChange={(e) => setDescription(e.target.value)}
                  ></FormAddress>
                </FormFlex>
              </FormInputDiv>
              <FormBtn type="submit">Save</FormBtn>
            </Form>
          </FormDiv>
        </TrainerProfileWrapper>
      </TrainerProfileSection>
    </TrainerProfileSect>
  );
};

export default EditCourse;
