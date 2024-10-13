import {APP_NAME} from "../App.config";
import CourseManagementComponent from "../components/courses/CourseManagement.component";

function CourseManagementRoute() {
    document.title = "Course Management - " + APP_NAME;

    return (
        <main>
            <CourseManagementComponent />
        </main>
    );
}

export default CourseManagementRoute;