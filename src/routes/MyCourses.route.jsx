import {APP_NAME} from "../App.config";
import MyCoursesComponent from "../components/course-registration/MyCourses.component";

function MyCoursesRoute() {
    document.title = "My Courses - " + APP_NAME;

    return (
        <main>
            <MyCoursesComponent/>
        </main>
    );
}

export default MyCoursesRoute;