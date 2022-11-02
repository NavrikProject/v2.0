import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { JoinButton } from "../ButtonElements.js";
import TraineeCourseFeedbackForm from "./TraineeCourseFeedbackForm.js";

const UpcomingAllDivContent = styled.div`
  font-size: 20px;
  color: #111;
  opacity: 0.9;
  span {
    font-weight: 600;
    text-transform: uppercase;
  }
  margin-bottom: 12px;
`;
const JoinButtonDiv = styled.div`
  padding: 20px 0 0 0;
`;

const NoteText = styled.p`
  color: #111;
  opacity: 0.5;
  padding-top: 10px;
`;
const FillDiv = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  height: 20px;
`;
const FillDivProgress = styled.div`
  background-color: blue;
  height: 20px;
  width: ${({ color }) => color * 1 + "%"};
`;
const TraineeAttendingCoursesDetails = (props) => {
  const [traineeLiveClass, setTraineeLiveClass] = useState([]);
  const [showFeedbackModel, setShowFeedbackModel] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getAllTraineeAttendingCourses = async () => {
      const res = await axios.post(
        `/trainee/courses/progress/get-trainee-live-classes`,
        {
          userEmail: user?.email,
          traineeCourseId: props.traineeCourse.trainee_course_id,
        }
      );
      if (res.data.success) {
        setTraineeLiveClass(res.data.success);
      } else {
        return setTraineeLiveClass([]);
      }
    };
    getAllTraineeAttendingCourses();
  }, [user, props.traineeCourse.trainee_course_id]);
  const showCourseFeedbackHandler = (id) => {
    setShowFeedbackModel(!showFeedbackModel);
  };
  return (
    <div>
      {showFeedbackModel && (
        <TraineeCourseFeedbackForm
          showCourseFeedbackHandler={showCourseFeedbackHandler}
          traineeCourse={props.traineeCourse}
        />
      )}
      <div>
        <UpcomingAllDivContent>
          <div>
            <span>Course Progress</span>
            <FillDiv>
              <FillDivProgress
                color={props.traineeCourse.trainee_course_progress_percentage}
              />
            </FillDiv>
            {props.traineeCourse.trainee_course_progress_percentage +
              "%  completed"}
          </div>
        </UpcomingAllDivContent>
        {traineeLiveClass?.length > 0
          ? traineeLiveClass?.map((liveClass) => (
              <>
                <UpcomingAllDivContent>
                  Instructor has scheduled a live class on the
                  <span>
                    {" " +
                      new Date(
                        liveClass.instructor_live_class_date
                      ).toDateString() +
                      " "}
                  </span>
                  and live class time is
                  <span>
                    {" " + liveClass.instructor_live_class_start_time + " "}
                    to{" " + liveClass.instructor_live_class_end_time}
                  </span>
                  <JoinButtonDiv>
                    <JoinButton
                      disabled={
                        new Date().toLocaleDateString() !==
                        new Date(
                          liveClass.instructor_live_class_date
                        ).toLocaleDateString()
                      }
                      href={liveClass.trainee_join_url}
                    >
                      Join Instructor Session
                    </JoinButton>
                  </JoinButtonDiv>
                </UpcomingAllDivContent>
              </>
            ))
          : "No live classes has been scheduled"}
        {props.traineeCourse.trainee_course_progress_percentage === 100 && (
          <>
            <br /> You have completed the course please fill the feedback form
            <br />
            <button
              onClick={() =>
                showCourseFeedbackHandler(
                  props.traineeCourse.trainee_course_dtls_id
                )
              }
            >
              SUbmit feedback
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TraineeAttendingCoursesDetails;
