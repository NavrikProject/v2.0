import React, { useState } from "react";
import {
  CloseButton,
  Form,
  FormBtn,
  FormDiv,
  ImageTitleChoose,
  ImgInput,
} from "./FormProfileElements";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
const ImageForm = (props) => {
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;
  const onImageUploadHandler = async (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append("image", image);
    const res = await axios.put(`/trainee/image/upload/${user?.id}`, data, {
      headers: { authorization: "Bearer " + token },
    });
    if (res.data.upload) {
      setSuccess(res.data.upload);
      toast.success(res.data.upload, {
        position: "top-center",
      });
    }
    if (res.data.error) {
      setError(res.data.error);
      toast.error(res.data.error, {
        position: "top-center",
      });
    }
    setImage("");
  };
  return (
    <>
      <CloseButton onClick={props.personal} />
      <FormDiv>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <Form onSubmit={onImageUploadHandler} encType="multipart/form-data">
          <ImageTitleChoose>
            Choose Picture from your local storage
          </ImageTitleChoose>

          <ImgInput
            required
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <FormBtn>Update</FormBtn>
        </Form>
      </FormDiv>
    </>
  );
};

export default ImageForm;
