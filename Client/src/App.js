import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ReactGA from "react-ga4";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages/HomePage";
import FaqPage from "./Pages/FaqPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import RpaCoePage from "./Pages/RpaCoePage";
import MentorsPage from "./Pages/MentorsPage";
import ScrollToTop from "./Components/ScrollToTop";
import LoadingSpinner from "./Components/utils/LoadingSpinner";
import TraineeProfilePage from "./Pages/TraineeProfilePage";
import TraineeBookingPage from "./Pages/TraineeBookingPage";
import MentorBookingPage from "./Pages/MentorBookingPage";
import MentorIndividualPage from "./Pages/MentorIndividualPage";
import WhyPractiwizPage from "./Pages/WhyPractiwizPage";
import FeedbackFormPage from "./Pages/FeedbackFormPage";
import ProfessionalPage from "./Pages/ProfessionalPage";
import ContributeCornerPage from "./Pages/ContributeCornerPage";
import "animate.css";
import ContributerLoginPage from "./Pages/ContributerLoginPage";
import ContributerRegisterPage from "./Pages/ContributerRegisterPage";
import ApplyContributionPage from "./Pages/ApplyContributionpage";
import MyContributionPage from "./Pages/MyContributionPage";
import CookieNotice from "./Components/utils/CookieNotice";
import MentorAddRegdFormPage from "./Pages/MentorAddRegdFormPage";
import MentorSuccessRegdPage from "./Pages/MentorSuccessRegdPage";
import NotificationPage from "./Pages/NotificationPage";
import JobHomePage from "./Pages/JobsPages/JobHomePage";
import JobIndividualPage from "./Pages/JobsPages/JobIndividualPage";
import RecruiterProfilePages from "./Pages/JobsPages/RecruiterProfilePages";
import MentorRegistrationPage from "./Pages/MentorRegistrationPage";
import AdminPage from "./Pages/AdminPage";
import BaJumpstartPage from "./Pages/BaJumpstartPage";
import TraineeCourseProgressPage from "./Pages/TraineeCourseProgressPage";
import JobsAdminPage from "./Pages/AdminPages/JobsAdminPage";
import ViewJobResponsesPage from "./Pages/JobsPages/ViewJobResponsesPage";
import AppliedJobPage from "./Pages/JobsPages/AppliedJobPage";
import RpaJumpstartPage from "./Pages/RpaJumpstartPage";

const MentorProfilePage = React.lazy(() => import("./Pages/MentorProfilePage"));
const ActivateAccountPage = React.lazy(() =>
  import("./Pages/ActivateAccountPage")
);
const Dashboard = React.lazy(() => import("./Pages/DashBoardPage"));
const ForgotPwdPage = React.lazy(() => import("./Pages/ForgotPwdPage"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const PrivacyPage = React.lazy(() => import("./Pages/PrivacyPage"));
const ResetPwdPage = React.lazy(() => import("./Pages/ResetPwdPage"));
const Terms = React.lazy(() => import("./Pages/T&CPage"));
const MentorPage = React.lazy(() => import("./Pages/MentorFormPage"));
const RpaBaPage = React.lazy(() => import("./Pages/RpaBaCoursePage"));
const App = () => {
  const user = useSelector((state) => state.user?.currentUser);
  ReactGA.initialize("G-67LS5L1Z3G");
  ReactGA.send("pageview");
  console.log(ReactGA);
  return (
    <>
      <ToastContainer />
      <CookieNotice />
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/faq" exact element={<FaqPage />} />
            <Route path="/professionals" exact element={<ProfessionalPage />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/jobs" exact element={<JobHomePage />} />
            <Route
              path="/contributers-corner"
              exact
              element={<ContributeCornerPage />}
            />
            <Route
              path="/contributers-corner/register"
              exact
              element={<ContributerRegisterPage />}
            />
            <Route
              path="/contributers-corner/login"
              exact
              element={<ContributerLoginPage />}
            />
            <Route
              path="/contributer/apply-for-contribution"
              exact
              element={<ApplyContributionPage />}
            />
            {user ? (
              <Route path="*" element={<Navigate to="/login" replace />} />
            ) : (
              <Route path="/notifications" element={<NotificationPage />} />
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route
              path="/contributer/my-contribution"
              exact
              element={<MyContributionPage />}
            />
            {user ? (
              <Route element={<Navigate to="/" />} />
            ) : (
              <Route path="/login" exact element={<LoginPage />} />
            )}
            <Route path="/why-practiwiz" exact element={<WhyPractiwizPage />} />
            <Route path="/register" exact element={<RegisterPage />} />
            <Route path="/training/rpa-coe" exact element={<RpaCoePage />} />
            <Route path="/mentors-club" exact element={<MentorsPage />} />
            <Route path="/forgot-password" element={<ForgotPwdPage />} />
            <Route
              path="/mentor/registration-success"
              element={<MentorSuccessRegdPage />}
            />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/mentor/join" element={<MentorPage />} />
            {/* {!user ? (
              <Route path="*" element={<NotFound />} />
            ) : (
              <Route
                path="/mentor/add-details"
                element={<MentorAddRegdFormPage />}
              />
            )} */}
            <Route
              path="/mentor/add-details"
              element={<MentorAddRegdFormPage />}
            />
            <Route path="/training/individual/ba" element={<RpaBaPage />} />
            <Route
              path={`/mentors-club/individual/:id`}
              element={<MentorIndividualPage />}
            />
            {user?.type === "mentor" && (
              <Route path={`/mentor/profile`} element={<MentorProfilePage />} />
            )}
            {user?.type === "trainee" && (
              <Route
                path={`/trainee/profile`}
                element={<TraineeProfilePage />}
              />
            )}
            {user?.type === "trainee" && (
              <Route
                path={`/trainee/profile/my-sessions`}
                element={<TraineeBookingPage />}
              />
            )}
            {user?.type === "trainee" && (
              <Route
                path={`/trainee/profile/bookings/feedback`}
                element={<FeedbackFormPage />}
              />
            )}
            {user?.type === "mentor" && (
              <Route
                path={`/mentor/profile/my-sessions`}
                element={<MentorBookingPage />}
              />
            )}
            <Route path="*" element={<NotFound />} />
            <Route
              exact
              path={`/user/activate/account/:id`}
              element={<ActivateAccountPage />}
            />
            {/* Trainer section */}
            {user?.role === 1 ? (
              <Route
                exact
                path="/user/admin/dashboard"
                element={<Dashboard />}
              />
            ) : (
              <Route path="/login" element={<Navigate to="/login" />} />
            )}
            <Route
              exact
              path={`/user/activate/reset-password/:id`}
              element={<ResetPwdPage />}
            />
            <Route path="/terms-conditions" element={<Terms />} />
            {user?.role === 1 && (
              <Route path="/user/admin/dashboard" element={<Dashboard />} />
            )}
            {/* jobs pages */}
            <Route
              path={`/jobs/individual-job/:id`}
              element={<JobIndividualPage />}
            />
            <Route
              path="/recruiter/profile"
              element={<RecruiterProfilePages />}
            />
            <Route
              path="/mentor/apply-for-registration"
              element={<MentorRegistrationPage />}
            />
            <Route path="/user/admin" element={<AdminPage />} />
            <Route
              path="/training/individual/ba-jumpstart"
              element={<BaJumpstartPage />}
            />
            <Route
              path="/training/individual/jumpstart-to-rpa-live-bot-development"
              element={<RpaJumpstartPage />}
            />
            {user?.type === "trainee" && (
              <Route
                path={`/trainee/profile/my-courses`}
                element={<TraineeCourseProgressPage />}
              />
            )}
            <Route path="/user/admin/jobs" element={<JobsAdminPage />} />
            <Route
              path={`/recruiter/profile/jobs/view-responses/:id`}
              element={<ViewJobResponsesPage />}
            />
            {user && (
              <Route
                path={`/${user?.type}/profile/my-jobs`}
                element={<AppliedJobPage />}
              />
            )}
          </Routes>
        </Suspense>
      </Router>
      <ScrollToTop />
    </>
  );
};

export default App;
