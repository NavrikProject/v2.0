import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  FormBtn,
  FormDiv,
  FormLabel,
  SingleProfileSection,
  SingleProfileWrapper,
  Field,
  Input,
  TextArea,
  ErrorMessage,
} from "./FormElements";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";

const AddFirmDetailsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hiringCompanyDetails, setHiringCompanyDetails] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const userEmail = user?.email;
  const addFirmDetailsSubmitHandler = async (newData) => {
    let data = new FormData();
    data.append("image", image);
    data.append("mobile", phoneNumber);
    data.append("email", newData.email);
    data.append("city", newData.city);
    data.append("contactPerson", newData.contactPerson);
    data.append("pincode", newData.pincode);
    data.append("state", newData.state);
    data.append("website", newData.website);
    data.append("country", newData.country);
    data.append("firmName", newData.firmName);
    data.append("address", newData.address);
    data.append("userEmail", userEmail);
    try {
      const res = await axios.post(`/recruiter/add-company-details`, data);
      if (res.data.success) {
        setSuccess(res.data.success);
        toast.success(res.data.success, { position: "top-center" });
        reset();
      }
      if (res.data.error) {
        setError(res.data.error);
        toast.error(res.data.error, { position: "top-center" });
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    const getAllFirmDetails = async () => {
      const res = await axios.get(
        `/recruiter/get-company-details/${userEmail}`
      );
      if (res.data.found) {
        setHiringCompanyDetails(res.data.found);
      }
      if (res.data.error) {
        setHiringCompanyDetails([]);
      }
    };
    getAllFirmDetails();
  }, [userEmail]);
  return (
    <SingleProfileSection>
      <SingleProfileWrapper>
        {hiringCompanyDetails?.length > 0 ? (
          <h1>Found company details</h1>
        ) : (
          <FormDiv>
            {error && (
              <p
                style={{ color: "red", fontSize: "20px", textAlign: "center" }}
              >
                {error}
              </p>
            )}
            {success && (
              <p
                style={{
                  color: "green",
                  fontSize: "20px",
                  textAlign: "center",
                }}
              >
                {success}
              </p>
            )}
            <Form onSubmit={handleSubmit(addFirmDetailsSubmitHandler)}>
              <Field>
                <FormLabel>Email:</FormLabel>
                <Input
                  placeholder="Enter the firm email address"
                  type="email"
                  name="date"
                  {...register("email", {
                    required: "enter the firm email address",
                  })}
                />
              </Field>
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
              <Field>
                <FormLabel>Firm Name:</FormLabel>
                <Input
                  placeholder="Enter the firm name"
                  type="text"
                  name="firmName"
                  {...register("firmName", {
                    required: "enter the firm name",
                  })}
                />
              </Field>
              {errors.firmName && (
                <ErrorMessage>{errors.firmName.message}</ErrorMessage>
              )}
              <Field>
                <FormLabel>Address:</FormLabel>
                <TextArea
                  {...register("address", {
                    required: "Please add the address",
                  })}
                ></TextArea>
                {errors.address && (
                  <ErrorMessage>{errors.address.message}</ErrorMessage>
                )}
              </Field>
              <Field>
                <FormLabel>City Name:</FormLabel>
                <Input
                  placeholder="Enter the city name"
                  type="text"
                  name="city"
                  {...register("city", {
                    required: "enter the city name",
                  })}
                />
              </Field>
              {errors.city && (
                <ErrorMessage>{errors.city.message}</ErrorMessage>
              )}
              <Field>
                <FormLabel>State Name:</FormLabel>
                <Input
                  placeholder="Enter the state name"
                  type="text"
                  name="state"
                  {...register("state", {
                    required: "enter the state name",
                  })}
                />
              </Field>
              {errors.state && (
                <ErrorMessage>{errors.state.message}</ErrorMessage>
              )}
              <Field>
                <FormLabel>Country Name:</FormLabel>
                <Input
                  placeholder="Enter the country name"
                  type="text"
                  name="country"
                  {...register("country", {
                    required: "enter the country name",
                  })}
                />
              </Field>
              {errors.country && (
                <ErrorMessage>{errors.country.message}</ErrorMessage>
              )}
              <Field>
                <FormLabel>Pincode:</FormLabel>
                <Input
                  placeholder="Enter the pin code"
                  type="number"
                  name="pincode"
                  {...register("pincode", {
                    required: "enter the pincode ",
                  })}
                />
              </Field>
              {errors.pincode && (
                <ErrorMessage>{errors.pincode.message}</ErrorMessage>
              )}
              <Field>
                <FormLabel>Contact Person:</FormLabel>
                <Input
                  placeholder="Enter the contact person"
                  type="text"
                  name="contactPerson"
                  {...register("contactPerson", {
                    required: "enter the contact person",
                  })}
                />
              </Field>
              {errors.contactPerson && (
                <ErrorMessage>{errors.contactPerson.message}</ErrorMessage>
              )}
              <Field>
                <FormLabel>Mobile Number:</FormLabel>
                <PhoneInput2
                  country="in"
                  inputStyle={{ width: "100%", padding: "5px 10px" }}
                  onChange={(phone) => setPhoneNumber(phone)}
                />
              </Field>
              <Field>
                <FormLabel>Website:</FormLabel>
                <Input
                  placeholder="Enter the firm website"
                  type="text"
                  name="website"
                  {...register("website", {
                    required: "enter the contact person",
                  })}
                />
              </Field>
              {errors.website && (
                <ErrorMessage>{errors.website.message}</ErrorMessage>
              )}
              <Field>
                <FormLabel>Firm Logo:</FormLabel>
                <Input
                  required
                  type="file"
                  name="image"
                  placeholder="Choose the profile picture"
                  onChange={(event) => setImage(event.target.files[0])}
                />
              </Field>
              <FormBtn>Add Details</FormBtn>
            </Form>
          </FormDiv>
        )}
      </SingleProfileWrapper>
    </SingleProfileSection>
  );
};

export default AddFirmDetailsForm;
