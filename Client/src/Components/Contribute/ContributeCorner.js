import React, { useState } from "react";
import styled from "styled-components";
import blogImg from "../../images/contributers/undraw_Blogging_re_kl0d.png";
import partner from "../../images/contributers/partner.png";
import addContent from "../../images/contributers/add content.png";
import removeContent from "../../images/contributers/remove content.png";
import bug from "../../images/contributers/bug.png";
import feedback from "../../images/contributers/feedback.png";
import GoToTop from "../GoToTop";
import PhoneInput from "react-phone-number-input";
import "./PhoneNumbers.css";
import axios from "axios";
import LoadingSpinner from "../utils/LoadingSpinner";
import { toast } from "react-toastify";
import ScrollAnimation from "react-animate-on-scroll";
import { Link } from "react-router-dom";

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
const ContactInput = styled.input`
  width: 100%;
  padding: 10px;
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
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
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [query, setQuery] = useState();
  const [text, setText] = useState();
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const contactUsHandler = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/feedback/contact-us", {
        fullname,
        email,
        query,
        text,
        value,
      });
      if (result.data.success) {
        return (
          toast.success(result.data.success, {
            position: "top-center",
          }),
          setSuccess(result.data.success),
          setLoading(false)
        );
      }
      if (result.data.error) {
        return (
          toast.error(result.data.error, {
            position: "top-center",
          }),
          setLoading(false),
          setError(result.data.error)
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
                    value={fullname}
                    type="text"
                    placeholder="Enter your full name"
                    onChange={(event) => setFullname(event.target.value)}
                  />

                  <ContactInput
                    value={email}
                    required
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="Enter your email address"
                  />
                  <PhoneInput
                    defaultCountry="in"
                    style={{ border: "none " }}
                    required
                    className="phone"
                    placeholder="Enter phone number"
                    value={value}
                    onChange={setValue}
                  />
                  <FormSelect
                    value={query}
                    required
                    onChange={(event) => setQuery(event.target.value)}
                  >
                    <FormOption>Choose your option</FormOption>
                    <FormOption value="write blog post">
                      Write blog post
                    </FormOption>
                    <FormOption value="add resource or content">
                      Add resource or content
                    </FormOption>
                    <FormOption value="partner with us">
                      Partner with us
                    </FormOption>
                    <FormOption value="improve content">
                      Improve content
                    </FormOption>
                    <FormOption value="feedback">Feedback</FormOption>
                    <FormOption value="found a bug">Found a bug</FormOption>
                  </FormSelect>
                  <TextArea
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    name=""
                    id=""
                    cols="20"
                    rows="10"
                    placeholder="Describe....."
                  ></TextArea>
                  <SubmitButton type="submit" onClick={contactUsHandler}>
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
