import React from "react";
import { Link } from "react-router-dom";
import {
  ApplyNowButton,
  JobCardDisplayFlexDiv,
  JobCardDiv,
  JobCardSection,
  ViewJobButton,
} from "./JobCardElements";

const JobCard = () => {
  return (
    <JobCardSection>
      <JobCardDiv>
        <article>
          <div>
            <div>
              <p>
                DATA Entry/Computer Operator/WORK FROM Home/Fresher/FULL@PART
                TIME JOB
              </p>
              <div>
                <p>JK Solutions</p>
              </div>
              <JobCardDisplayFlexDiv>
                <p>
                  <span title="0-5 Yrs ">0-5 Yrs</span>
                </p>
                <p>
                  <i></i>
                  <span title="2,50,000 - 5,00,000 PA. ">
                    2,50,000 - 5,00,000 PA.
                  </span>
                </p>
                <p>
                  <i></i>
                  <span title="Temp. WFH - Kolkata, Hyderabad/Secunderabad, Chennai ">
                    Temp. WFH - Kolkata, Hyderabad/Secunderabad, Chennai
                  </span>
                </p>
              </JobCardDisplayFlexDiv>
            </div>
          </div>
          <div>
            Excellent opportunity @Data entry/BPO Basic computer knowledge
            Freshers are welcome Par...
          </div>

          <JobCardDisplayFlexDiv>
            <p>Typing</p>
            <p>Data Entry</p>
            <p>Ms World</p>
            <p>work from home</p>
            <p>Data Entry Operation</p>
            <p>BPO</p>
            <p>Word</p>
            <p>Computer Operating</p>
          </JobCardDisplayFlexDiv>

          <JobCardDisplayFlexDiv>
            <div>
              <i></i>
              <span>1 Day Ago</span>
            </div>
            <div>
              <i></i>
              <span>save</span>
            </div>
          </JobCardDisplayFlexDiv>
        </article>
        <div>
          <div>
            <ViewJobButton>
              <Link to="/jobs/individual-job/mern-stack">View Job</Link>
            </ViewJobButton>

            <ApplyNowButton>Apply Now</ApplyNowButton>
          </div>
        </div>
      </JobCardDiv>
    </JobCardSection>
  );
};

export default JobCard;
