import React, { useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import UsersTable from "./AllTrainersTable";
import AllCourse from "./AllCourse";
import Allusers from "./Allusers";
import Logo from "../../images/practi-logo.png";
import AllMentors from "./AllMentors";
const Dashboard = () => {
  const [showCourses, setShowCourse] = useState(false);
  const [showAllTrainers, setShowAllTrainers] = useState(true);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showMentors, setShowAllMentors] = useState(false);
  const ShowCourseHandler = (event) => {
    setShowCourse(!showCourses);
    setShowAllTrainers(false);
    setShowAllUsers(false);
  };
  const ShowTrainersHandler = (event) => {
    setShowAllTrainers(!showAllTrainers);
    setShowCourse(false);
    setShowAllUsers(false);
  };
  const ShowAllUsersHandler = (event) => {
    setShowAllUsers(!showAllUsers);
    setShowCourse(false);
    setShowAllTrainers(false);
  };
  const ShowAllMentorsHandler = (event) => {
    setShowAllMentors(!showMentors);
    setShowAllUsers(false);
    setShowCourse(false);
    setShowAllTrainers(false);
  };
  return (
    <>
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span>
              <img className="logo" src={Logo} alt="logo" />
            </span>
          </div>
          <div className="topRight">
            <div className="topbarIconContainer">
              <i className="fa-solid fa-bell"></i>
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              <i className="fa-solid fa-language"></i>
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              <i className="fa-solid fa-gear"></i>
            </div>
            <img
              src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="topAvatar"
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="sidebar">
          <div className="sidebarWrapper">
            <div className="sidebarMenu">
              <h3 className="sidebarTitle">Dashboard</h3>
              <ul className="sidebarList">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/"
                  className="link"
                >
                  <li className="sidebarListItem active">Home</li>
                </Link>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/user/admin/dashboard/add-new-course"
                  className="link"
                >
                  <li className="sidebarListItem">Add New Course</li>
                </Link>
                <li className="sidebarListItem">Timeline</li>
              </ul>
            </div>
            <div className="sidebarMenu">
              <h3 className="sidebarTitle">Quick Menu</h3>
              <ul className="sidebarList">
                <li className="sidebarListItem" onClick={ShowTrainersHandler}>
                  All Trainers
                </li>
                <li className="sidebarListItem" onClick={ShowCourseHandler}>
                  All Courses
                </li>

                <li className="sidebarListItem" onClick={ShowAllUsersHandler}>
                  All users
                </li>
                <li className="sidebarListItem" onClick={ShowAllMentorsHandler}>
                  All Mentors
                </li>
              </ul>
            </div>
            <div className="sidebarMenu">
              <h3 className="sidebarTitle">Notifications</h3>
              <ul className="sidebarList">
                <li className="sidebarListItem">Mail</li>
                <li className="sidebarListItem">Feedback</li>
                <li className="sidebarListItem">Messages</li>
              </ul>
            </div>
            <div className="sidebarMenu">
              <h3 className="sidebarTitle">Staff</h3>
              <ul className="sidebarList">
                <li className="sidebarListItem">Manage</li>
                <li className="sidebarListItem">Analytics</li>
                <li className="sidebarListItem">Reports</li>
              </ul>
            </div>
          </div>
        </div>
        {showCourses && <AllCourse />}
        {showAllTrainers && <UsersTable />}
        {showAllUsers && <Allusers />}
        {showMentors && <AllMentors />}
      </div>
    </>
  );
};

export default Dashboard;
