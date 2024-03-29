import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ConfirmationJobPostModel from "./ConfirmationJobPostModel";
const Table = styled.table`
  border: none;
`;
const Tbody = styled.tbody``;
const Tr = styled.tr``;
const Th = styled.th`
  border: none;
  border-bottom: 2px solid #ccc;
`;
const Td = styled.td`
  border: none;
  border-bottom: 1px solid #ccc;
`;
const EditButton = styled.button`
  border: none;
  padding: 5px 7px;
  background-color: blue;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  i {
    margin-right: 4px;
  }
`;
const Input = styled.input`
  outline: none;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  width: 50%;
  padding: 10px 20px;
  margin-bottom: 20px;
  &:focus {
    border-color: #fc83bb;
  }
`;
const JobsTitle = styled.h1`
  color: #111;
  opacity: 0.7;
  padding-bottom: 10px;
`;
const ActiveJobsAdmin = () => {
  const [allActiveJobs, setAllActiveJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const getAllActiveJobPosts = async () => {
      const res = await axios.get("/jobs/get/active-jobs-posts");
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
  const NotFoundDiv = styled.div`
    box-shadow: rgb(142 151 158 / 15%) 0px 4px 19px;
    text-align: center;
    width: 70%;
    margin: 0 auto;
    h1 {
      font-weight: normal;
      padding: 20px;
    }
  `;
  return (
    <div>
      {showModel && (
        <ConfirmationJobPostModel
          jobDetails={jobDetails}
          showModalHandler={showModalHandler}
        />
      )}
      <JobsTitle>
        Active Jobs <hr />
      </JobsTitle>
      {allActiveJobs.length > 0 ? (
        <>
          <Input
            placeholder="Search by the Skills,Qualification,Role, Opening status...."
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
                <Th>Job Category</Th>
                <Th>Req Skills</Th>
                <Th>Qualification and Exp</Th>
                <Th>Salary</Th>
                <Th>Job created on</Th>
                <Th>Job status</Th>
                <Th>Approve status</Th>
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
                        .includes(searchItem.toLowerCase()) ||
                      jobFilter.job_post_status
                        .toLowerCase()
                        .includes(searchItem.toLowerCase()) ||
                      jobFilter.job_post_approve_status
                        .toLowerCase()
                        .includes(searchItem.toLowerCase()) ||
                      jobFilter.job_post_category
                        .toLowerCase()
                        .includes(searchItem.toLowerCase()) ||
                      jobFilter.job_post_role
                        .toLowerCase()
                        .includes(searchItem.toLowerCase()) ||
                      jobFilter.job_post_open_position_status
                        .toLowerCase()
                        .includes(searchItem.toLowerCase())
                )
                .map((job) => (
                  <Tr key={job.job_post_dtls_id}>
                    <Td>{job.job_post_dtls_id}</Td>
                    <Td>{job.job_post_heading}</Td>
                    <Td>{job.job_post_category}</Td>
                    <Td>{job.job_post_req_skills}</Td>
                    <Td>
                      {job.job_post_min_qual} {job.job_post_min_exp}
                    </Td>
                    <Td>{job.job_post_expected_salary}</Td>
                    <Td>{new Date(job.job_post_cr_dt).toDateString()}</Td>
                    <Td>{job.job_post_status}</Td>
                    <Td>{job.job_post_approve_status}</Td>
                    <Td>
                      <EditButton onClick={() => showModalHandler(job)}>
                        <i className="fa-solid fa-pen-to-square"></i>Edit
                      </EditButton>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </>
      ) : (
        <NotFoundDiv>
          <h1>There are no active jobs!</h1>
        </NotFoundDiv>
      )}
    </div>
  );
};

export default ActiveJobsAdmin;
