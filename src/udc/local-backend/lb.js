// Local Backend

import GetCourses from "./course-handlers/GetCourses";
import UnreachablePath from "./error-handlers/UnreachablePath";
import PostLoginStudent from "./student-handlers/PostLoginStudent";
import PostLoginAdmin from "./admin-handlers/PostLoginAdmin";
import PostSignupStudent from "./student-handlers/PostSignupStudent";
import GetDashboard from "./dashboard-handlers/GetDashboard";
import GetProfile from "./profile-handlers/GetProfile";
import PatchProfile from "./profile-handlers/PatchProfile";

export class lb {
    constructor() {
        throw new Error("Cannot instantiate lb class.");
    }

    static async get(path, token, jsonObj) {
        switch (path) {
            case "courses":
                return await GetCourses(token, jsonObj);

            case "dashboard":
                return await GetDashboard(token, jsonObj);

            case "profile":
                return await GetProfile(token, jsonObj);

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