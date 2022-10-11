import React from "react";
import JobCard from "./JobCard/JobCard";
import { JobDivWrapper, JobSection } from "./JobHomeElements";

const JobHome = () => {
  return (
    <JobSection>
      <JobDivWrapper>
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </JobDivWrapper>
    </JobSection>
  );
};

export default JobHome;
