import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "./AdminPanelElements";
import LinearBuffer from "../utils/Loading";

const Div = styled.div`
  padding: 20px 30px;
  margin: 0 auto;
`;
const FormSelect = styled.select`
  width: 100%;
  font-size: 18px;
  border-radius: 5px;
  padding-bottom: 10px;
  &:focus {
    border-color: #fc83bb;
  }
`;
const FormOption = styled.option``;
const LabelTitle = styled.label`
  font-size: 18px;
  padding: 7px 0;
`;
const Field = styled.div`
  width: 100%;
  margin-bottom: 8px;
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
    border-color: #fc83bb;
  }
`;
const Button = styled.button`
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
    background-color: lightblue;
    transition: all 0.5s ease-in-out;
  }
`;
const ErrorText = styled.p`
  padding-top: 10px;
  text-align: center;
  color: red;
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
const CourseCompletedText = styled.p`
  color: green;
  font-size: 19px;
  text-align: center;
`;
const ModifyTraineeProgress = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const user = useSelector((state) => state.user.currentUser);
  const [userProgressData, setUsersProgressData] = useState([]);
  const [showDateInput, setShowDateInput] = useState(false);
  const [traineeCourseStatus, setTraineeCourseStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axios.get(
        `/trainee/courses/trainee/course-status/${props.traineeDetails.trainee_course_dtls_id}`,
        {
          headers: { authorization: "Bearer " + user?.accessToken },
        }
      );
      if (res.data.success) {
        setUsersProgressData(res.data.success);
      }
      if (res.data.error) {
        setUsersProgressData([]);
      }
    };
    getAllUsers();
  }, [props.traineeDetails.trainee_course_dtls_id, user?.accessToken]);

  const traineeProgressUpdateHandler = async (data) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `/trainee/courses/update-course-progress/${props.traineeDetails.trainee_course_dtls_id}`,
        {
          coursePercentage: data.coursePercentage,
          courseChapters: data.courseChapters,
          courseProgressStatus: data.courseProgressStatus,
          endDate: data.endDate,
          traineeCourseStatus: traineeCourseStatus,
        },
        {
          headers: { authorization: "Bearer " + user?.accessToken },
        }
      );
      if (res.data.success) {
        return (
          (toast.success(res.data.success, {
            position: "top-center",
          }),
          setSuccess(res.data.success)),
          reset(),
          setLoading(false)
        );
      }
      if (res.data.error) {
        return (
          toast.error(res.data.error, {
            position: "top-center",
          }),
          setError(res.data.error),
          setLoading(false)
        );
      }
    } catch (error) {
      return (
        toast.error("There was an error processing your request", {
          position: "top-center",
        }),
        setLoading(false)
      );
    }
    setLoading(false);
  };

  const videoUploadUpdateHandler = async (data) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `/trainee/courses/update-video-upload/${props.traineeDetails.trainee_course_dtls_id}`,
        {
          courseVideoUploadStatus: data.courseVideoUploadStatus,
          traineeCourseStatus,
        },
        {
          headers: { authorization: "Bearer " + user?.accessToken },
        }
      );
      if (res.data.success) {
        return (
          toast.success(res.data.success, {
            position: "top-center",
          }),
          setSuccess(res.data.success),
          reset(),
          setLoading(false)
        );
      }
      if (res.data.error) {
        return (
          toast.error(res.data.error, {
            position: "top-center",
          }),
          setError(res.data.error),
          setLoading(false)
        );
      }
    } catch (error) {
      return (
        toast.error("There was an error processing your request", {
          position: "top-center",
        }),
        setLoading(false)
      );
    }
    setLoading(false);
  };

  const showCompleteDateHandler = (event) => {
    if (event.target.value === "12") {
      setShowDateInput(true);
      setTraineeCourseStatus(event.target.value);
    } else {
      setShowDateInput(false);
      setTraineeCourseStatus(event.target.value);
    }
  };
  return (
    <Div>
      <CloseButtonDiv onClick={props.modifyTraineeProgressHandler}>
        <CloseButton />
      </CloseButtonDiv>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {loading && <LinearBuffer />}
      <>
        {userProgressData?.map((usersData) => (
          <>
            <div>
              {/* show progressing form */}
              <>
                {usersData.trainee_course_progress === "enrolled" ||
                  usersData.trainee_course_progress === "progressing" ||
                  usersData.trainee_course_progress === "not-attending" ||
                  usersData.trainee_course_progress === "dropped" ||
                  (usersData.trainee_course_progress_percentage <= 100 &&
                    usersData.trainee_course_status < 12 &&
                    usersData.trainee_course_video_upload_status ===
                      "pending" &&
                    usersData.trainee_course_complete_status ===
                      "incomplete" && (
                      <form
                        onSubmit={handleSubmit(traineeProgressUpdateHandler)}
                      >
                        <Field>
                          <LabelTitle htmlFor="">
                            Course Progress percentage :
                          </LabelTitle>
                          <Input
                            type="number"
                            placeholder="Enter the course progress percentage"
                            {...register("coursePercentage", {
                              required:
                                "Please enter the course progress percentage,only numbers",
                            })}
                          />
                          {errors.coursePercentage && (
                            <ErrorMessage>
                              {errors.coursePercentage.message}
                            </ErrorMessage>
                          )}
                        </Field>
                        <Field>
                          <LabelTitle htmlFor="">
                            Course Chapters completed :
                          </LabelTitle>
                          <Input
                            type="number"
                            placeholder="Enter the number of chapters completed"
                            {...register("courseChapters", {
                              required:
                                "Please enter the course chapters,only numbers",
                            })}
                          />
                          {errors.courseChapters && (
                            <ErrorMessage>
                              {errors.courseChapters.message}
                            </ErrorMessage>
                          )}
                        </Field>
                        <Field>
                          <LabelTitle htmlFor="">
                            Course progress status :
                          </LabelTitle>
                          <FormSelect
                            name=""
                            id=""
                            {...register("courseProgressStatus", {
                              required: "Select the course progress status",
                            })}
                          >
                            <FormOption value="">
                              Choose below option
                            </FormOption>
                            <FormOption value="progressing">
                              progressing
                            </FormOption>
                            <FormOption value="not-attending">
                              Not attending
                            </FormOption>
                            <FormOption value="dropped">dropped</FormOption>
                            <FormOption value="completed">Completed</FormOption>
                          </FormSelect>
                          {errors.courseProgressStatus && (
                            <ErrorMessage>
                              {errors.courseProgressStatus.message}
                            </ErrorMessage>
                          )}
                        </Field>
                        <Field>
                          <LabelTitle htmlFor="">
                            Course trainee status :
                          </LabelTitle>
                          <FormSelect
                            required
                            name=""
                            id=""
                            onClick={(event) => {
                              showCompleteDateHandler(event);
                            }}
                          >
                            <FormOption value="">
                              Choose below option
                            </FormOption>
                            <FormOption value="5">Course started</FormOption>
                            <FormOption value="6">
                              Instructor session 1 pending
                            </FormOption>
                            <FormOption value="7">
                              Instructor session 1 completed
                            </FormOption>
                            <FormOption value="8">
                              Instructor session 2 pending
                            </FormOption>
                            <FormOption value="9">
                              Instructor session 2 completed
                            </FormOption>
                            <FormOption value="10">
                              Instructor final session pending
                            </FormOption>
                            <FormOption value="11">
                              Instructor final session completed
                            </FormOption>
                            <FormOption value="12">Course Completed</FormOption>
                            <FormOption value="13">
                              Trainee video Recording uploaded
                            </FormOption>
                            <FormOption value="14">Reward dispatch</FormOption>
                            <FormOption value="15">
                              Certificate dispatch
                            </FormOption>
                            <FormOption value="16">Mentor session</FormOption>
                            <FormOption value="18">
                              Trainee points update
                            </FormOption>
                          </FormSelect>
                        </Field>
                        {showDateInput === true && (
                          <>
                            <Field>
                              <LabelTitle htmlFor="">
                                Course completed end date :
                              </LabelTitle>
                              <Input
                                type="date"
                                {...register("endDate", {
                                  required: "Select the course progress status",
                                })}
                              />
                              {errors.endDate && (
                                <ErrorMessage>
                                  {errors.endDate.message}
                                </ErrorMessage>
                              )}{" "}
                            </Field>
                          </>
                        )}
                        <Button type="submit">Update progress Details</Button>
                        <ErrorText>
                          * Please, see the all details before updating
                        </ErrorText>
                      </form>
                    ))}
              </>
              {/* show video update form */}
              <>
                {usersData.trainee_course_progress_percentage === 100 &&
                  usersData.trainee_course_status >= 12 &&
                  usersData.trainee_course_progress_status === "completed" &&
                  usersData.trainee_course_video_upload_status ===
                    "pending" && (
                    <form onSubmit={handleSubmit(videoUploadUpdateHandler)}>
                      <Field>
                        <LabelTitle htmlFor="">
                          Video upload status :
                        </LabelTitle>
                        <FormSelect
                          name=""
                          id=""
                          {...register("courseVideoUploadStatus", {
                            required: "Please select from the dropdown option",
                          })}
                        >
                          <FormOption value="">Choose below Option</FormOption>
                          <FormOption value="uploaded">uploaded</FormOption>
                        </FormSelect>
                        {errors.courseVideoUploadStatus && (
                          <ErrorMessage>
                            {errors.courseVideoUploadStatus.message}
                          </ErrorMessage>
                        )}
                      </Field>
                      <Field>
                        <LabelTitle htmlFor="">
                          Course trainee status :
                        </LabelTitle>
                        <FormSelect
                          required
                          name=""
                          id=""
                          onClick={(event) => {
                            showCompleteDateHandler(event);
                          }}
                        >
                          <FormOption value="">Choose below option</FormOption>
                          <FormOption value="13">
                            Trainee video Recording uploaded
                          </FormOption>
                          <FormOption value="14">Reward dispatched</FormOption>
                          <FormOption value="15">
                            Certificate dispatched
                          </FormOption>
                          <FormOption value="16">
                            Mentor session attended
                          </FormOption>
                          <FormOption value="18">
                            Update the trainee points
                          </FormOption>
                        </FormSelect>
                      </Field>
                      <Button type="submit">Update progress Details</Button>
                      <ErrorText>
                        * Please, see the all details before updating
                      </ErrorText>
                    </form>
                  )}
              </>
              {/* show course progress option */}
              <>
                {usersData.trainee_course_progress_percentage === 100 &&
                  usersData.trainee_course_progress_status === "completed" &&
                  usersData.trainee_course_status >= 12 &&
                  usersData.trainee_course_video_upload_status === "uploaded" &&
                  usersData.trainee_course_reward_points_status === "no" && (
                    <form onSubmit={handleSubmit(videoUploadUpdateHandler)}>
                      <Field>
                        <LabelTitle htmlFor="">
                          Course trainee status :
                        </LabelTitle>
                        <FormSelect
                          required
                          name=""
                          id=""
                          onClick={(event) => {
                            showCompleteDateHandler(event);
                          }}
                        >
                          <FormOption value="">Choose below option</FormOption>
                          <FormOption value="14">Reward dispatched</FormOption>
                          <FormOption value="15">
                            Certificate dispatched
                          </FormOption>
                          <FormOption value="16">
                            Completed Mentor session
                          </FormOption>
                        </FormSelect>
                      </Field>
                      <Button type="submit">Update progress Details</Button>
                      <ErrorText>
                        * Please, see the all details before updating
                      </ErrorText>
                    </form>
                  )}
              </>
              {/* show course complete text */}
              <>
                {usersData.trainee_course_progress_percentage === 100 &&
                  usersData.trainee_course_progress_status === "completed" &&
                  usersData.trainee_course_status <= 18 &&
                  usersData.trainee_course_video_upload_status === "uploaded" &&
                  usersData.trainee_course_reward_points_status === "yes" &&
                  usersData.trainee_course_complete_status === "completed" && (
                    <CourseCompletedText>
                      The trainee has been successfully completed course and
                      reward points has been updated successfully.
                    </CourseCompletedText>
                  )}
              </>
            </div>
          </>
        ))}
      </>
    </Div>
  );
};

export default ModifyTraineeProgress;
