import React from "react";
import { useLocation } from "react-router-dom";
import {
  IndividualJobDesc,
  IndividualJobDescriptionDiv,
  IndividualJobDescTitle,
  IndividualJobDiv,
  IndividualJobList,
  IndividualJobSection,
  IndividualJobUl,
  IndividualJobWrapper,
} from "./IndividualJobElements";

const IndividualJobDetails = () => {
  const location = useLocation();
  let path = location.pathname.split("/")[3];
  return (
    <IndividualJobSection>
      <IndividualJobWrapper>
        <IndividualJobDiv>{path}</IndividualJobDiv>
      </IndividualJobWrapper>
      {/* job description */}
      <IndividualJobWrapper>
        <IndividualJobDiv>
          <IndividualJobDescriptionDiv>
            <IndividualJobDescTitle>Responsibilities</IndividualJobDescTitle>
            <IndividualJobDesc>
              <IndividualJobUl>
                <IndividualJobList>
                  Design, develop and configure simple, medium to complex
                  robotic process automation per business process and
                  requirements documentation
                </IndividualJobList>
                <IndividualJobList>
                  Schedule and run RPA processes to ensure the stability of the
                  environment
                </IndividualJobList>
                <IndividualJobList>
                  Performs daily administration tasks within the automation
                  software production environment, including scheduling,
                  monitoring Bot resources and capacity, and resolving RPA
                  exceptions or issues.
                </IndividualJobList>
                <IndividualJobList>
                  Develop a deep understanding of the UiPath Platform and its
                  functionalities
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
                  Participate in defect triage meetings and review defects
                </IndividualJobList>
                <IndividualJobList>
                  Maintain a broad and deep understanding of our applications
                </IndividualJobList>
              </IndividualJobUl>
            </IndividualJobDesc>
          </IndividualJobDescriptionDiv>
          <IndividualJobDescriptionDiv>
            <IndividualJobDescTitle>Required Skills:</IndividualJobDescTitle>
            <IndividualJobDesc>
              <IndividualJobUl>
                <IndividualJobList>
                  3 + years’ experience in Python language/Information
                  Technology.
                </IndividualJobList>
                <IndividualJobList>
                  2 + years of experience with Process Automation concepts and
                  development.
                </IndividualJobList>
                <IndividualJobList>
                  Experienced with AGILE methodology; Proficient with JIRA/ZOHO
                  Project management systems.
                </IndividualJobList>
              </IndividualJobUl>
            </IndividualJobDesc>
          </IndividualJobDescriptionDiv>
          <IndividualJobDescriptionDiv>
            <IndividualJobDescTitle>Desired Skills: </IndividualJobDescTitle>
            <IndividualJobDesc>
              <IndividualJobUl>
                <IndividualJobList>
                  Ability to communicate effectively, both verbally and in
                  writing, at all levels, and across different audiences.
                </IndividualJobList>
                <IndividualJobList>
                  Strong knowledge of MS Office applications.
                </IndividualJobList>
                <IndividualJobList>
                  Strong sense of quality and commitment to interact with
                  internal or external clients effectively and professionally.
                </IndividualJobList>
                <IndividualJobList>
                  Excellent communication skills and service orientation.
                </IndividualJobList>
                <IndividualJobList>
                  Ability to work under pressure (e.g., meeting deadlines,
                  adopting and implementing changes)
                </IndividualJobList>
                <IndividualJobList>
                  Ability to translate Business Development, HR, and Operations
                  Teams’ requirements into automated technical solutions
                </IndividualJobList>
                <IndividualJobList>
                  Excellent analytical and problem-solving skills
                </IndividualJobList>
                <IndividualJobList>
                  Excellent communication, negotiation, networking, and
                  influencing skills
                </IndividualJobList>
                <IndividualJobList>
                  Ability to work across multiple business groups and domains.
                </IndividualJobList>
              </IndividualJobUl>
            </IndividualJobDesc>
          </IndividualJobDescriptionDiv>
          <IndividualJobDescriptionDiv>
            <IndividualJobDescTitle>Firm Culture : </IndividualJobDescTitle>
            <IndividualJobDesc>
              The firm was established in 2011 by Chetan Dogra, CPA, with the
              mission in mind "to free clients from financial concerns and
              compliance and empower them with timely financial opportunities by
              structuring a path for their financial success." Our firm’s focus
              is to ensure our employees are well-respected, well-compensated,
              and well-equipped to handle all facets of the job. We practice a
              strong culture of learning and collaboration and provide our
              employees with every opportunity to excel in leadership positions
              in the future. We are a performance-based firm that maintains
              strong work ethics and transparency.
            </IndividualJobDesc>
          </IndividualJobDescriptionDiv>
          <IndividualJobDescriptionDiv>
            <IndividualJobDescTitle>Working Hours: </IndividualJobDescTitle>
            <IndividualJobDesc>
              85% IST between 7am to 4pm with 1 hr break. Rest as per
              requirement. If the person has to collaborate with US team, then
              he might have to work till late but not necessarily entire night
            </IndividualJobDesc>
          </IndividualJobDescriptionDiv>
          <IndividualJobDescriptionDiv>
            <IndividualJobDescTitle>Firm Benefits::</IndividualJobDescTitle>
            <IndividualJobDesc>
              <IndividualJobUl>
                <IndividualJobList> Competitive salary</IndividualJobList>
                <IndividualJobList> 2 weeks' time off</IndividualJobList>
                <IndividualJobList>
                  Remote work possibilities and a flexible schedule
                </IndividualJobList>
                <IndividualJobList> Professional training</IndividualJobList>
                <IndividualJobList>
                  Year-end performance bonus
                </IndividualJobList>
                <IndividualJobList>
                  Provided Fund - Not as of now. Will be available at later
                  stage of growth
                </IndividualJobList>
              </IndividualJobUl>
            </IndividualJobDesc>
            <IndividualJobDesc>
              All qualified applicants will receive consideration for employment
              without regard to race, color, religion, sex, sexual orientation,
              gender identity, national origin, citizenship, age, disability,
              protected veteran status, or any other characteristic protected by
              law.
            </IndividualJobDesc>
            <p>Job Type: Full-time Benefits:</p>
            <p>Salary: ₹4,20,000 p.a. - ₹7,00,000 p.a.</p>
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
              Flat reporting. Country Head is responsible for India Operations
              and the managing partner in US.
            </IndividualJobDesc>
          </IndividualJobDescriptionDiv>
        </IndividualJobDiv>
      </IndividualJobWrapper>
    </IndividualJobSection>
  );
};

export default IndividualJobDetails;
