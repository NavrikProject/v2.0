import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LoadingSpinner from "../../utils/LoadingSpinner";
import CourseChangesForm from "./CourseChangesForm";

const Div = styled.div`
  margin-top: 20px;
`;
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
  margin: 50px auto;
  top: 15vh;
  left: 5%;
  width: 70%;
  overflow: scroll;
  height: 500px;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 100000;
  animation: slide-down 300ms ease-out forwards;
`;
const SuggestContentDiv = styled.div`
  margin: 5px 0;
  padding: 20px;
  box-shadow: rgb(142 151 158 / 15%) 0px 4px 19px;
  height: auto;
`;
const SuggestContentUl = styled.ol``;
const SuggestContentList = styled.li``;
const SuggestContentDivFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;
const SuggestContentDivRight = styled.div``;
const SuggestContentDivContent = styled.p`
  font-size: 18px;
  color: #111;
  opacity: 0.9;
  span {
    font-weight: 600;
  }
`;
const SuggestContentDivLeft = styled.div``;
const SuggestContentDivButtons = styled.button`
  margin: 0 auto;
  padding: 12px 20px;
  text-align: center;
  font-size: 17px;
  border: none;
  outline: none;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  background-color: #1363df !important;
  color: #fff !important;
  border-radius: 5px;
  &:hover {
    transition: all 0.5s ease-in-out;
  }
`;

const SuggestContent = () => {
  const [loading, setLoading] = useState(false);
  const [suggestContentCourseList, setSuggestContentCourseList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [courseDetails, setCourseDetails] = useState("");
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getSuggestContentCourses = async () => {
      setLoading(true);
      const res = await axios.post(`/contributers/suggest-content`, {
        email: user?.email,
      });
      if (res.data.suggest) {
        setSuggestContentCourseList(res.data.suggest);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    getSuggestContentCourses();
  }, [user?.email]);
  const showModalHandler = (suggestCourse) => {
    setShowModal(!showModal);
    setCourseDetails(suggestCourse);
  };
  return (
    <Div>
      {showModal && (
        <Backdrop>
          <Modal>
            <CourseChangesForm
              courseDetails={courseDetails}
              showModalHandler={showModalHandler}
            />
          </Modal>
        </Backdrop>
      )}
      {loading && <LoadingSpinner />}
      <SuggestContentUl>
        {suggestContentCourseList?.length > 0 ? (
          suggestContentCourseList.map((suggestCourse) => (
            <SuggestContentDiv>
              <SuggestContentList>
                <SuggestContentDivFlex>
                  <SuggestContentDivRight>
                    <SuggestContentDivContent>
                      Suggest content for this course
                      <span>
                        {" " + suggestCourse.contributer_course_name + " "}
                      </span>
                    </SuggestContentDivContent>
                  </SuggestContentDivRight>
                  <SuggestContentDivLeft>
                    <SuggestContentDivButtons
                      onClick={() => showModalHandler(suggestCourse)}
                    >
                      Click here to suggest content
                    </SuggestContentDivButtons>
                  </SuggestContentDivLeft>
                </SuggestContentDivFlex>
              </SuggestContentList>
            </SuggestContentDiv>
          ))
        ) : (
          <SuggestContentDiv>
            <SuggestContentDivFlex>
              <SuggestContentDivRight>
                <SuggestContentDivContent>
                  <span>
                    Noo Courses are approved for suggesting the content
                  </span>
                </SuggestContentDivContent>
              </SuggestContentDivRight>
              <SuggestContentDivLeft></SuggestContentDivLeft>
            </SuggestContentDivFlex>
          </SuggestContentDiv>
        )}
      </SuggestContentUl>
    </Div>
  );
};

export default SuggestContent;
