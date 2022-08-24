import React, { useState } from "react";
import styled from "styled-components";
import blogImg from "../../images/contributers/undraw_Blogging_re_kl0d.png";
import partner from "../../images/contributers/partner.png";
import addContent from "../../images/contributers/add content.png";
import removeContent from "../../images/contributers/remove content.png";
import bug from "../../images/contributers/bug.png";
import feedback from "../../images/contributers/feedback.png";
import GoToTop from "../GoToTop";
import "./PhoneNumbers.css";
import axios from "axios";
import LoadingSpinner from "../utils/LoadingSpinner";
import { toast } from "react-toastify";
import ScrollAnimation from "react-animate-on-scroll";
import { Link } from "react-router-dom";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
const ContributeSection = styled.section`
  width: 100%;
  height: auto;
`;
const ContributeWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 40px;
`;
const ContributeMainTitle = styled.h1`
  color: #1c3879;
  font-size: 37px;
  font-weight: 600;
`;
const ContributeDiv = styled.div`
  padding: 20px 0;
`;
const ContributeTitle = styled.h1`
  color: #256d85;
  font-size: 32px;
  font-weight: normal;
`;
const ContributeContentDiv = styled.div``;
const ContributeContentFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ContributeContentLeft = styled.div`
  flex: 8;
  margin-right: ${({ left }) => (left ? "0" : "40px")};
`;
const ContributeContentRight = styled.div`
  flex: 4;
`;
const ContributeContentImg = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 50%;
  border: 1px solid lightblue;
  margin-left: 40px;
`;
const ContributeContentDesc = styled.p`
  color: #111;
  font-size: 18px;
  opacity: 0.9;
`;
const ContactLink = styled.a`
  color: #231955;
`;
const ContactDiv = styled.div`
  padding: 30px 0;
`;
const ContactDivFlex = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const ContactDivLeft = styled.div`
  width: 100%;
`;

const ContactDivRight = styled.div`
  width: 100%;
  margin-left: 20px;
  img {
    width: 100%;
    height: 420px;
    object-fit: cover;
  }
`;
const ErrorMessage = styled.p`
  color: red;
  margin: 0 0 10px 10px;
  font-size: 14px !important;
  font-weight: normal !important;
`;
const ContactInput = styled.input`
  width: 100%;
  padding: 10px;
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  margin-bottom: 20px;
  &:focus {
    border-color: #fc83bb;
  }
`;
const FormSelect = styled.select`
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px;
  &:focus {
    border-color: #fc83bb;
  }
`;
const FormOption = styled.option``;

const TextArea = styled.textarea`
  margin-top: 15px;
  width: 100%;
  padding-bottom: 10px;
  ::placeholder {
    font-size: 16px;
  }
`;
const SubmitButton = styled.button`
  margin: 0 auto;
  width: 100%;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: lightgreen;
    transition: all 0.5s ease-in-out;
  }
`;
const ContributeCorner = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const contactUsHandler = async (data) => {
    setLoading(true);
    try {
      const result = await axios.post("/feedback/contact-us", {
        fullname: data.fullname,
        email: data.email,
        query: data.query,
        text: data.text,
        value: phoneNumber,
      });
      if (result.data.success) {
        return (
          toast.success(result.data.success, {
            position: "top-center",
          }),
          setSuccess(result.data.success),
          setLoading(false),
          reset()
        );
      }
      if (result.data.error) {
        return (
          toast.error(result.data.error, {
            position: "top-center",
          }),
          setLoading(false),
          setError(result.data.error),
          reset()
        );
      }
    } catch (error) {}
  };
  return (
    <>
      <ContributeSection>
        {loading && <LoadingSpinner />}
        <ContributeWrapper>
          <ContributeMainTitle>
            Contibuters Corner <hr />
          </ContributeMainTitle>
          <ContributeDiv>
            <ContributeTitle>Write A blog Post</ContributeTitle>
            <ContributeContentDiv>
              <ContributeContentFlex>
                <ContributeContentLeft>
                  <ContributeContentDesc>
                    We welcome guest posts that provide new perspectives or new
                    information about particular issues in evaluation. We’re
                    particularly interested in posts that reflect on using
                    specific evaluation options in different situations and
                    contexts, or explore the issue of which options to use and
                    when to use them. Have a read of our blog guidelines to find
                    out more.
                    <ContactLink href="#form">Contact Us</ContactLink>
                  </ContributeContentDesc>
                </ContributeContentLeft>
                <ContributeContentRight>
                  <ContributeContentImg src={blogImg} alt="" />
                </ContributeContentRight>
              </ContributeContentFlex>
            </ContributeContentDiv>
          </ContributeDiv>
          <ContributeDiv>
            <ContributeTitle>Add resources or content</ContributeTitle>
            <ScrollAnimation animateIn="fadeIn">
              <ContributeContentDiv>
                <ContributeContentFlex>
                  <ContributeContentRight>
                    <ContributeContentImg src={addContent} alt="" />
                  </ContributeContentRight>
                  <ContributeContentLeft>
                    <ContributeContentDesc>
                      Are there additional resources we should add? They may be
                      guides, overviews, specific tools for using a method, or
                      an example of how you've used a certain method. You can
                      submit a resource recommendation via the
                      <ContactLink>
                        <Link to={"/contributers-corner/register"}>
                          Register here
                        </Link>
                      </ContactLink>
                      form. ​
                    </ContributeContentDesc>
                  </ContributeContentLeft>
                </ContributeContentFlex>
              </ContributeContentDiv>
            </ScrollAnimation>
          </ContributeDiv>
          <ContributeDiv>
            <ContributeTitle>Suggestion or Remove the content</ContributeTitle>
            <ScrollAnimation animateIn="fadeIn">
              <ContributeContentDiv>
                <ContributeContentFlex>
                  <ContributeContentLeft>
                    <ContributeContentDesc>
                      Are you able to improve the content on Practiwiz? Perhaps
                      you can add a more detailed description to a page about a
                      particular method or process, or maybe you have advice to
                      offer? You can look through the Rainbow Framework to find
                      pages that you could contribute to. Share your experiences
                      or suggestions by commenting on content pages or
                      <ContactLink>
                        <Link to={"/contributers-corner/register"}>
                          Register here
                        </Link>
                      </ContactLink>
                      here.
                    </ContributeContentDesc>
                  </ContributeContentLeft>
                  <ContributeContentRight>
                    <ContributeContentImg src={removeContent} alt="" />
                  </ContributeContentRight>
                </ContributeContentFlex>
              </ContributeContentDiv>
            </ScrollAnimation>
          </ContributeDiv>
          <ContributeDiv>
            <ContributeTitle>Partner with us</ContributeTitle>
            <ScrollAnimation animateIn="fadeIn">
              <ContributeContentDiv>
                <ContributeContentFlex>
                  <ContributeContentRight>
                    <ContributeContentImg src={partner} alt="partner" />
                  </ContributeContentRight>
                  <ContributeContentLeft>
                    <ContributeContentDesc>
                      We welcome guest posts that provide new perspectives or
                      new information about particular issues in evaluation.
                      We’re particularly interested in posts that reflect on
                      using specific evaluation options in different situations
                      and contexts, or explore the issue of which options to use
                      and when to use them. Have a read of our blog guidelines
                      to find out more.
                    </ContributeContentDesc>
                  </ContributeContentLeft>
                </ContributeContentFlex>
              </ContributeContentDiv>
            </ScrollAnimation>
          </ContributeDiv>
          <ContributeDiv>
            <ContributeTitle>Give a feedback</ContributeTitle>
            <ScrollAnimation animateIn="fadeIn">
              <ContributeContentDiv>
                <ContributeContentFlex>
                  <ContributeContentLeft>
                    <ContributeContentDesc>
                      What do you think about Practiwiz? We'd love to know how
                      you use it, what you think is useful and what can be
                      improved.
                    </ContributeContentDesc>
                    <ContributeContentDesc>
                      Let us know using the
                      <ContactLink href="#form"> Contact Us </ContactLink> form.
                    </ContributeContentDesc>
                    ​​
                  </ContributeContentLeft>
                  <ContributeContentRight>
                    <ContributeContentImg src={feedback} alt="" />
                  </ContributeContentRight>
                </ContributeContentFlex>
              </ContributeContentDiv>
            </ScrollAnimation>
          </ContributeDiv>
          <ContributeDiv>
            <ContributeTitle>
              Did you Found a bug ? report to us!
            </ContributeTitle>
            <ScrollAnimation animateIn="fadeIn">
              <ContributeContentDiv>
                <ContributeContentFlex>
                  <ContributeContentRight>
                    <ContributeContentImg src={bug} alt="bug" />
                  </ContributeContentRight>
                  <ContributeContentLeft>
                    <ContributeContentDesc>
                      What do you think about Practiwiz? If you found any bud or
                      errors in the website please report us through contact us
                      form or support email.
                    </ContributeContentDesc>
                    <ContributeContentDesc>
                      Let us know using the
                      <ContactLink href="#form"> Contact Us </ContactLink>
                      form.
                    </ContributeContentDesc>
                  </ContributeContentLeft>
                </ContributeContentFlex>
              </ContributeContentDiv>
            </ScrollAnimation>
          </ContributeDiv>
        </ContributeWrapper>
        <ContributeWrapper id="form">
          <ContributeMainTitle>
            Contact Us <hr />
            <ContactDiv>
              {error && (
                <p style={{ color: "red", fontSize: "20px" }}>{error}</p>
              )}
              {success && (
                <p style={{ color: "green", fontSize: "20px" }}>{success}</p>
              )}
              <ContactDivFlex>
                <ContactDivLeft>
                  <ContactInput
                    type="text"
                    placeholder="Enter your fullname"
                    {...register("fullname", {
                      required: "Fullname must be Required for registration",
                    })}
                  />
                  {errors.fullname && (
                    <ErrorMessage>{errors.fullname.message}</ErrorMessage>
                  )}
                  <ContactInput
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email must be Required for registration",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("email");
                    }}
                  />
                  {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                  )}
                  <PhoneInput2
                    country="in"
                    inputStyle={{
                      width: "100%",
                      padding: "5px 10px",
                      marginTop: "10px",
                    }}
                    onChange={(phone) => setPhoneNumber(phone)}
                  />
                  <FormSelect
                    {...register("query", {
                      required: "Choose the query",
                    })}
                  >
                    <FormOption value="">Choose your option</FormOption>
                    <FormOption value="write blog post">
                      Write blog post
                    </FormOption>
                    <FormOption value="partner with us">
                      Partner with us
                    </FormOption>
                    <FormOption value="feedback">Feedback</FormOption>
                    <FormOption value="found a bug">Found a bug</FormOption>
                  </FormSelect>
                  {errors.query && (
                    <ErrorMessage>{errors.query.message}</ErrorMessage>
                  )}
                  <TextArea
                    {...register("text", {
                      required: "Describe in words",
                    })}
                    cols="20"
                    rows="10"
                    placeholder="Describe....."
                  ></TextArea>
                  {errors.text && (
                    <ErrorMessage>{errors.text.message}</ErrorMessage>
                  )}
                  <SubmitButton
                    type="submit"
                    onClick={handleSubmit(contactUsHandler)}
                  >
                    Submit
                  </SubmitButton>
                </ContactDivLeft>
                <ScrollAnimation animateIn="fadeIn">
                  <ContactDivRight>
                    <img
                      src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                      alt=""
                    />
                  </ContactDivRight>
                </ScrollAnimation>
              </ContactDivFlex>
            </ContactDiv>
          </ContributeMainTitle>
        </ContributeWrapper>
        <GoToTop />
      </ContributeSection>
    </>
  );
};

export default ContributeCorner;
