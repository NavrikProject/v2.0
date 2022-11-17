import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import UpdateJobResponsePostModel from "./UpdateJobResponsePostModel";
const Section = styled.section`
  width: 100%;
  height: auto;
`;
const Wrapper = styled.div`
  margin: 0 0px 0 120px;
  height: 100vh;
  overflow: scroll;
`;
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
const DownloadText = styled.p`
  cursor: pointer;
  i {
    margin-right: 5px;
  }
  a {
    text-decoration: none;
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
const ViewJobResponses = () => {
  const location = useLocation();
  let path = location.pathname.split("/")[5];
  const [viewJobResponses, setViewJobResponses] = useState([]);
  const [jobDetails, setJobDetails] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  useEffect(() => {
    const getAllJobPosts = async () => {
      const res = await axios.get(`/jobs/apply/post/view-responses/${path}`);
      if (res.data.success) {
        setViewJobResponses(res.data.success);
      }
      if (res.data.error) {
        setViewJobResponses([]);
      }
    };
    getAllJobPosts();
  }, [path]);

  const showModalHandler = (job) => {
    setShowModel(!showModel);
    setJobDetails(job);
  };
  return (
    <Section>
      <Wrapper>
        <div>
          {showModel && (
            <UpdateJobResponsePostModel
              jobDetails={jobDetails}
              showModalHandler={showModalHandler}
            />
          )}
          <JobsTitle>
            All job responses
            <hr />
          </JobsTitle>
          {viewJobResponses.length > 0 ? (
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
                    <Th>Job Unique Id</Th>
                    <Th>Job seeker fullname</Th>
                    <Th>Email</Th>
                    <Th>Applied on</Th>
                    <Th>Resume/Cv</Th>
                    <Th>Application status</Th>
                    <Th>Actions</Th>
                  </Tr>
                  {viewJobResponses
                    ?.filter((jobFilter) =>
                      searchItem === " "
                        ? jobFilter
                        : jobFilter.apply_job_master_fullname
                            .toLowerCase()
                            .includes(searchItem.toLowerCase()) ||
                          jobFilter.apply_job_master_email
                            .toLowerCase()
                            .includes(searchItem.toLowerCase()) ||
                          jobFilter.apply_job_master_status
                            .toLowerCase()
                            .includes(searchItem.toLowerCase())
                    )
                    .map((job) => (
                      <Tr key={job.apply_job_master_dtls_id}>
                        <Td>{job.apply_job_master_dtls_id}</Td>
                        <Td>{job.apply_job_master_unique_id}</Td>
                        <Td>{job.apply_job_master_fullname}</Td>
                        <Td>{job.apply_job_master_email}</Td>
                        <Td>
                          {new Date(job.apply_job_master_cr_dt).toDateString()}
                        </Td>
                        <Td>
                          <DownloadText>
                            <i className="fa-regular fa-file"></i>
                            <a href={job.apply_job_master_resume}>Download</a>
                          </DownloadText>
                        </Td>
                        <Td>{job.apply_job_master_status}</Td>
                        <Td>
                          <button onClick={() => showModalHandler(job)}>
                            <i className="fa-solid fa-pen-to-square"></i>Edit
                          </button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </>
          ) : (
            <NotFoundDiv>
              <h1>No one has applied to your posted jobs</h1>
            </NotFoundDiv>
          )}
        </div>
      </Wrapper>
    </Section>
  );
};

export default ViewJobResponses;
