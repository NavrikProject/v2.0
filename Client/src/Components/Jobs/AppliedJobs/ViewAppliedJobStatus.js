import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
const Section = styled.section`
  width: 100%;
  height: auto;
`;
const Wrapper = styled.div``;
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
  padding: 7px 20px;
  margin-bottom: 20px;
  &:focus {
    border-color: #fc83bb;
  }
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
const ViewAppliedJobStatus = () => {
  const user = useSelector((state) => state.user.currentUser);

  const [viewAllAppliedJobs, setViewAllAppliedJobs] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  useEffect(() => {
    const getAllJobPosts = async () => {
      const res = await axios.post(`/job-seeker/view-jobs/${user?.id}`, {
        userEmail: user?.email,
      });
      if (res.data.success) {
        setViewAllAppliedJobs(res.data.success);
      }
      if (res.data.error) {
        setViewAllAppliedJobs([]);
      }
    };
    getAllJobPosts();
  }, [user?.id, user?.email]);

  return (
    <Section>
      <Wrapper>
        <div>
          {viewAllAppliedJobs.length > 0 ? (
            <>
              <Input
                placeholder="Search by Role,Name,Application status...."
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
                    <Th>Applied Role</Th>
                    <Th>Applied on</Th>
                    <Th>Resume/Cv</Th>
                    <Th>Application status</Th>
                  </Tr>
                  {viewAllAppliedJobs.length > 0 &&
                    viewAllAppliedJobs
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
                              .includes(searchItem.toLowerCase()) ||
                            jobFilter.apply_job_master_post_role
                              .toLowerCase()
                              .includes(searchItem.toLowerCase())
                      )
                      .map((job) => (
                        <Tr key={job.apply_job_master_dtls_id}>
                          <Td>{job.apply_job_master_dtls_id}</Td>
                          <Td>{job.apply_job_master_unique_id}</Td>
                          <Td>{job.apply_job_master_fullname}</Td>
                          <Td>{job.apply_job_master_post_role}</Td>
                          <Td>
                            {new Date(
                              job.apply_job_master_cr_dt
                            ).toDateString()}
                          </Td>
                          <Td>
                            <DownloadText>
                              <i className="fa-regular fa-file"></i>
                              <a href={job.apply_job_master_resume}>Download</a>
                            </DownloadText>
                          </Td>
                          <Td>{job.apply_job_master_status}</Td>
                        </Tr>
                      ))}
                </Tbody>
              </Table>
            </>
          ) : (
            <NotFoundDiv>
              <h1>You have not applied to any job</h1>
            </NotFoundDiv>
          )}
        </div>
      </Wrapper>
    </Section>
  );
};

export default ViewAppliedJobStatus;
