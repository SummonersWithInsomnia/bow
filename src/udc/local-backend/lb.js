// Local Backend

import GetCourses from "./course-handlers/GetCourses";
import UnreachablePath from "./error-handlers/UnreachablePath";
import PostLoginStudent from "./student-handlers/PostLoginStudent";
import PostLoginAdmin from "./admin-handlers/PostLoginAdmin";
import PostSignupStudent from "./student-handlers/PostSignupStudent";
import GetDashboard from "./dashboard-handlers/GetDashboard";
import GetProfile from "./profile-handlers/GetProfile";
import PatchProfile from "./profile-handlers/PatchProfile";
import GetUserInfo from "./user-handlers/GetUserInfo";
import PostSendTicket from "./ticket-handlers/PostSendTicket";
import GetTickets from "./ticket-handlers/GetTickets";
import PostCreateCourse from "./course-handlers/PostCreateCourse";

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
            default:
                return await UnreachablePath();
        }
    }

    static async delete(path, token, jsonObj) {
        switch (path) {
            default:
                return await UnreachablePath();
        }
    }

    static async patch(path, token, jsonObj) {
        switch (path) {
            case "profile":
                return await PatchProfile(token, jsonObj);

            default:
                return await UnreachablePath();
        }
    }

}