import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ApplyNowButton,
  JobCardDescription,
  JobCardDisplayFlexDiv,
  JobCardDiv,
  JobCardSection,
  JobTitle,
  ViewJobButton,
} from "./JobCardElements";
import axios from "axios";
import moment from "moment/moment";
const JobCard = () => {
  const [allJobs, setAllJobs] = useState([]);
  useEffect(() => {
    const getAllJobPosts = async () => {
      const res = await axios.get("/jobs/get/all-jobs-posts");
      if (res.data.success) {
        setAllJobs(res.data.success);
      }
      if (res.data.error) {
        setAllJobs([]);
      }
    };
    getAllJobPosts();
  }, []);
  return (
    <JobCardSection>
      {allJobs?.length > 0 ? (
        allJobs?.map((job) => (
          <JobCardDiv key={job.job_post_dtls_id}>
            <article>
              <div>
                <div>
                  <JobTitle>
                    <Link
                      style={{ textDecoration: "none", color: "#062C30" }}
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
                      <b>Salary : </b>
                      <span title="2,50,000 - 5,00,000 PA. ">
                        {job.job_post_expected_salary} PA.
                      </span>
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
                  <b> Key Skills:</b>{" "}
                  <span>{" " + job.job_post_req_skills}</span>
                </JobCardDescription>
              </div>
              <div>
                <JobCardDescription>
                  <span>
                    <b>Office Address :</b>
                    {" " + job.job_post_street_address}
                  </span>
                </JobCardDescription>
              </div>
              <JobCardDisplayFlexDiv>
                <div>
                  <JobCardDescription>
                    Tags :<span>{" " + job.job_post_tags}</span>
                  </JobCardDescription>
                </div>
              </JobCardDisplayFlexDiv>
            </article>
            <JobCardDisplayFlexDiv>
              <div>
                <i></i>
                <span>
                  Posted On :
                  {" " +
                    moment(new Date(job.job_post_cr_dt)).format("Do MMMM YYYY")}
                </span>
              </div>
              <div>
                <ViewJobButton>
                  <Link to={`/jobs/individual-job/${job.job_post_unique_id}`}>
                    View Job
                  </Link>
                </ViewJobButton>
                <ApplyNowButton>Apply Now</ApplyNowButton>
              </div>
            </JobCardDisplayFlexDiv>
          </JobCardDiv>
        ))
      ) : (
        <p>No job found</p>
      )}
    </JobCardSection>
  );
};

export default JobCard;
