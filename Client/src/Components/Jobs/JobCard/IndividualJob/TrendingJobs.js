import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ApplyNowButton,
  ButtonDiv,
  IndividualJobTrendingTitle,
  JobCardDescription,
  JobCardDisplayFlexDiv,
  JobCardSection,
  JobTitle,
  TrendingJobsCardDiv,
} from "./TrendingJobElements.js";
const TrendingJobs = () => {
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
    <TrendingJobsCardDiv>
      <IndividualJobTrendingTitle>Trending Jobs</IndividualJobTrendingTitle>
      <JobCardSection>
        {allJobs?.length > 0 ? (
          allJobs?.map((job) => (
            <div key={job.job_post_dtls_id}>
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
                    <JobCardDescription>
                      <b> Key Skills :</b>
                      <span>{" " + job.job_post_req_skills}</span>
                    </JobCardDescription>
                    <JobCardDisplayFlexDiv>
                      <JobCardDescription>
                        <b>Qual :</b>
                        <span>{job.job_post_min_qual}</span>
                      </JobCardDescription>
                      <JobCardDescription>
                        <b>Emp Type :</b>
                        <span>{" " + job.job_post_job_type}</span>
                      </JobCardDescription>
                    </JobCardDisplayFlexDiv>
                    <JobCardDisplayFlexDiv>
                      <JobCardDescription>
                        <b>Exp : </b>
                        <span>{job.job_post_min_exp} Yrs</span>
                      </JobCardDescription>
                      <JobCardDescription>
                        <b>Exp Salary : </b>
                        <span> {job.job_post_expected_salary} PA.</span>
                      </JobCardDescription>
                    </JobCardDisplayFlexDiv>
                  </div>
                </div>
              </article>
              <ButtonDiv>
                <ApplyNowButton>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                    }}
                    to={`/jobs/individual-job/${job.job_post_unique_id}`}
                  >
                    View Job
                  </Link>
                </ApplyNowButton>
              </ButtonDiv>
              <hr />
            </div>
          ))
        ) : (
          <p>No job found</p>
        )}
      </JobCardSection>
    </TrendingJobsCardDiv>
  );
};

export default TrendingJobs;
