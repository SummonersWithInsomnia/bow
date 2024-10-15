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

export class lb {
    constructor() {
        throw new Error("Cannot instantiate lb class");
    }

    static async get(path, token, jsonObj) {
        switch (path) {
            case "courses":
                return await GetCourses(token, jsonObj);

            case "dashboard":
                return await GetDashboard(token, jsonObj);

            case "profile":
                return await GetProfile(token, jsonObj);

            case "user":
                return await GetUserInfo(token, jsonObj);

            case "tickets":
                return await GetTickets(token, jsonObj);

            case "student-list":
                return await GetStudentList(token, jsonObj);

            case "student-list-by-course":
                return await GetStudentListByCourse(token, jsonObj);

            default:
                return await UnreachablePath();
        }
    }

    static async post(path, token, jsonObj) {
        switch (path) {
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