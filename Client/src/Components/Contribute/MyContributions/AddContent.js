import axios from "axios";
import React, { useEffect, useState } from "react";
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
const AddContentDiv = styled.div`
  margin: 5px 0;
  padding: 20px;
  box-shadow: rgb(142 151 158 / 15%) 0px 4px 19px;
  height: auto;
`;
const AddContentUl = styled.ol``;
const AddContentList = styled.li``;
const AddContentDivFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;
const AddContentDivRight = styled.div``;
const AddContentDivContent = styled.p`
  font-size: 18px;
  color: #111;
  opacity: 0.9;
  span {
    font-weight: 600;
  }
`;
const AddContentDivLeft = styled.div``;
const AddContentDivButtons = styled.button`
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

const AddContent = () => {
  const [loading, setLoading] = useState(false);
  const [addContentCourseList, setAddContentCourseList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [courseDetails, setCourseDetails] = useState("");
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getAddCoursesCourses = async () => {
      setLoading(true);
      const res = await axios.post(`/contributers/add-content`, {
        email: user?.email,
      });
      if (res.data.add) {
        setAddContentCourseList(res.data.add);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    getAddCoursesCourses();
  }, [user?.email]);
  const showModalHandler = (addCourse) => {
    setShowModal(!showModal);
    setCourseDetails(addCourse);
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
      <AddContentUl>
        {addContentCourseList?.length > 0 ? (
          addContentCourseList.map((addCourse) => (
            <AddContentDiv key={addCourse.contributer_details_id}>
              <AddContentList>
                <AddContentDivFlex>
                  <AddContentDivRight>
                    <AddContentDivContent>
                      Add content for this course
                      <span>
                        {" " + addCourse.contributer_course_name + " "}
                      </span>
                    </AddContentDivContent>
                  </AddContentDivRight>
                  <AddContentDivLeft>
                    <AddContentDivButtons
                      onClick={() => showModalHandler(addCourse)}
                    >
                      Click here to add content
                    </AddContentDivButtons>
                  </AddContentDivLeft>
                </AddContentDivFlex>
              </AddContentList>
            </AddContentDiv>
          ))
        ) : (
          <AddContentDiv>
            <AddContentDivFlex>
              <AddContentDivRight>
                <AddContentDivContent>
                  <span> Noo Courses are approved for adding the content</span>
                </AddContentDivContent>
              </AddContentDivRight>
              <AddContentDivLeft></AddContentDivLeft>
            </AddContentDivFlex>
          </AddContentDiv>
        )}
      </AddContentUl>
    </Div>
  );
};

export default AddContent;
