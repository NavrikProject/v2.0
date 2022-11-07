import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

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

const AllTraineeCompletedCoursesDetails = (props) => {
  console.log(props);
  const [allTraineeLiveClass, setAllTraineeLiveClass] = useState([]);
  useEffect(() => {
    const getAllTraineeAttendingCourses = async () => {
      const res = await axios.post(`/admin/get/all/live-completed-classes`, {
        traineeCourseId: props.traineeCourse.trainee_course_id,
      });
      if (res.data.success) {
        setAllTraineeLiveClass(res.data.success);
      } else {
        return setAllTraineeLiveClass([]);
      }
    };
    getAllTraineeAttendingCourses();
  }, [props.traineeCourse.trainee_course_id]);

  return (
    <div>
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
        {allTraineeLiveClass?.length > 0 ? (
          allTraineeLiveClass?.map((liveClass) => (
            <p>
              You conducted the live class on the
              <b>
                {" " +
                  new Date(
                    liveClass.instructor_live_class_date
                  ).toDateString() +
                  " "}
              </b>
              and time is
              <b>{" " + liveClass.instructor_live_class_start_time + " "}</b> to
              <b>{" " + liveClass.instructor_live_class_end_time + " "}</b>
              with
              <b>{" " + liveClass.trainee_fullname + " "}</b>
            </p>
          ))
        ) : (
          <p>No live class attended</p>
        )}
        <NoteText>Live Class Button will be enabled on the same date</NoteText>
      </div>
    </div>
  );
};

export default AllTraineeCompletedCoursesDetails;
