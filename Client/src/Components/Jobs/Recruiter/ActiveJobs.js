import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ConfirmationJobPostModel from "./ConfirmationJobPostModel";
const Table = styled.table`
  border: none;
`;
const Tbody = styled.tbody``;
const Tr = styled.tr`
  border-bottom: 1px solid #ccc;
`;
const Th = styled.th`
  border: none;
  border-bottom: 2px solid #ccc;
  width: 50px;
`;
const Td = styled.td`
  border: none;
`;
const ActiveJobs = () => {
  const [allActiveJobs, setAllActiveJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const getAllActiveJobPosts = async () => {
      const res = await axios.get("/recruiter/get/open-positions");
      if (res.data.success) {
        setAllActiveJobs(res.data.success);
      }
      if (res.data.error) {
        setAllActiveJobs([]);
      }
    };
    getAllActiveJobPosts();
  }, []);
  const showModalHandler = (job) => {
    setShowModel(!showModel);
    setJobDetails(job);
  };
  return (
    <div>
      {showModel && (
        <ConfirmationJobPostModel
          jobDetails={jobDetails}
          showModalHandler={showModalHandler}
        />
      )}
      <input
        type="text"
        onChange={(event) => {
          setSearchItem(event.target.value);
        }}
      />
      <Table>
        <Tbody>
          <Tr>
            <Th>Id</Th>
            <Th>Job Title</Th>
            <Th>Req Skills</Th>
            <Th>Qual and Exp</Th>
            <Th>Salary</Th>
            <Th>Job created on</Th>
            <Th>Admin approve</Th>
            <Th>Hiring status</Th>
            <Th>Responses</Th>
            <Th>Actions</Th>
          </Tr>
          {allActiveJobs
            ?.filter((jobFilter) =>
              searchItem === " "
                ? jobFilter
                : jobFilter.job_post_heading
                    .toLowerCase()
                    .includes(searchItem.toLowerCase()) ||
                  jobFilter.job_post_req_skills
                    .toLowerCase()
                    .includes(searchItem.toLowerCase()) ||
                  jobFilter.job_post_min_qual
                    .toLowerCase()
                    .includes(searchItem.toLowerCase())
            )
            .map((job) => (
              <Tr key={job.job_post_dtls_id}>
                <Td>{job.job_post_dtls_id}</Td>
                <Td>{job.job_post_heading}</Td>
                <Td>{job.job_post_req_skills}</Td>
                <Td>
                  {job.job_post_min_qual} {job.job_post_min_exp}
                </Td>
                <Td>{job.job_post_expected_salary}</Td>
                <Td>{new Date(job.job_post_cr_dt).toDateString()}</Td>
                <Td>{job.job_post_approve_status}</Td>
                <Td>{job.job_post_hiring_status}</Td>{" "}
                <Td>
                  <button>View responses</button>
                </Td>
                <Td>
                  <button onClick={() => showModalHandler(job)}>
                    <i className="fa-solid fa-pen-to-square"></i>Edit
                  </button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default ActiveJobs;
