import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  CloseButton,
  Form,
  FormAddress,
  FormBtn,
  FormDiv,
  FormFlex,
  FormInput,
  FormInputDate,
  FormLabel,
  FormOption,
  FormSelect,
} from "./FormProfileElements";
import { toast } from "react-toastify";
import Loading from "../../utils/Loading";

const Form1 = (props) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [graduate, setGraduate] = useState("");
  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;

  const profileAccountHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `/trainee/profile/update/${user?.id}`,
        {
          mobile: mobile,
          dob: dob,
          address: address,
          experience: experience,
          graduate: graduate,
          profession: profession,
        },
        { headers: { authorization: "Bearer " + token } }
      );
      if (res.data.success) {
        setSuccess(res.data.success);
        toast.success("Successfully update your personal details", {
          position: "top-center",
        });
        setLoading(false);
      }
      if (res.data.error) {
        setError(res.data.error);
        toast.error("There was a problem updating your personal details", {
          position: "top-center",
        });
        setLoading(false);
      }
    } catch (error) {
      return;
    }
    setProfession("");
    setDob("");
    setMobile("");
    setGraduate("");
    setExperience("");
    setAddress("");
    setLoading(false);
  };
  setTimeout(() => {
    setError("");
    setSuccess("");
  }, 8000);
  return (
    <>
      <CloseButton onClick={props.personal} />
      <FormDiv>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}{" "}
        {loading && <Loading />}
        <Form onSubmit={profileAccountHandler}>
          <FormInput
            required
            type="number"
            placeholder="Enter your Mobile Name"
            minLength="10"
            onChange={(e) => setMobile(e.target.value)}
          />
          <FormFlex>
            <FormLabel htmlFor="">Enter your Dob :</FormLabel>
            <FormInputDate
              required
              type="date"
              onChange={(e) => setDob(e.target.value)}
            />
          </FormFlex>
          <FormFlex>
            <FormLabel>Education:</FormLabel>
            <FormSelect
              required
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
              required
              onChange={(event) => setProfession(event.target.value)}
            >
              <FormOption>Choose a below option</FormOption>
              <FormOption value="graduation">
                Completed the graduation
              </FormOption>
              <FormOption value="trainer">Looking for a trainer</FormOption>
              <FormOption value="job">Seeking for a job</FormOption>
              <FormOption value="skills">Learning a new skills</FormOption>
            </FormSelect>
          </FormFlex>
          <FormFlex>
            <FormLabel>Experience:</FormLabel>
            <FormSelect
              required
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
          <FormAddress required onChange={(e) => setAddress(e.target.value)}>
            Enter your address
          </FormAddress>
          <FormBtn>Update Profile</FormBtn>
        </Form>
      </FormDiv>
    </>
  );
};

export default Form1;
