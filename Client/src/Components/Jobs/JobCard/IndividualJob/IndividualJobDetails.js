import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IndividualJobDesc,
  IndividualJobDescriptionDiv,
  IndividualJobDescTitle,
  IndividualJobDisplayFlex,
  IndividualJobDiv,
  IndividualJobDivLeft,
  IndividualJobDivRight,
  IndividualJobList,
  IndividualJobSection,
  IndividualJobUl,
  IndividualJobWrapper,
  ApplyNowButton,
  JobCardDescription,
  JobCardDisplayFlexDiv,
  JobCardSection,
  JobTitle,
  ViewJobButton,
  AppliedText,
} from "./IndividualJobElements";
import GoToTop from "../../../GoToTop";
import TrendingJobs from "./TrendingJobs";
import LoginModel from "../../../Forms/LoginModel.js";
import { useSelector } from "react-redux";
import ApplyJobForm from "../ApplyJobForm";
const IndividualJobDetails = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [individualJobDetail, setIndividualJobDetail] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showApplyJobForm, setApplyJobForm] = useState(false);
  const [indJobDetails, setIndJobDetails] = useState("");
  const [appliedStatus, setAppliedStatus] = useState(false);
  const location = useLocation();
  let path = location.pathname.split("/")[3];
  useEffect(() => {
    const getAllJobPosts = async () => {
      const res = await axios.get(`/jobs/get/individual-job-post/${path}`);
      if (res.data.success) {
        setIndividualJobDetail(res.data.success);
      }
      if (res.data.error) {
        setIndividualJobDetail([]);
      }
    };
    getAllJobPosts();
  }, [path]);

  useEffect(() => {
    const getJobAppliedStatus = async () => {
      const res = await axios.post(`/jobs/apply/post/applied-status/${path}`, {
        email: user?.email,
      });
      if (res.data.success) {
        setAppliedStatus(true);
      }
      if (res.data.error) {
        setAppliedStatus(false);
      }
    };
    getJobAppliedStatus();
  }, [path, user?.email]);
  const showLoginModelHandler = () => {
    setShowLoginModal(!showLoginModal);
    setApplyJobForm(false);
  };
  const showApplyJobModalHandler = (job) => {
    setShowLoginModal(false);
    setApplyJobForm(!showApplyJobForm);
    setIndJobDetails(job);
  };
  return (
    <IndividualJobSection>
      {showLoginModal && (
        <LoginModel showLoginModelHandler={showLoginModelHandler} />
      )}
      {showApplyJobForm && (
        <ApplyJobForm
          showApplyJobModalHandler={showApplyJobModalHandler}
          indJobDetails={indJobDetails}
        />
      )}
      <IndividualJobWrapper>
        <IndividualJobDisplayFlex>
          <IndividualJobDivRight>
            {individualJobDetail?.length > 0 ? (
              individualJobDetail?.map((job) => (
                <div key={job.job_post_dtls_id}>
                  <IndividualJobDiv>
                    <JobCardSection>
                      <article>
                        <div>
                          <div>
                            <JobTitle>
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "#062C30",
                                }}
                                to={`/jobs/individual-job/${job.job_post_unique_id}`}
                              >
                                {" " + job.job_post_role.split("-").join(" ")}
                              </Link>
                            </JobTitle>
                            <div>
                              <p>{" " + job.job_post_company_name}</p>
                            </div>
                            <div>{" " + job.job_post_heading}</div>
                            <JobCardDisplayFlexDiv>
                              <JobCardDescription>
                                <b>Experience : </b>
                                <span>{job.job_post_min_exp} Yrs</span>
                              </JobCardDescription>
                              <JobCardDescription>
                                <b>Qualification :</b>
                                <span>{job.job_post_min_qual}</span>
                              </JobCardDescription>
                            </JobCardDisplayFlexDiv>
                            <JobCardDisplayFlexDiv>
                              <JobCardDescription>
                                <b>Work Type : </b>
                                <span>{" " + job.job_post_work_type}</span>
                              </JobCardDescription>
                              <JobCardDescription>
                                <b>Employment Type :</b>
                                <span>{" " + job.job_post_job_type}</span>
                              </JobCardDescription>
                            </JobCardDisplayFlexDiv>
                          </div>
                        </div>
                        <div>
                          <JobCardDescription>
                            <b> Key Skills:</b>
                            <span>{" " + job.job_post_req_skills}</span>
                          </JobCardDescription>
                        </div>
                        <JobCardDisplayFlexDiv></JobCardDisplayFlexDiv>
                      </article>
                      <JobCardDisplayFlexDiv>
                        <div>
                          <i></i>
                          <span>
                            <i className="fa-regular fa-clock"></i> :
                            {" " +
                              moment(new Date(job.job_post_cr_dt)).format(
                                "Do MMMM YYYY"
                              )}
                          </span>
                        </div>
                        <div>
                          {user && appliedStatus === true && (
                            <AppliedText>
                              <i className="fa-solid fa-circle-info"></i>
                              You have all ready applied.
                            </AppliedText>
                          )}
                          {user && appliedStatus === false && (
                            <ViewJobButton
                              type="btn"
                              onClick={() => {
                                showApplyJobModalHandler(job);
                              }}
                            >
                              Apply Now
                            </ViewJobButton>
                          )}
                          {!user && appliedStatus === false && (
                            <>
                              <ViewJobButton
                                type="btn"
                                onClick={showLoginModelHandler}
                              >
                                Login to Apply
                              </ViewJobButton>
                              <ApplyNowButton>
                                <Link
                                  to={`/register`}
                                  style={{
                                    textDecoration: "none",
                                    color: "#fff",
                                  }}
                                >
                                  Register to apply
                                </Link>
                              </ApplyNowButton>
                            </>
                          )}
                        </div>
                      </JobCardDisplayFlexDiv>
                    </JobCardSection>
                    <IndividualJobDescriptionDiv>
                      <IndividualJobDescTitle>
                        Expected Salary :
                      </IndividualJobDescTitle>
                      <IndividualJobDesc>
                        {job.job_post_expected_salary} PA.
                      </IndividualJobDesc>
                    </IndividualJobDescriptionDiv>
                    <IndividualJobDescriptionDiv>
                      <IndividualJobDescTitle>
                        Responsibilities
                      </IndividualJobDescTitle>
                      <IndividualJobDesc>
                        <IndividualJobUl>
                          <IndividualJobList>
                            Design, develop and configure simple, medium to
                            complex robotic process automation per business
                            process and requirements documentation
                          </IndividualJobList>
                          <IndividualJobList>
                            Schedule and run RPA processes to ensure the
                            stability of the environment
                          </IndividualJobList>
                          <IndividualJobList>
                            Performs daily administration tasks within the
                            automation software production environment,
                            including scheduling, monitoring Bot resources and
                            capacity, and resolving RPA exceptions or issues.
                          </IndividualJobList>
                          <IndividualJobList>
                            Develop a deep understanding of the UiPath Platform
                            and its functionalities
                          </IndividualJobList>
                          <IndividualJobList>
                            Develop automation workflows with UiPath Studio
                          </IndividualJobList>
                          <IndividualJobList>
                            Document solutions and maintain best practices
                          </IndividualJobList>
                          <IndividualJobList>
                            Stay apprised of the latest trends in RPA technology
                          </IndividualJobList>
                          <IndividualJobList>
                            Participate in defect triage meetings and review
                            defects
                          </IndividualJobList>
                          <IndividualJobList>
                            Maintain a broad and deep understanding of our
                            applications
                          </IndividualJobList>
                        </IndividualJobUl>
                      </IndividualJobDesc>
                    </IndividualJobDescriptionDiv>
                    <IndividualJobDescriptionDiv>
                      <IndividualJobDescTitle>
                        Required Skills:
                      </IndividualJobDescTitle>
                      <IndividualJobDesc>
                        <IndividualJobUl>
                          <IndividualJobList>
                            3 + years’ experience in Python language/Information
                            Technology.
                          </IndividualJobList>
                          <IndividualJobList>
                            2 + years of experience with Process Automation
                            concepts and development.
                          </IndividualJobList>
                          <IndividualJobList>
                            Experienced with AGILE methodology; Proficient with
                            JIRA/ZOHO Project management systems.
                          </IndividualJobList>
                        </IndividualJobUl>
                      </IndividualJobDesc>
                    </IndividualJobDescriptionDiv>
                    <IndividualJobDescriptionDiv>
                      <IndividualJobDescTitle>
                        Desired Skills:
                      </IndividualJobDescTitle>
                      <IndividualJobDesc>
                        <IndividualJobUl>
                          <IndividualJobList>
                            Ability to communicate effectively, both verbally
                            and in writing, at all levels, and across different
                            audiences.
                          </IndividualJobList>
                          <IndividualJobList>
                            Strong knowledge of MS Office applications.
                          </IndividualJobList>
                          <IndividualJobList>
                            Strong sense of quality and commitment to interact
                            with internal or external clients effectively and
                            professionally.
                          </IndividualJobList>
                          <IndividualJobList>
                            Excellent communication skills and service
                            orientation.
                          </IndividualJobList>
                          <IndividualJobList>
                            Ability to work under pressure (e.g., meeting
                            deadlines, adopting and implementing changes)
                          </IndividualJobList>
                          <IndividualJobList>
                            Ability to translate Business Development, HR, and
                            Operations Teams’ requirements into automated
                            technical solutions
                          </IndividualJobList>
                          <IndividualJobList>
                            Excellent analytical and problem-solving skills
                          </IndividualJobList>
                          <IndividualJobList>
                            Excellent communication, negotiation, networking,
                            and influencing skills
                          </IndividualJobList>
                          <IndividualJobList>
                            Ability to work across multiple business groups and
                            domains.
                          </IndividualJobList>
                        </IndividualJobUl>
                      </IndividualJobDesc>
                    </IndividualJobDescriptionDiv>
                    <IndividualJobDescriptionDiv>
                      <IndividualJobDescTitle>
                        Firm Culture :
                      </IndividualJobDescTitle>
                      <IndividualJobDesc>
                        The firm was established in 2011 by Chetan Dogra, CPA,
                        with the mission in mind "to free clients from financial
                        concerns and compliance and empower them with timely
                        financial opportunities by structuring a path for their
                        financial success." Our firm’s focus is to ensure our
                        employees are well-respected, well-compensated, and
                        well-equipped to handle all facets of the job. We
                        practice a strong culture of learning and collaboration
                        and provide our employees with every opportunity to
                        excel in leadership positions in the future. We are a
                        performance-based firm that maintains strong work ethics
                        and transparency.
                      </IndividualJobDesc>
                    </IndividualJobDescriptionDiv>
                    <IndividualJobDescriptionDiv>
                      <IndividualJobDescTitle>
                        Working Hours:
                      </IndividualJobDescTitle>
                      <IndividualJobDesc>
                        85% IST between 7am to 4pm with 1 hr break. Rest as per
                        requirement. If the person has to collaborate with US
                        team, then he might have to work till late but not
                        necessarily entire night
                      </IndividualJobDesc>
                    </IndividualJobDescriptionDiv>
                    <IndividualJobDescriptionDiv>
                      <IndividualJobDescTitle>
                        Firm Benefits::
                      </IndividualJobDescTitle>
                      <IndividualJobDesc>
                        <IndividualJobUl>
                          <IndividualJobList>
                            Competitive salary
                          </IndividualJobList>
                          <IndividualJobList>
                            2 weeks' time off
                          </IndividualJobList>
                          <IndividualJobList>
                            Remote work possibilities and a flexible schedule
                          </IndividualJobList>
                          <IndividualJobList>
                            Professional training
                          </IndividualJobList>
                          <IndividualJobList>
                            Year-end performance bonus
                          </IndividualJobList>
                          <IndividualJobList>
                            Provided Fund - Not as of now. Will be available at
                            later stage of growth
                          </IndividualJobList>
                        </IndividualJobUl>
                      </IndividualJobDesc>
                      <IndividualJobDesc>
                        All qualified applicants will receive consideration for
                        employment without regard to race, color, religion, sex,
                        sexual orientation, gender identity, national origin,
                        citizenship, age, disability, protected veteran status,
                        or any other characteristic protected by law.
                      </IndividualJobDesc>
                    </IndividualJobDescriptionDiv>
                    <IndividualJobDescriptionDiv>
                      <IndividualJobDescTitle>Benefits:</IndividualJobDescTitle>
                      <IndividualJobDesc>
                        <IndividualJobUl>
                          <IndividualJobList>Paid sick time</IndividualJobList>
                          <IndividualJobList>Paid time off</IndividualJobList>
                          <IndividualJobList>Work from home</IndividualJobList>
                        </IndividualJobUl>
                      </IndividualJobDesc>
                    </IndividualJobDescriptionDiv>
                    <IndividualJobDescriptionDiv>
                      <IndividualJobDescTitle>
                        Reporting Structure:
                      </IndividualJobDescTitle>
                      <IndividualJobDesc>
                        Flat reporting. Country Head is responsible for India
                        Operations and the managing partner in US.
                      </IndividualJobDesc>
                    </IndividualJobDescriptionDiv>
                    <IndividualJobDescriptionDiv>
                      <IndividualJobDescTitle>
                        Office Address :
                      </IndividualJobDescTitle>
                      <IndividualJobDesc>
                        {" " + job.job_post_street_address}
                      </IndividualJobDesc>
                    </IndividualJobDescriptionDiv>
                    <div>
                      <JobCardDescription>
                        <b>Tags :</b> <span>{" " + job.job_post_tags}</span>
                      </JobCardDescription>
                    </div>
                  </IndividualJobDiv>
                </div>
              ))
            ) : (
              <p>No job found</p>
            )}
          </IndividualJobDivRight>
          <IndividualJobDivLeft>
            <IndividualJobDiv>
              <TrendingJobs />
            </IndividualJobDiv>
          </IndividualJobDivLeft>
        </IndividualJobDisplayFlex>
      </IndividualJobWrapper>
      <GoToTop />
    </IndividualJobSection>
  );
};

export default IndividualJobDetails;
