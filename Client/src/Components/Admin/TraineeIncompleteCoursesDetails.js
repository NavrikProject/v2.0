import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import InstructorBooking from "./InstructorBooking";

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
const JoinButton = styled.button`
  outline: none;
  cursor: pointer;
  padding: 10px 33px;
  background-color: rgb(55, 164, 236);
  color: white;
  transition: all 0.4s ease-in-out;
  border: none;
  border-radius: 7px;
  font-size: 14px;
  :disabled {
    cursor: not-allowed !important;
  }
`;
const TraineeIncompleteCoursesDetails = (props) => {
  const [traineeLiveClass, setTraineeLiveClass] = useState([]);

  const [showBookingModel, setShowBookingModel] = useState(false);
  useEffect(() => {
    const getAllTraineeAttendingCourses = async () => {
      const res = await axios.post(`/admin/get/individual/instructor-class`, {
        traineeCourseId: props.traineeCourse.trainee_course_id,
      });
      if (res.data.success) {
        setTraineeLiveClass(res.data.success);
      } else {
        return setTraineeLiveClass([]);
      }
    };
    getAllTraineeAttendingCourses();
  }, [props.traineeCourse.trainee_course_id]);
  const showBookingInstructorHandler = () => {
    setShowBookingModel(!showBookingModel);
  };
  return (
    <div>
      {showBookingModel && (
        <InstructorBooking
          showBookingInstructorHandler={showBookingInstructorHandler}
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
          <div>
            {props.traineeCourse.trainee_course_chapter_completed +
              " chapters completed"}
          </div>
        </UpcomingAllDivContent>
        {traineeLiveClass?.length > 0 ? (
          traineeLiveClass?.map((liveClass) => (
            <>
              <UpcomingAllDivContent>
                Instructor session has been all ready scheduled on the
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
                    href={liveClass.instructor_host_url}
                  >
                    Host Instructor Session
                  </JoinButton>
                </JoinButtonDiv>
              </UpcomingAllDivContent>
            </>
          ))
        ) : (
          <>
            <span>Live class has not been scheduled yet </span> <br />
            <JoinButton onClick={showBookingInstructorHandler}>
              Book Instructor Session
            </JoinButton>
          </>
        )}
        <NoteText>Live Class Button will be enabled on the same date</NoteText>
      </div>
    </div>
  );
};

export default TraineeIncompleteCoursesDetails;
