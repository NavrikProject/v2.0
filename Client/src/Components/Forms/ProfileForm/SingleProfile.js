import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  FormAddress,
  FormBtn,
  FormDiv,
  FormFlex,
  FormInput,
  FormInputDate,
  FormInputDiv,
  FormLabel,
  FormOption,
  FormSelect,
  SingleProfileSect,
  SingleProfileSection,
  SingleProfileWrapper,
  SkipButton,
  SkipBtnDiv,
  FormInputFile,
} from "./SingleProfileElements";
import { useSelector } from "react-redux";
import GoToTop from "../../GoToTop";
import { toast } from "react-toastify";
const SingleProfile = () => {
  const [hideForm, setFormHide] = useState(false);
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [graduate, setGraduate] = useState("");
  const [profession, setProfession] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;

  const profileSubmitHandler = async (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append("image", image);
    data.append("mobile", mobile);
    data.append("dob", dob);
    data.append("address", address);
    data.append("experience", experience);
    data.append("graduate", graduate);
    data.append("profession", profession);
    try {
      const res = await axios.post(
        `/trainee/profile/create/${user?.id}`,
        data,
        { headers: { authorization: "Bearer " + token } }
      );
      if (res.data.success) {
        setSuccess(res.data.success);
        setFormHide(true);
        toast.success(res.data.success, { position: "top-center" });
      }
      if (res.data.error) {
        setFormHide(false);
        setError(res.data.error);
        toast.error(res.data.error, { position: "top-center" });
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    const checkTraineeDetails = async () => {
      const res = await axios.get(`/trainee/profile/check/${user?.id}`, {
        headers: { authorization: "Bearer " + token },
      });
      if (res.data.found) {
        setFormHide(true);
      }
      if (res.data.notFound) {
        setFormHide(false);
      }
    };
    checkTraineeDetails();
  }, [user?.id, token]);

  const hideFormBtn = (e) => {
    e.preventDefault();
    alert("Please dont skip this step.");
    setFormHide(true);
  };

  return (
    <SingleProfileSect>
      {!hideForm && (
        <SingleProfileSection>
          <SingleProfileWrapper>
            {error && <p style={{ color: "red", fontSize: "20px" }}>{error}</p>}
            {success && (
              <p style={{ color: "green", fontSize: "20px" }}>{success}</p>
            )}
            <FormDiv>
              <Form onSubmit={profileSubmitHandler}>
                <FormInputDiv>
                  <FormFlex>
                    <FormLabel htmlFor="">Mobile :</FormLabel>
                    <FormInput
                      name="mobile"
                      type="number"
                      placeholder="Must be 10 digits"
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </FormFlex>
                </FormInputDiv>
                <FormInputDiv>
                  <FormFlex>
                    <FormLabel htmlFor="">DoB:</FormLabel>
                    <FormInputDate
                      name="dob"
                      type="date"
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </FormFlex>
                </FormInputDiv>
                <FormFlex>
                  <FormLabel>Education:</FormLabel>
                  <FormSelect
                    name="graduate"
                    onChange={(event) => setGraduate(event.target.value)}
                  >
                    <FormOption>Choose a below option</FormOption>
                    <FormOption value="1">Pursing</FormOption>
                    <FormOption value="2">Graduate</FormOption>
                    <FormOption value="2">Under Graduate</FormOption>
                    <FormOption value="4">Post Graduate</FormOption>
                  </FormSelect>
                </FormFlex>
                <FormFlex>
                  <FormLabel> Profession:</FormLabel>
                  <FormSelect
                    name="profession"
                    onChange={(event) => setProfession(event.target.value)}
                  >
                    <FormOption>Choose a below option</FormOption>
                    <FormOption value="graduation">
                      Completed the graduation
                    </FormOption>
                    <FormOption value="trainer">
                      Looking for a trainer
                    </FormOption>
                    <FormOption value="job">Seeking for a job</FormOption>
                    <FormOption value="skills">
                      Learning a new skills
                    </FormOption>
                  </FormSelect>
                </FormFlex>
                <FormFlex>
                  <FormLabel>Experience:</FormLabel>
                  <FormSelect
                    name="experience"
                    onChange={(event) => setExperience(event.target.value)}
                  >
                    <FormOption>Choose a below option</FormOption>
                    <FormOption value="0">0</FormOption>
                    <FormOption value="1">1</FormOption>
                    <FormOption value="2">2</FormOption>
                    <FormOption value="3">3</FormOption>
                    <FormOption value="4">4</FormOption>
                    <FormOption value="5">5</FormOption>
                  </FormSelect>
                </FormFlex>
                <FormInputDiv>
                  <FormFlex>
                    <FormLabel>Address</FormLabel>
                    <FormAddress
                      name="address"
                      onChange={(e) => setAddress(e.target.value)}
                    ></FormAddress>
                  </FormFlex>
                </FormInputDiv>
                <FormInputDiv>
                  <FormFlex>
                    <FormLabel>Profile Picture:</FormLabel>
                    <FormInputFile
                      type="file"
                      name="image"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </FormFlex>
                </FormInputDiv>
                <FormBtn>Save</FormBtn>
              </Form>
            </FormDiv>
          </SingleProfileWrapper>
          <SkipBtnDiv>
            <SkipButton onClick={hideFormBtn}>Skip for now</SkipButton>
          </SkipBtnDiv>
        </SingleProfileSection>
      )}
      <GoToTop />
    </SingleProfileSect>
  );
};

export default SingleProfile;
