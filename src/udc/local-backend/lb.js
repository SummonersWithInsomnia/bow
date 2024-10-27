// Local Backend

import GetCourses from "./course-handlers/GetCourses";
import UnreachablePath from "./error-handlers/UnreachablePath";
import PostLoginStudent from "./student-handlers/PostLoginStudent";
import PostLoginAdmin from "./admin-handlers/PostLoginAdmin";
import PostSignupStudent from "./student-handlers/PostSignupStudent";
import GetDashboard from "./dashboard-handlers/GetDashboard";
import GetProfile from "./profile-handlers/GetProfile";
import PutProfile from "./profile-handlers/PutProfile";
import GetUserInfo from "./user-handlers/GetUserInfo";
import PostSendTicket from "./ticket-handlers/PostSendTicket";
import GetTickets from "./ticket-handlers/GetTickets";
import PostCreateCourse from "./course-handlers/PostCreateCourse";
import DeleteCourse from "./course-handlers/DeleteCourse";
import PutCourse from "./course-handlers/PutCourse";
import GetStudentList from "./student-handlers/GetStudentList";
import GetStudentListByCourse from "./student-handlers/GetStudentListByCourse";
import PostRegisterCourse from "./course-registration-handlers/PostRegisterCourse";
import DeleteDropCourse from "./course-registration-handlers/DeleteDropCourse";
import GetMyCourses from "./course-registration-handlers/GetMyCourses";

export class lb {
    constructor() {
        throw new Error("Cannot instantiate lb class");
    }

    static async get(path, token) {
        switch (path) {
            case "dashboard":
                return await GetDashboard(token);

            case "profile":
                return await GetProfile(token);

            case "user":
                return await GetUserInfo(token);

            case "tickets":
                return await GetTickets(token);

            case "student-list":
                return await GetStudentList(token);

            case "student-list-by-course":
                return await GetStudentListByCourse(token);

            case "my-courses":
                return await GetMyCourses(token);

            default:
                return await UnreachablePath();
        }
    }

    static async post(path, token, jsonObj) {
        switch (path) {
            case "courses":
                return await GetCourses(token, jsonObj);

            case "login-student":
                return await PostLoginStudent(token, jsonObj);

            case "login-admin":
                return await PostLoginAdmin(token, jsonObj);

            case "signup-student":
                return await PostSignupStudent(token, jsonObj);

            case "send-ticket":
                return await PostSendTicket(token, jsonObj);

            case "create-course":
                return await PostCreateCourse(token, jsonObj);

            case "register-course":
                return await PostRegisterCourse(token, jsonObj);

            default:
                return await UnreachablePath();
        }
    }

    static async put(path, token, jsonObj) {
        switch (path) {
            case "profile":
                return await PutProfile(token, jsonObj);

            case "course":
                return await PutCourse(token, jsonObj);

            default:
                return await UnreachablePath();
        }
    }

    static async delete(path, token, jsonObj) {
        switch (path) {
            case "course":
                return await DeleteCourse(token, jsonObj);

            case "drop-course":
                return await DeleteDropCourse(token, jsonObj);

            default:
                return await UnreachablePath();
        }
    }

    static async patch(path, token, jsonObj) {
        switch (path) {
            default:
                return await UnreachablePath();
        }
    }

}