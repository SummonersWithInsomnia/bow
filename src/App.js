import './App.css';
import { lsh } from "./udc/local-backend/lsh/lsh";
import FooterComponent from "./components/footer/Footer.component";
import HeaderComponent from "./components/header/Header.component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundRoute from "./routes/NotFound.route";
import IndexRoute from "./routes/Index.route";
import LoginRoute from "./routes/Login.route";
import SignupRoute from "./routes/Signup.route";
import DashboardRoute from "./routes/Dashboard.route";
import LogoutRoute from "./routes/Logout.route";
import ProgramsRoute from "./routes/Programs.route";
import CoursesRoute from "./routes/Courses.route";
import ProfileRoute from "./routes/Profile.route";
import ProfileEditorRoute from "./routes/ProfileEditor.route";
import CreateCourseRoute from "./routes/CreateCourse.route";
import CourseManagementRoute from "./routes/CourseManagement.route";
import ContactTicketViewerRoute from "./routes/ContactTicketViewer.route";
import StudentListRoute from "./routes/StudentList.route";
import CourseRegistrationRoute from "./routes/CourseRegistration.route";
import MyCoursesRoute from "./routes/MyCourses.route";
import SendContactTicketRoute from "./routes/SendContactTicket.route";

function App() {

  // To initialise all datasets of local storage
  // Please do not access the datasets directly
  lsh.initAllDatasets();

  return (
    <div className="App">

      <HeaderComponent />

      <Router>
        <Routes>
          <Route path="/" element={<IndexRoute />}/>
          <Route path="signup" element={<SignupRoute />}/>
          <Route path="login" element={<LoginRoute />}/>
          <Route path="dashboard" element={<DashboardRoute />}/>
          <Route path="logout" element={<LogoutRoute />}/>
          <Route path="programs" element={<ProgramsRoute />}/>
          <Route path="courses" element={<CoursesRoute />}/>
          <Route path="profile" element={<ProfileRoute />}/>
          <Route path="profile-editor" element={<ProfileEditorRoute />}/>
          <Route path="create-course" element={<CreateCourseRoute />}/>
          <Route path="course-management" element={<CourseManagementRoute/>}/>
          <Route path="contact-ticket-viewer" element={<ContactTicketViewerRoute />}/>
          <Route path="student-list" element={<StudentListRoute />}/>
          <Route path="course-registration" element={<CourseRegistrationRoute />}/>
          <Route path="my-courses" element={<MyCoursesRoute />}/>
          <Route path="send-contact-ticket" element={<SendContactTicketRoute />}/>
          <Route path="*" element={<NotFoundRoute />}/>
        </Routes>
      </Router>

      <FooterComponent />

    </div>
  );
}

export default App;
