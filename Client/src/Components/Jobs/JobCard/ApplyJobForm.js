import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../FirebaseConfig";
import { toast } from "react-toastify";
import {
  academicYears,
  experienceYears,
  skillOptions,
} from "../../Data/JobApplicationData";
import Select from "react-select";

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
  top: 6vh;
  left: 20%;
  width: 60%;
  height: 80vh;
  overflow: scroll;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 100000;
  animation: slide-down 300ms ease-out forwards;
  /* width */
  &::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  & ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  /* Handle on hover */
  & ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  @media (min-width: 768px) {
    .modal {
      width: 60%;
      left: calc(50% - 20rem);
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
const FormDiv = styled.div`
  width: 80%;
  margin: 30px auto;
`;
const Form = styled.form``;
const FormLabel = styled.label`
  font-size: 17px;
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
    border-color: #111;
  }
`;
const FormOption = styled.option``;
const Field = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;
const Input = styled.input`
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  width: 100%;
  padding: 10px 20px;
  &:focus {
    border-color: #111;
  }
`;
const ErrorMessage = styled.p`
  color: red;
  margin: 0 0 10px 10px;
`;

const FormBtn = styled.button`
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  background-color: #1363df;
  color: #fff;
  border-radius: 5px;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
const JobName = styled.p`
  font-size: 25px;
  padding-bottom: 8px;
  span {
    font-weight: 600;
    color: #077f7f;
    font-size: 19px;
    text-transform: capitalize;
  }
`;
const InputRadio = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  &:focus {
    border-color: #fc83bb;
  }
`;
const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const ApplyJobForm = (props) => {
  const [fileUploading, setFileUploading] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [resume, setResume] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [haveExperience, setHaveExperience] = useState("");
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [experienceFoundDetails, setExperienceFoundDetails] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const getJobAppliedStatus = async () => {
      const res = await axios.get(
        `/jobs/apply/post/form-status/${user?.email}`
      );
      if (res.data.foundExp) {
        setExperienceFoundDetails(true);
      }
      if (res.data.notFoundExp) {
        setExperienceFoundDetails(false);
      }
      if (res.data.notFound) {
        setExperienceFoundDetails("no");
      }
    };
    getJobAppliedStatus();
  }, [user?.email]);
  const applyJobHandler = async (data) => {
    try {
      const res = await axios.post(
        `/jobs/apply/post/${props.indJobDetails.job_post_unique_id}`,
        {
          data: data,
          jobPostDtlsId: props.indJobDetails.job_post_dtls_id,
          hiringCompanyDtlsId: props.indJobDetails.hiring_company_dtls_id,
          userDtlsId: user?.id,
          jobSeekerEmail: user?.email,
          resumeUrl: imageFileName,
          phoneNumber: phoneNumber,
          haveExperience: haveExperience,
          selectedOption: selectedOption,
          jobRole: props.indJobDetails.job_post_heading,
        }
      );
      if (res.data.success) {
        setSuccess(res.data.success);
        toast.success(res.data.success, {
          position: "top-center",
        });
        setLoading(false);
        reset();
      }
      if (res.data.error) {
        setError(res.data.error);
        toast.error(res.data.error, {
          position: "top-center",
        });
        setLoading(false);
      }
    } catch (error) {}
  };

  const applyJobWithExperienceHandler = async (data) => {
    if (!haveExperience) {
      return setError("Please select the one of the buttons");
    }
    try {
      const res = await axios.post(
        `/jobs/apply/post/experience/${props.indJobDetails.job_post_unique_id}`,
        {
          data: data,
          jobPostDtlsId: props.indJobDetails.job_post_dtls_id,
          hiringCompanyDtlsId: props.indJobDetails.hiring_company_dtls_id,
          userDtlsId: user?.id,
          jobSeekerEmail: user?.email,
          haveExperience: haveExperience,
          selectedOption: selectedOption,
          jobRole: props.indJobDetails.job_post_heading,
        }
      );
      if (res.data.success) {
        setSuccess(res.data.success);
        toast.success(res.data.success, {
          position: "top-center",
        });
        setLoading(false);
        reset();
      }
      if (res.data.error) {
        setError(res.data.error);
        toast.error(res.data.error, {
          position: "top-center",
        });
        setLoading(false);
      }
    } catch (error) {}
  };
  const applyJobWithUpdateHandler = async (data) => {
    if (!showUpdate) {
      return setError("Please select the one of the buttons");
    }
    try {
      const res = await axios.post(
        `/jobs/apply/post/update/${props.indJobDetails.job_post_unique_id}`,
        {
          data: data,
          jobPostDtlsId: props.indJobDetails.job_post_dtls_id,
          hiringCompanyDtlsId: props.indJobDetails.hiring_company_dtls_id,
          userDtlsId: user?.id,
          jobSeekerEmail: user?.email,
          resumeUrl: imageFileName,
          phoneNumber: phoneNumber,
          haveExperience: haveExperience,
          selectedOption: selectedOption,
          showUpdate: showUpdate,
          jobRole: props.indJobDetails.job_post_heading,
        }
      );
      if (res.data.success) {
        setSuccess(res.data.success);
        toast.success(res.data.success, {
          position: "top-center",
        });
        setLoading(false);
        reset();
      }
      if (res.data.error) {
        setError(res.data.error);
        toast.error(res.data.error, {
          position: "top-center",
        });
        setLoading(false);
      }
    } catch (error) {}
  };
  const typeHandler = (event) => {
    setError(" ");
    if (event.target.value === "yes") {
      setHaveExperience(event.target.value);
      setShowExperienceForm(true);
    } else {
      setHaveExperience(event.target.value);
      setShowExperienceForm(false);
    }
  };
  const showUpdateFormHandler = (event) => {
    setError(" ");
    if (event.target.value === "yes") {
      setShowUpdate(event.target.value);
    } else {
      setShowUpdate(event.target.value);
    }
  };
  useEffect(() => {
    const uploadImageTOFirebase = () => {
      if (!resume) {
        return;
      }
      const fileName = new Date().getTime() + "-" + resume.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, resume);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileUploading("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.log(error);
          toast.error("There was an error while uploading the image", {
            position: "top-center",
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileName(downloadURL);
            setImageUploaded(true);
            setFileUploading("File uploaded");
          });
        }
      );
    };
    uploadImageTOFirebase();
  }, [resume]);

  return (
    <Backdrop>
      <Modal>
        <CloseButtonDiv onClick={props.showApplyJobModalHandler}>
          <CloseButton />
        </CloseButtonDiv>
        <FormDiv>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          {success && (
            <p style={{ color: "green", textAlign: "center" }}>{success}</p>
          )}
          {loading && <p>Loading... please wait...</p>}
          <JobName>
            You are applying for
            <span>{" " + props.indJobDetails.job_post_heading + " "}</span>
            <hr />
          </JobName>
          {/* show default form */}
          {experienceFoundDetails === "no" && (
            <>
              <Form onSubmit={handleSubmit(applyJobHandler)}>
                <Field>
                  <FormLabel>Upload your resume or cv :</FormLabel>
                  <Input
                    accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    required
                    type="file"
                    name="image"
                    placeholder="Choose the profile picture"
                    onChange={(event) => setResume(event.target.files[0])}
                  />
                  {fileUploading && (
                    <p style={{ color: "green" }}>{fileUploading}</p>
                  )}
                  * Only Pdf or Doc or Docx format accepted.
                </Field>
                <Field>
                  <Input
                    {...register("fullname", {
                      required: "Please enter your full Name",
                    })}
                    type="text"
                    placeholder="Enter your full Name"
                  />
                  {errors.fullname && (
                    <ErrorMessage>{errors.fullname.message}</ErrorMessage>
                  )}
                </Field>
                <Field>
                  <FormLabel>Enter your mobile number :</FormLabel>
                  <PhoneInput2
                    country="in"
                    inputStyle={{ width: "100%", padding: "5px 10px" }}
                    onChange={(phone) => setPhoneNumber(phone)}
                  />
                </Field>
                <Field>
                  <FormLabel>Choose the currency:</FormLabel>
                  <FormSelect
                    name="currency"
                    {...register("currency", {
                      required: "Choose your currency",
                    })}
                  >
                    <FormOption value="">Choose a below option</FormOption>
                    <FormOption value="INR">INR</FormOption>
                    <FormOption value="USD">USD</FormOption>
                    <FormOption value="Pounds">Pounds</FormOption>
                    <FormOption value="CD">Canadian Dollars</FormOption>
                  </FormSelect>
                  {errors.currency && (
                    <ErrorMessage>{errors.currency.message}</ErrorMessage>
                  )}
                </Field>
                <Field>
                  <Input
                    {...register("location", {
                      required: "Enter your location",
                    })}
                    type="text"
                    placeholder="Enter your location"
                  />
                  {errors.location && (
                    <ErrorMessage>{errors.location.message}</ErrorMessage>
                  )}
                </Field>
                <Field>
                  <Input
                    {...register("city", {
                      required: "Enter your city",
                    })}
                    type="text"
                    placeholder="Enter your city"
                  />
                  {errors.city && (
                    <ErrorMessage>{errors.city.message}</ErrorMessage>
                  )}
                </Field>
                <Field>
                  <Input
                    {...register("state", {
                      required: "Enter your state name",
                    })}
                    type="text"
                    placeholder="Enter your state name"
                  />
                  {errors.state && (
                    <ErrorMessage>{errors.state.message}</ErrorMessage>
                  )}
                </Field>
                <Field>
                  <Input
                    {...register("country", {
                      required: "Enter your country name",
                    })}
                    type="text"
                    placeholder="Enter your country name"
                  />
                  {errors.country && (
                    <ErrorMessage>{errors.country.message}</ErrorMessage>
                  )}
                </Field>
                <h1>
                  Educational Details <hr />
                </h1>
                <Field>
                  <Input
                    {...register("collegeName", {
                      required: "Enter your college name",
                    })}
                    type="text"
                    placeholder="Enter your college name"
                  />
                  {errors.collegeName && (
                    <ErrorMessage>{errors.collegeName.message}</ErrorMessage>
                  )}
                </Field>
                <Field>
                  <Input
                    {...register("universityName", {
                      required: "Enter your university name",
                    })}
                    type="text"
                    placeholder="Enter your university name"
                  />
                  {errors.universityName && (
                    <ErrorMessage>{errors.universityName.message}</ErrorMessage>
                  )}
                </Field>
                <Field>
                  <FormSelect
                    name="startingYear"
                    {...register("startingYear", {
                      required: "Choose the highest education starting year",
                    })}
                  >
                    <FormOption value="">
                      Choose the highest education starting year
                    </FormOption>
                    {academicYears.map((year) => (
                      <FormOption value={year.value}>{year.value}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.startingYear && (
                    <ErrorMessage>{errors.startingYear.message}</ErrorMessage>
                  )}
                </Field>
                <Field>
                  <FormSelect
                    name="endingYear"
                    {...register("endingYear", {
                      required: "Choose the highest education starting year",
                    })}
                  >
                    <FormOption value="">
                      Choose the highest education ending year
                    </FormOption>
                    {academicYears.map((year) => (
                      <FormOption value={year.value}>{year.value}</FormOption>
                    ))}
                  </FormSelect>
                  {errors.endingYear && (
                    <ErrorMessage>{errors.endingYear.message}</ErrorMessage>
                  )}
                </Field>
                <Field>
                  <FormLabel>Highest Education completion year : </FormLabel>
                  <Input
                    {...register("completedYear", {
                      required: "Enter your highest education passed out year",
                    })}
                    type="date"
                    placeholder="Enter your highest education passed out year"
                  />
                  {errors.completedYear && (
                    <ErrorMessage>{errors.completedYear.message}</ErrorMessage>
                  )}
                </Field>
                <Field>
                  <Input
                    {...register("percentage", {
                      required: "Enter your highest education percentage",
                    })}
                    type="number"
                    placeholder="Enter your highest education percentage"
                  />
                  {errors.percentage && (
                    <ErrorMessage>{errors.percentage.message}</ErrorMessage>
                  )}
                </Field>
                <Field>
                  <FormLabel>Select your skills</FormLabel>
                  <Select
                    required
                    isMulti={true}
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={skillOptions}
                  />
                </Field>
                <Field>
                  <RadioWrapper>
                    Do you have work experience ?
                    <RadioWrapper>
                      <InputRadio
                        required
                        type="radio"
                        id="yes"
                        value="yes"
                        checked={haveExperience === "yes"}
                        onChange={typeHandler}
                      />
                      <FormLabel htmlFor="yes">Yes</FormLabel>
                    </RadioWrapper>
                    <RadioWrapper>
                      <InputRadio
                        required
                        type="radio"
                        id="no"
                        value="no"
                        checked={haveExperience === "no"}
                        onChange={typeHandler}
                      />
                      <FormLabel htmlFor="no">No</FormLabel>
                    </RadioWrapper>
                  </RadioWrapper>
                </Field>
                {showExperienceForm && (
                  <>
                    <h1>
                      Experience Details
                      <hr />
                    </h1>
                    <Field>
                      <Input
                        {...register("currentCompanyName", {
                          required: "Enter your current company name",
                        })}
                        type="text"
                        placeholder="Enter your current company name"
                      />
                      {errors.currentCompanyName && (
                        <ErrorMessage>
                          {errors.currentCompanyName.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("currentDesignation", {
                          required: "Enter your current designation",
                        })}
                        type="text"
                        placeholder="Enter your current designation"
                      />
                      {errors.currentDesignation && (
                        <ErrorMessage>
                          {errors.currentDesignation.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <FormSelect
                        name="experience"
                        {...register("experience", {
                          required: "Choose the experience years",
                        })}
                      >
                        <FormOption value="">
                          Select the number of years experience
                        </FormOption>
                        {experienceYears.map((expYear) => (
                          <FormOption key={expYear.id} value={expYear.value}>
                            {expYear.value} years
                          </FormOption>
                        ))}
                      </FormSelect>
                      {errors.experience && (
                        <ErrorMessage>{errors.experience.message}</ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("currentCompanySalary", {
                          required: "Enter your current annual salary",
                        })}
                        type="number"
                        placeholder="Enter your current annual salary"
                      />
                      {errors.currentCompanySalary && (
                        <ErrorMessage>
                          {errors.currentCompanySalary.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("expectedSalary", {
                          required: "Enter your expected salary",
                        })}
                        type="number"
                        placeholder="Enter your expected salary"
                      />
                      {errors.expectedSalary && (
                        <ErrorMessage>
                          {errors.expectedSalary.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("companyLocation", {
                          required: "Enter your Company location",
                        })}
                        type="text"
                        placeholder="Enter your company location"
                      />
                      {errors.companyLocation && (
                        <ErrorMessage>
                          {errors.companyLocation.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("companyCity", {
                          required: "Enter your company city",
                        })}
                        type="text"
                        placeholder="Enter your company city"
                      />
                      {errors.companyCity && (
                        <ErrorMessage>
                          {errors.companyCity.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("companyState", {
                          required: "Enter your company state name",
                        })}
                        type="text"
                        placeholder="Enter your company state name"
                      />
                      {errors.companyState && (
                        <ErrorMessage>
                          {errors.companyState.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("companyCountry", {
                          required: "Enter your company country name",
                        })}
                        type="text"
                        placeholder="Enter your company country name"
                      />
                      {errors.companyCountry && (
                        <ErrorMessage>
                          {errors.companyCountry.message}
                        </ErrorMessage>
                      )}
                    </Field>
                  </>
                )}{" "}
                <FormBtn type="submit" disabled={!imageUploaded && !resume}>
                  Apply Now
                </FormBtn>
              </Form>
            </>
          )}
          {/* show only experience form form */}
          {experienceFoundDetails === false && (
            <>
              <Form onSubmit={handleSubmit(applyJobWithExperienceHandler)}>
                <Field>
                  <RadioWrapper>
                    Do you have work experience ?
                    <RadioWrapper>
                      <InputRadio
                        onFocus={() => setError(" ")}
                        required
                        type="radio"
                        id="yes"
                        value="yes"
                        checked={haveExperience === "yes"}
                        onChange={typeHandler}
                      />
                      <FormLabel htmlFor="yes">Yes</FormLabel>
                    </RadioWrapper>
                    <RadioWrapper>
                      <InputRadio
                        onFocus={() => setError(" ")}
                        required
                        type="radio"
                        id="no"
                        value="no"
                        checked={haveExperience === "no"}
                        onChange={typeHandler}
                      />
                      <FormLabel htmlFor="no">No</FormLabel>
                    </RadioWrapper>
                  </RadioWrapper>
                </Field>
                {showExperienceForm && (
                  <>
                    <h1>
                      Experience Details
                      <hr />
                    </h1>
                    <Field>
                      <Input
                        {...register("currentCompanyName", {
                          required: "Enter your current company name",
                        })}
                        type="text"
                        placeholder="Enter your current company name"
                      />
                      {errors.currentCompanyName && (
                        <ErrorMessage>
                          {errors.currentCompanyName.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("currentDesignation", {
                          required: "Enter your current designation",
                        })}
                        type="text"
                        placeholder="Enter your current designation"
                      />
                      {errors.currentDesignation && (
                        <ErrorMessage>
                          {errors.currentDesignation.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <FormSelect
                        name="experience"
                        {...register("experience", {
                          required: "Choose the experience years",
                        })}
                      >
                        <FormOption value="">
                          Select the number of years experience
                        </FormOption>
                        {experienceYears.map((expYear) => (
                          <FormOption key={expYear.id} value={expYear.value}>
                            {expYear.value} years
                          </FormOption>
                        ))}
                      </FormSelect>
                      {errors.experience && (
                        <ErrorMessage>{errors.experience.message}</ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("currentCompanySalary", {
                          required: "Enter your current annual salary",
                        })}
                        type="number"
                        placeholder="Enter your current annual salary"
                      />
                      {errors.currentCompanySalary && (
                        <ErrorMessage>
                          {errors.currentCompanySalary.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("expectedSalary", {
                          required: "Enter your expected salary",
                        })}
                        type="number"
                        placeholder="Enter your expected salary"
                      />
                      {errors.expectedSalary && (
                        <ErrorMessage>
                          {errors.expectedSalary.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("companyLocation", {
                          required: "Enter your Company location",
                        })}
                        type="text"
                        placeholder="Enter your company location"
                      />
                      {errors.companyLocation && (
                        <ErrorMessage>
                          {errors.companyLocation.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("companyCity", {
                          required: "Enter your company city",
                        })}
                        type="text"
                        placeholder="Enter your company city"
                      />
                      {errors.companyCity && (
                        <ErrorMessage>
                          {errors.companyCity.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("companyState", {
                          required: "Enter your company state name",
                        })}
                        type="text"
                        placeholder="Enter your company state name"
                      />
                      {errors.companyState && (
                        <ErrorMessage>
                          {errors.companyState.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("companyCountry", {
                          required: "Enter your company country name",
                        })}
                        type="text"
                        placeholder="Enter your company country name"
                      />
                      {errors.companyCountry && (
                        <ErrorMessage>
                          {errors.companyCountry.message}
                        </ErrorMessage>
                      )}
                    </Field>
                  </>
                )}
                <FormBtn type="submit">Apply Now</FormBtn>
              </Form>
            </>
          )}{" "}
          {/* show only the form when user wants to update */}
          {experienceFoundDetails === true && (
            <Form onSubmit={handleSubmit(applyJobWithUpdateHandler)}>
              <Field>
                <RadioWrapper>
                  Do you want update your details ?
                  <RadioWrapper>
                    <InputRadio
                      required
                      type="radio"
                      id="yes"
                      value="yes"
                      checked={showUpdate === "yes"}
                      onChange={showUpdateFormHandler}
                    />
                    <FormLabel htmlFor="yes">Yes</FormLabel>
                  </RadioWrapper>
                  <RadioWrapper>
                    <InputRadio
                      required
                      type="radio"
                      id="no"
                      value="no"
                      checked={showUpdate === "no"}
                      onChange={showUpdateFormHandler}
                    />
                    <FormLabel htmlFor="no">No</FormLabel>
                  </RadioWrapper>
                </RadioWrapper>
                {showUpdate === "yes" && (
                  <>
                    <Field>
                      <FormLabel>Upload your resume or cv :</FormLabel>
                      <Input
                        accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        required
                        type="file"
                        name="image"
                        placeholder="Choose the profile picture"
                        onChange={(event) => setResume(event.target.files[0])}
                      />
                      {fileUploading && (
                        <p style={{ color: "green" }}>{fileUploading}</p>
                      )}
                      * Only Pdf or Doc or Docx format accepted.
                    </Field>
                    <Field>
                      <Input
                        {...register("fullname", {
                          required: "Please enter your full Name",
                        })}
                        type="text"
                        placeholder="Enter your full Name"
                      />
                      {errors.fullname && (
                        <ErrorMessage>{errors.fullname.message}</ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <FormLabel>Enter your mobile number :</FormLabel>
                      <PhoneInput2
                        country="in"
                        inputStyle={{ width: "100%", padding: "5px 10px" }}
                        onChange={(phone) => setPhoneNumber(phone)}
                      />
                    </Field>
                    <Field>
                      <FormLabel>Choose the currency:</FormLabel>
                      <FormSelect
                        name="currency"
                        {...register("currency", {
                          required: "Choose your currency",
                        })}
                      >
                        <FormOption value="">Choose a below option</FormOption>
                        <FormOption value="INR">INR</FormOption>
                        <FormOption value="USD">USD</FormOption>
                        <FormOption value="Pounds">Pounds</FormOption>
                        <FormOption value="CD">Canadian Dollars</FormOption>
                      </FormSelect>
                      {errors.currency && (
                        <ErrorMessage>{errors.currency.message}</ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("location", {
                          required: "Enter your location",
                        })}
                        type="text"
                        placeholder="Enter your location"
                      />
                      {errors.location && (
                        <ErrorMessage>{errors.location.message}</ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("city", {
                          required: "Enter your city",
                        })}
                        type="text"
                        placeholder="Enter your city"
                      />
                      {errors.city && (
                        <ErrorMessage>{errors.city.message}</ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("state", {
                          required: "Enter your state name",
                        })}
                        type="text"
                        placeholder="Enter your state name"
                      />
                      {errors.state && (
                        <ErrorMessage>{errors.state.message}</ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("country", {
                          required: "Enter your country name",
                        })}
                        type="text"
                        placeholder="Enter your country name"
                      />
                      {errors.country && (
                        <ErrorMessage>{errors.country.message}</ErrorMessage>
                      )}
                    </Field>
                    <h1>
                      Educational Details <hr />
                    </h1>
                    <Field>
                      <Input
                        {...register("collegeName", {
                          required: "Enter your college name",
                        })}
                        type="text"
                        placeholder="Enter your college name"
                      />
                      {errors.collegeName && (
                        <ErrorMessage>
                          {errors.collegeName.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("universityName", {
                          required: "Enter your university name",
                        })}
                        type="text"
                        placeholder="Enter your university name"
                      />
                      {errors.universityName && (
                        <ErrorMessage>
                          {errors.universityName.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <FormSelect
                        name="startingYear"
                        {...register("startingYear", {
                          required:
                            "Choose the highest education starting year",
                        })}
                      >
                        <FormOption value="">
                          Choose the highest education starting year
                        </FormOption>
                        {academicYears.map((year) => (
                          <FormOption value={year.value}>
                            {year.value}
                          </FormOption>
                        ))}
                      </FormSelect>
                      {errors.startingYear && (
                        <ErrorMessage>
                          {errors.startingYear.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <FormSelect
                        name="endingYear"
                        {...register("endingYear", {
                          required:
                            "Choose the highest education starting year",
                        })}
                      >
                        <FormOption value="">
                          Choose the highest education ending year
                        </FormOption>
                        {academicYears.map((year) => (
                          <FormOption value={year.value}>
                            {year.value}
                          </FormOption>
                        ))}
                      </FormSelect>
                      {errors.endingYear && (
                        <ErrorMessage>{errors.endingYear.message}</ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <FormLabel>
                        Highest Education completion year :{" "}
                      </FormLabel>
                      <Input
                        {...register("completedYear", {
                          required:
                            "Enter your highest education passed out year",
                        })}
                        type="date"
                        placeholder="Enter your highest education passed out year"
                      />
                      {errors.completedYear && (
                        <ErrorMessage>
                          {errors.completedYear.message}
                        </ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <Input
                        {...register("percentage", {
                          required: "Enter your highest education percentage",
                        })}
                        type="number"
                        placeholder="Enter your highest education percentage"
                      />
                      {errors.percentage && (
                        <ErrorMessage>{errors.percentage.message}</ErrorMessage>
                      )}
                    </Field>
                    <Field>
                      <FormLabel>Select your skills</FormLabel>
                      <Select
                        required
                        isMulti={true}
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={skillOptions}
                      />
                    </Field>
                    <Field>
                      <RadioWrapper>
                        Do you have work experience ?
                        <RadioWrapper>
                          <InputRadio
                            required
                            type="radio"
                            id="yes"
                            value="yes"
                            checked={haveExperience === "yes"}
                            onChange={typeHandler}
                          />
                          <FormLabel htmlFor="yes">Yes</FormLabel>
                        </RadioWrapper>
                        <RadioWrapper>
                          <InputRadio
                            required
                            type="radio"
                            id="no"
                            value="no"
                            checked={haveExperience === "no"}
                            onChange={typeHandler}
                          />
                          <FormLabel htmlFor="no">No</FormLabel>
                        </RadioWrapper>
                      </RadioWrapper>
                    </Field>
                    {showExperienceForm && (
                      <>
                        <h1>
                          Experience Details
                          <hr />
                        </h1>
                        <Field>
                          <Input
                            {...register("currentCompanyName", {
                              required: "Enter your current company name",
                            })}
                            type="text"
                            placeholder="Enter your current company name"
                          />
                          {errors.currentCompanyName && (
                            <ErrorMessage>
                              {errors.currentCompanyName.message}
                            </ErrorMessage>
                          )}
                        </Field>
                        <Field>
                          <Input
                            {...register("currentDesignation", {
                              required: "Enter your current designation",
                            })}
                            type="text"
                            placeholder="Enter your current designation"
                          />
                          {errors.currentDesignation && (
                            <ErrorMessage>
                              {errors.currentDesignation.message}
                            </ErrorMessage>
                          )}
                        </Field>
                        <Field>
                          <FormSelect
                            name="experience"
                            {...register("experience", {
                              required: "Choose the experience years",
                            })}
                          >
                            <FormOption value="">
                              Select the number of years experience
                            </FormOption>
                            {experienceYears.map((expYear) => (
                              <FormOption
                                key={expYear.id}
                                value={expYear.value}
                              >
                                {expYear.value} years
                              </FormOption>
                            ))}
                          </FormSelect>
                          {errors.experience && (
                            <ErrorMessage>
                              {errors.experience.message}
                            </ErrorMessage>
                          )}
                        </Field>
                        <Field>
                          <Input
                            {...register("currentCompanySalary", {
                              required: "Enter your current annual salary",
                            })}
                            type="number"
                            placeholder="Enter your current annual salary"
                          />
                          {errors.currentCompanySalary && (
                            <ErrorMessage>
                              {errors.currentCompanySalary.message}
                            </ErrorMessage>
                          )}
                        </Field>
                        <Field>
                          <Input
                            {...register("expectedSalary", {
                              required: "Enter your expected salary",
                            })}
                            type="number"
                            placeholder="Enter your expected salary"
                          />
                          {errors.expectedSalary && (
                            <ErrorMessage>
                              {errors.expectedSalary.message}
                            </ErrorMessage>
                          )}
                        </Field>
                        <Field>
                          <Input
                            {...register("companyLocation", {
                              required: "Enter your Company location",
                            })}
                            type="text"
                            placeholder="Enter your company location"
                          />
                          {errors.companyLocation && (
                            <ErrorMessage>
                              {errors.companyLocation.message}
                            </ErrorMessage>
                          )}
                        </Field>
                        <Field>
                          <Input
                            {...register("companyCity", {
                              required: "Enter your company city",
                            })}
                            type="text"
                            placeholder="Enter your company city"
                          />
                          {errors.companyCity && (
                            <ErrorMessage>
                              {errors.companyCity.message}
                            </ErrorMessage>
                          )}
                        </Field>
                        <Field>
                          <Input
                            {...register("companyState", {
                              required: "Enter your company state name",
                            })}
                            type="text"
                            placeholder="Enter your company state name"
                          />
                          {errors.companyState && (
                            <ErrorMessage>
                              {errors.companyState.message}
                            </ErrorMessage>
                          )}
                        </Field>
                        <Field>
                          <Input
                            {...register("companyCountry", {
                              required: "Enter your company country name",
                            })}
                            type="text"
                            placeholder="Enter your company country name"
                          />
                          {errors.companyCountry && (
                            <ErrorMessage>
                              {errors.companyCountry.message}
                            </ErrorMessage>
                          )}
                        </Field>
                      </>
                    )}
                  </>
                )}
              </Field>
              <FormBtn
                type="submit"
                disabled={showUpdate === "yes" && !imageUploaded && !resume}
              >
                Apply Now
              </FormBtn>
            </Form>
          )}
        </FormDiv>
      </Modal>
    </Backdrop>
  );
};

export default ApplyJobForm;
