import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      <ToastContainer />
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/faq" exact element={<FaqPage />} />
            <Route path="/professionals" exact element={<ProfessionalPage />} />
            <Route path="/login" exact element={<LoginPage />} />
            {user ? (
              <Route path="/" element={<Navigate to="/" />} />
            ) : (
              <Route path="/login" exact element={<LoginPage />} />
            )}
            <Route path="/why-practiwiz" exact element={<WhyPractiwizPage />} />
            <Route path="/register" exact element={<RegisterPage />} />
            <Route path="/training/rpa-coe" exact element={<RpaCoePage />} />
            <Route path="/mentors-club" exact element={<MentorsPage />} />
            <Route path="/forgot-password" element={<ForgotPwdPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/mentor/join" element={<MentorPage />} />
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
                path={`/trainee/profile/bookings`}
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
                path={`/mentor/profile/bookings`}
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
          </Routes>
        </Suspense>
      </Router>
      <ScrollToTop />
    </>
  );
};

export default App;
